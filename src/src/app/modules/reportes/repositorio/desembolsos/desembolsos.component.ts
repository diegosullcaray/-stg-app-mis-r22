import * as moment from 'moment';
import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild, AfterViewInit } from "@angular/core";
import { IStgTableHeader } from "app/core/screen/components/stg-table/stg-table.interface";
import { UserService } from "app/system/admin/services/user.service";
import { ModRepService } from "../../compartido/servicios/mod-rep.service";
import { cloneObject, isNullOrUndefined, onNullOrUndefined } from 'app/core/shared/functions.util';
import { formatNumber } from '@angular/common';
import { Console } from 'console';
import { tableConf3 } from '../esg/esg.util';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { tableConfOPTS, tblHeaders } from './desembolsos.util';
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { prepareDataForPagination } from 'app/core/screen/components/stg-paginator/stg-paginator.util';
import { StgPaginatorComponent } from 'app/core/screen/components/stg-paginator/stg-paginator.component';
import { StgWindowConfig } from 'app/core/screen/components/stg-window/stg-window.config';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-desembolsos.component',
    templateUrl: './desembolsos.component.html',
    styleUrls: ['./desembolsos.component.scss']
})
export class DesembolsosComponent implements OnInit, AfterViewInit {

    dataSource: any;
    dataSource2: any;
    dataSource3: any;
    dataSource4: any;

    currentDate: any;
    uni_cfg: any;
    confHier1: any;
    activeHier: boolean;
    showHier: any;
    Opts: any;

    headerDefs: any;
    headerDefs2: any;
    headerDefs3: any;
    headerDefs4: any;

    loading: boolean;

    load0: BehaviorSubject<boolean>;
    load1: BehaviorSubject<boolean>;
    load2: BehaviorSubject<boolean>;
    firstload: boolean;

    filter1: any;
    filter2: any;
    tblHeaders: any;
    ftipCod: number;
    lvh: any;
    isNav: boolean;
    buffer: any;
    pointer: number;
    disNavLeft: boolean;
    disNavRight: boolean;
    vars: any;
    subs: any;
    varsDataRows: any

    @ViewChild(TemplateRef, { static: true }) templateRef: TemplateRef<any>;
    @ViewChild("paginator", { "static": false }) paginatorVC: StgPaginatorComponent;

    constructor(public antRep: ModRepService,
        public user: UserService,
        public loader: StgAppLoaderService,
        private detector: ChangeDetectorRef,
        public dialog: MatDialog) {
        this.tblHeaders = cloneObject(tblHeaders);
    }

    ngOnInit(): void {
        this.loader.open()
        this.subs = {};
        this.buffer = [];
        this.pointer = 0;
        let profile = this.user.get('profile');
        this.currentDate = moment(profile.curr_fec).format("YYYY-MM-DD");
        this.activeHier = false;
        this.loading = true;
        this.Opts = tableConfOPTS;

        this.iniHierarchy(9, 6)

        this.load0 = new BehaviorSubject(false);
        this.load1 = new BehaviorSubject(false);
        this.load2 = new BehaviorSubject(false);

        this.firstload = true;

        combineLatest([this.load0]).subscribe(([a]) => {
            if (a) {
                this.loading = false;
                this.loader.close();
                this.firstload = false; 
                setTimeout(() => {
                    this.applyCustomStyles();
                }, 200);
            }
        });
    }

    ngAfterViewInit() { 
        setTimeout(() => {
            if (this.dataSource && this.headerDefs) {
                this.applyCustomStyles();
            }
        }, 300);
    }

    preLoad() {
        if (!this.firstload) {
            this.loading = true;
            this.loader.open();
            this.load0.next(false);
        }
    }

