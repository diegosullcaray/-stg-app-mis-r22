import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { ModRepService } from '../../compartido/servicios/mod-rep.service';
import { UserService } from '../../../../system/admin/services/user.service';
import { DropdownItem } from 'app/core/screen/components/stg-window-bar-m/stg-window-bar-m.component';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { createTableHeaders, CuentaResultadoRow, tableOptions } from './cuenta-resultados.util';
import { stgLightWindowBarMConfig } from 'app/core/screen/base/stg-window-bar-m.config';

type ViewState = 'idle' | 'loading' | 'empty' | 'data' | 'error';

@Component({
    selector: 'app-cuenta-resultados',
    templateUrl: './cuenta-resultados.component.html',
    styleUrls: ['./cuenta-resultados.component.scss']
})
export class CuentaResultadosComponent implements OnInit, OnDestroy {
    periods: DropdownItem[] = [];
    selectedPeriod: DropdownItem | null = null;
    confHier: any;
    activeHierarchy = false;
    headers: any[] = [];
    options = tableOptions;
    windowBarConfig = stgLightWindowBarMConfig;
    dropdownChipText = '';
    rows: CuentaResultadoRow[] = [];
    state: ViewState = 'idle';
    errorMessage = '';

    private currentDate = '';
    private lastHierarchySelection: any[] = [];
    private hierarchySubscription: Subscription;
    private reportSubscription: Subscription;
    private loaderOpen = false;

    constructor(
        private antRep: ModRepService,
        private user: UserService,
        private loader: StgAppLoaderService
    ) { }

    ngOnInit(): void {
        this.openLoader();
        const profile = this.user.get('profile');
        this.currentDate = moment(profile.curr_fec).format('YYYY-MM-DD');
        this.loadHierarchy();
    }

    ngOnDestroy(): void {
        this.hierarchySubscription && this.hierarchySubscription.unsubscribe();
        this.reportSubscription && this.reportSubscription.unsubscribe();
        this.closeLoader();
    }

    onPeriodChange(period: DropdownItem): void {
        if (!period) {
            return;
        }
        const normalizedDate = this.normalizeReportDate(period.val);
        if (!normalizedDate || !this.periods.some(item => item.val === normalizedDate)) {
            this.setError('El período seleccionado tiene un formato inválido.');
            this.closeLoader();
            return;
        }
        this.selectedPeriod = {
            val: normalizedDate,
            label: this.formatPeriodLabel(normalizedDate)
        };
        this.openLoader();
        this.resetReport();
        const selected = this.lastHierarchySelection[0];
        if (selected) {
            this.loadReport(selected);
        } else {
            this.closeLoader();
        }
    }

    selectHierarchy(selection: any[]): void {
        const selected = selection && selection[0];
        if (!selected) {
            return;
        }

        this.lastHierarchySelection = selection;
        this.loadReport(selected);
    }

    private loadHierarchy(): void {
        this.hierarchySubscription && this.hierarchySubscription.unsubscribe();
        this.activeHierarchy = false;
        this.resetReport();
        this.state = 'loading';

        this.hierarchySubscription = this.antRep.getBaseHierarchy(9).subscribe(
            response => {
                const roots = response && response.body && response.body.base_hierarchy;
                if (!Array.isArray(roots) || !roots.length) {
                    this.setError('No hay niveles de jerarquía disponibles.');
                    this.closeLoader();
                    return;
                }

                this.confHier = {
                    roots,
                    cod_hier: 9,
                    params_hier: { key: 'fec', val: this.selectedPeriod ? this.selectedPeriod.val : this.currentDate },
                    max_lvl: 6,
                    dlg_tlt: 'JERARQUÍA UNIDAD'
                };
                this.activeHierarchy = true;
                this.state = 'idle';
            },
            () => {
                this.setError('No se pudo cargar la jerarquía.');
                this.closeLoader();
            }
        );
    }