    ddEventV(evt?: any) {
        if (!evt || !evt.row || evt.key !== 'descripcion') return;

        // Solo abrir si tip_cod es 17
        if (this.ftipCod !== 17) {
            console.log('Modal bloqueado: tip_cod != 17');
            return;
        }

        // No abrir si es el primer registro
        if (evt.row.fila === 1) {
            console.log('Modal bloqueado: es el primer registro');
            return;
        }

        console.log('Abriendo modal:', evt);

        this.varsDataRows = evt;
        this.pointer += 1;
        for (let i = this.pointer; i < this.buffer.length; i++) {
            this.buffer.pop();
        }

        this.disNavLeft = false;
        this.disNavRight = true;

        const s = evt.row.fila + '';
        this.vars = this.subs[s];

        this.buffer[this.pointer] = {
            event: 'ddv',
            body: {
                vars: this.subs[s]
            }
        };
    }

    iniHierarchy(code: number, max_lvl: number) {
        this.antRep.getBaseHierarchy(code).subscribe(
            x => {
                let bh: any = x.body.base_hierarchy;
                this.confHier1 = {
                    roots: bh,
                    cod_hier: code,
                    params_hier: { key: "fec", val: this.currentDate },
                    max_lvl: max_lvl,
                    dlg_tlt: "JERARQUIA UNIDAD"
                }
                this.activeHier = true;
            }
        );
    }

    eventFilter(event: any) {
        if (!this.firstload && event.isUserInput) {
            this.loadData();
        }
    }

    selectHier(evt: any) {
        this.lvh = evt[0];
        this.ftipCod = this.lvh.tip_cod;
        this.loadData();
    }

    loadData() {
        let tipcod = this.lvh.tip_cod;
        let codrel = this.lvh.cod_rel;

        this.preLoad();

        this.antRep.getRegularTableResult("RS_DESEMB_01", {
            "tip_cod": tipcod,
            "cod_rel": codrel,
            "fec": this.currentDate
        }).subscribe(x => {
            console.log('Datos recibidos:', x.body.resultado);
            let r = x.body.resultado;
            this.dataSource = r.data;
            this.headerDefs = JSON.parse(r.headers);
 
            this.processHeaders();
            
            this.load0.next(true);
        });
    }

    private processHeaders() {
        console.log('=== PROCESANDO HEADERS ===');
        
        if (this.headerDefs) {
            console.log(this.headerDefs[1])
            console.log(this.headerDefs[1].subs) 
            if (this.headerDefs[1] && this.headerDefs[1].subs) {
                console.log('Configurando headers para Número de Operaciones...');
                
                this.headerDefs[1].subs.forEach((sub: any, index: number) => {
                    if (['1_Ope', '2_Ope', '3_Ope'].includes(sub.key)) {
                        console.log(`Configurando sub-header NUM ${sub.key}`);
                        
                        sub.cellRenderer = this.createCellRenderer(sub.key);
                        sub.cellTemplate = this.createCellRenderer(sub.key);
                        sub.customRender = this.createCellRenderer(sub.key);
                        sub.formatter = this.createCellRenderer(sub.key);
                        sub.render = this.createCellRenderer(sub.key);
                        sub.hasCustomRender = true;
                    }
                });
            }
             
            if (this.headerDefs[2] && this.headerDefs[2].subs) {
                console.log('Configurando headers para Monto Desembolsado...');
                
                this.headerDefs[2].subs.forEach((sub: any, index: number) => {
                    if (['1_MON', '2_MON', '3_MON'].includes(sub.key)) {
                        console.log(`Configurando sub-header MON ${sub.key}`);
                        
                        sub.cellRenderer = this.createCellRenderer(sub.key);
                        sub.cellTemplate = this.createCellRenderer(sub.key);
                        sub.customRender = this.createCellRenderer(sub.key);
                        sub.formatter = this.createCellRenderer(sub.key);
                        sub.render = this.createCellRenderer(sub.key);
                        sub.hasCustomRender = true;
                    }
                });
            }
        }
        
        console.log('Headers procesados:', this.headerDefs);
    }

    private createCellRenderer(columnKey: string) {
        return (row: any, column: string, value: any) => {
            console.log(`CellRenderer para ${columnKey}:`, { 
                IDRango: row?.IDRango, 
                column, 
                value 
            });
            
            if (row && row.IDRango === 12) {
                console.log(`🟢 APLICANDO ESTILO para ${columnKey}!`); 
                return value;
            }
            return value;
        };
    }

    getBackgroundColor(value: any, row: any, columnKey: string): { bg: string; text: string } {
        const numValue = typeof value === 'string' ? 
            parseFloat(value.replace('%', '').replace(',', '')) : 
            parseFloat(value);
        
        if (isNaN(numValue)) {
            return { bg: '#f5f5f5', text: '#333333' };
        }
         
        const isOperacionColumn = ['1_Ope', '2_Ope', '3_Ope'].includes(columnKey);
        const isMontoColumn = ['1_MON', '2_MON', '3_MON'].includes(columnKey);
        
        let columnsToConsider: string[] = [];
        
        if (isOperacionColumn) {
            columnsToConsider = ['1_Ope', '2_Ope', '3_Ope'];
        } else if (isMontoColumn) {
            columnsToConsider = ['1_MON', '2_MON', '3_MON'];
        } else {
            return { bg: '#f5f5f5', text: '#333333' };
        }
         
        const rowValues = columnsToConsider.map(col => {
            const val = row[col];
            if (val === null || val === undefined) return { key: col, value: 0, chronologicalOrder: this.getChronologicalOrder(col) };
            const cleanVal = typeof val === 'string' ? 
                parseFloat(val.replace('%', '').replace(',', '')) : 
                parseFloat(val);
            return { 
                key: col, 
                value: isNaN(cleanVal) ? 0 : cleanVal,
                chronologicalOrder: this.getChronologicalOrder(col)
            };
        });
        
        // Ordenar por valor (de menor a mayor) para asignar colores cronológicos
        const sortedByValue = [...rowValues].sort((a, b) => a.value - b.value);
        
        // Asignar colores cronológicos según el ranking por valor
        const colorAssignments: { [key: string]: { bg: string; text: string } } = {};
        
        // Colores en orden cronológico (mínimo a máximo)
        const chronologicalColors = [
            { bg: '#22c55e', text: '#ffffff' }, // Verde (menor valor)
            { bg: '#84cc16', text: '#ffffff' }, // Verde limón
            { bg: '#eab308', text: '#000000' }, // Amarillo
            { bg: '#f97316', text: '#ffffff' }, // Naranja
            { bg: '#ef4444', text: '#ffffff' }  // Rojo (mayor valor)
        ];
         
        sortedByValue.forEach((item, index) => {
            colorAssignments[item.key] = chronologicalColors[index] || { bg: '#f5f5f5', text: '#333333' };
        });
        
        // Devolver color asignado para la columna actual
        return colorAssignments[columnKey] || { bg: '#f5f5f5', text: '#333333' };
    }
    
    private getChronologicalOrder(columnKey: string): number {
        const chronologicalMap: { [key: string]: number } = {
            '1_Ope': 1, '1_MON': 1,  // Mar-25 (más antigua)
            '2_Ope': 2, '2_MON': 2,  // Abr-25
            '3_Ope': 3, '3_MON': 3,  // May-25
            
        };
        return chronologicalMap[columnKey] || 0;
    }

    // Método para oscurecer un color (para borders)
    private darkenColor(color: string, amount: number): string {
        const colorMap: { [key: string]: string } = {
            '#22c55e': '#16a34a',
            '#84cc16': '#65a30d',
            '#eab308': '#ca8a04',
            '#f97316': '#ea580c',
            '#ef4444': '#dc2626'
        };
        return colorMap[color] || color;
    }

    applyCustomStyles() {
        
        setTimeout(() => {
            this.applyDirectDOMStyles();
        }, 100);
    }