    private loadReport(selected: any): void {
        this.reportSubscription && this.reportSubscription.unsubscribe();
        this.rows = [];
        this.dropdownChipText = '';
        this.headers = [];
        this.state = 'loading';
        this.errorMessage = '';
        this.openLoader();

        const requestedDate = this.selectedPeriod
            ? this.toBackendDate(this.selectedPeriod.val)
            : 'NOW';
        if (!requestedDate) {
            this.setError('El período seleccionado tiene un formato inválido.');
            this.closeLoader();
            return;
        }
        this.reportSubscription = this.antRep.getRegularTableResult('TAB_CUE_RES_01', {
            fecha: requestedDate,
            tip_cod: selected.tip_cod,
            cod_rel: selected.cod_rel
        }).subscribe(
            response => {
                const result = response && response.body && response.body.resultado;
                const data = result && result.data;
                const metadata = this.parseMetadata(result && result.headers);
                if (!metadata) {
                    this.setError('El reporte devolvió metadatos inválidos.');
                    this.closeLoader();
                    return;
                }
                if (!Array.isArray(data)) {
                    this.setError('El reporte devolvió una respuesta inválida.');
                    this.closeLoader();
                    return;
                }

                this.periods = metadata.fechas.map(fecha => ({
                    val: this.normalizeReportDate(fecha),
                    label: this.formatPeriodLabel(fecha)
                }));
                const periodFromResponse = this.periods.find(period =>
                    this.selectedPeriod && period.val === this.selectedPeriod.val
                ) || this.periods[0];
                this.selectedPeriod = periodFromResponse;
                this.dropdownChipText = metadata.preliminar === 1 ? 'Preliminar' : '';
                this.headers = createTableHeaders(periodFromResponse, metadata.preliminar === 1);
                this.rows = data as CuentaResultadoRow[];
                if (!this.rows.length) {
                    this.state = 'empty';
                    this.closeLoader();
                    return;
                }

                this.state = 'data';
                this.closeLoader();
            },
            () => {
                this.setError('No se pudo cargar el reporte.');
                this.closeLoader();
            }
        );
    }

    private parseMetadata(rawMetadata: any): { preliminar: number; fechas: string[] } | null {
        try {
            const metadata = JSON.parse(rawMetadata);
            if ((metadata.preliminar !== 0 && metadata.preliminar !== 1) ||
                !Array.isArray(metadata.fechas) || !metadata.fechas.length ||
                metadata.fechas.some(fecha => !this.normalizeReportDate(fecha))) {
                return null;
            }
            return {
                preliminar: metadata.preliminar,
                fechas: metadata.fechas.map(fecha => this.normalizeReportDate(fecha))
            };
        } catch (error) {
            return null;
        }
    }

    private normalizeReportDate(value: any): string | null {
        if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
            return null;
        }
        const date = moment(value, 'YYYY-MM-DD', true);
        return date.isValid() ? date.format('YYYY-MM-DD') : null;
    }

    private toBackendDate(value: any): string | null {
        const normalizedDate = this.normalizeReportDate(value);
        return normalizedDate ? moment(normalizedDate, 'YYYY-MM-DD', true).format('YYYYMMDD') : null;
    }

    private formatPeriodLabel(value: string): string {
        const date = new Date(value + 'T00:00:00');
        const label = date.toLocaleString('es-PE', { month: 'long', year: 'numeric' });
        return `${label.charAt(0).toUpperCase()}${label.slice(1)}`;
    }

    private resetReport(): void {
        this.reportSubscription && this.reportSubscription.unsubscribe();
        this.rows = [];
        this.dropdownChipText = '';
        this.headers = [];
        this.errorMessage = '';
        this.state = 'idle';
    }

    private setError(message: string): void {
        this.rows = [];
        this.state = 'error';
        this.errorMessage = message;
    }

    private openLoader(): void {
        if (!this.loaderOpen) {
            this.loader.open();
            this.loaderOpen = true;
        }
    }

    private closeLoader(): void {
        if (this.loaderOpen) {
            this.loader.close();
            this.loaderOpen = false;
        }
    }
}