    private applyDirectDOMStyles() {
        const tableElement = document.querySelector('stg-table2');
        
        if (!tableElement) {
            console.log('Tabla no encontrada, reintentando...');
            setTimeout(() => this.applyDirectDOMStyles(), 200);
            return;
        }

        console.log('Tabla encontrada, aplicando estilos...');
         
        const rows = tableElement.querySelectorAll('tbody tr, .table-row, .stg-table-row');
        
        if (rows.length === 0) {
            console.log('No se encontraron filas, reintentando...');
            setTimeout(() => this.applyDirectDOMStyles(), 200);
            return;
        }

        rows.forEach((row: any, rowIndex: number) => {
            if (this.dataSource && this.dataSource[rowIndex] && this.dataSource[rowIndex].IDRango === 12) {
                console.log(`Aplicando estilos a fila ${rowIndex} (IDRango=12)`);
                
                const cells = row.querySelectorAll('td, .table-cell, .stg-table-cell');
                const rowData = this.dataSource[rowIndex];
                
                cells.forEach((cell: any, cellIndex: number) => { 
                    const isTargetColumn = this.isTargetColumn(cellIndex);
                    
                    if (isTargetColumn) {
                        const columnKey = this.getColumnKey(cellIndex);
                        const value = rowData[columnKey];
                        
                        console.log(`Estilizando celda ${columnKey} con valor ${value}`);
                         
                        const color = this.getBackgroundColor(value, rowData, columnKey);
                         
                        cell.style.backgroundColor = color.bg;
                        cell.style.color = color.text;
                        cell.style.padding = '4px 8px';
                        cell.style.fontWeight = 'bold';
                        cell.style.textAlign = 'center';
                        cell.style.border = `1px solid ${this.darkenColor(color.bg, 0.1)}`;
                        cell.style.borderRadius = '3px';
                        cell.style.position = 'relative';
                        cell.style.boxSizing = 'border-box';
                        cell.style.minHeight = '28px';
                        cell.style.verticalAlign = 'middle';
                        cell.style.fontSize = '12px';
                         
                        const spans = cell.querySelectorAll('span');
                        spans.forEach((span: any) => {
                            if (span.style.backgroundColor) { 
                                cell.innerHTML = span.innerHTML;
                            }
                        });
                         
                        cell.classList.add('custom-styled');
                        cell.setAttribute('data-styled', 'true');
                    }
                });
            }
        });
         
        this.addCustomCSS();
    }

    private isTargetColumn(cellIndex: number): boolean { 
        return (cellIndex >= 1 && cellIndex <= 3) || (cellIndex >= 5 && cellIndex <= 7);
    }

    private getColumnKey(cellIndex: number): string { 
        if (cellIndex >= 1 && cellIndex <= 3) { 
            const numColumns = ['1_Ope', '2_Ope', '3_Ope'];
            return numColumns[cellIndex - 1];
        } else if (cellIndex >= 5 && cellIndex <= 7) { 
            const monColumns = ['1_MON', '2_MON', '3_MON'];
            return monColumns[cellIndex - 5];
        }
        return '';
    }
 
    private setupTableObserver() {
        const targetNode = document.querySelector('stg-table2');
        
        if (!targetNode) return;

        const observer = new MutationObserver((mutationsList) => {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    console.log('Tabla modificada, reaplicando estilos...');
                    setTimeout(() => this.applyDirectDOMStyles(), 50);
                }
            }
        });

        observer.observe(targetNode, {
            childList: true,
            subtree: true
        });
    }

    private addCustomCSS() { 
        const styleId = 'custom-table-styles';
        let styleElement = document.getElementById(styleId);
        
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = styleId;
            document.head.appendChild(styleElement);
        }
        
        styleElement.innerHTML = `
            .custom-styled {
                transition: all 0.2s ease !important;
                font-weight: bold !important;
                text-align: center !important;
                position: relative !important;
                overflow: visible !important;
                font-size: 12px !important;
            }
            
            .custom-styled:hover {
                transform: scale(1.02) !important;
                box-shadow: 0 2px 4px rgba(0,0,0,0.15) !important;
                z-index: 5 !important;
            }
            
            /* Asegurar que las celdas no tengan desbordamiento */
            stg-table2 td.custom-styled {
                box-sizing: border-box !important;
                width: auto !important;
                max-width: none !important;
                white-space: nowrap !important;
                padding: 4px 8px !important;
                min-height: 28px !important;
            }
            
            /* Eliminar cualquier span interno que cause desbordamiento */
            stg-table2 td.custom-styled span {
                display: inline !important;
                padding: 0 !important;
                margin: 0 !important;
                background: transparent !important;
                border-radius: 0 !important;
                box-shadow: none !important;
                font-weight: inherit !important;
            }
        `;
    }
}