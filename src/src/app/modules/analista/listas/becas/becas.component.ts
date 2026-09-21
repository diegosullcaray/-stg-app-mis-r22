import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { StgAppConfirmService } from 'app/core/screen/components/stg-app-confirm/stg-app-confirm.service';
import { StgWindowConfig } from 'app/core/screen/components/stg-window/stg-window.config';
import { isNullOrUndefined, onNullOrUndefined } from 'app/core/shared/functions.util';
import { LayoutService } from 'app/system/admin/services/layout.service';
import { Subscription } from 'rxjs';
import { AnalistaService } from '../../compartido/servicios/analista.service';
import { ModSecService } from '../../compartido/servicios/mod-sec.service';
import { headers } from './becas.util';
import { DetalleDialogComponent } from './detalle/detalle-dialog.component';


@Component({
    selector: 'app-becas-listas-analista',
    templateUrl: './becas.component.html',
    styleUrls: ['./becas.component.scss']
})
export class BecasComponent implements OnInit, OnDestroy {

    dataSource: any[];
    oriDataSource: any[];
    currDataSource: any[];
    headers: any[];
    title: string;
    dataSourceLength: number;

    emptyDataSource: number;
    loadingDataSource: boolean;

    tableOptions = {
        body: {
            hover: {
                enabled: true
            },
            selection: {
                enabled: true
            }
        }
    };

    selectSub: Subscription;
    loadSub: Subscription;
    subsSubmit: Subscription;

    disableProsBec: boolean;
    disableProsDet: boolean;

    //checkFilters: any[];

    constructor(
        public router: Router,
        public dialog: MatDialog,
        private confirm: StgAppConfirmService,
        public activatedRoute: ActivatedRoute,
        public analista: AnalistaService,
        private antSec: ModSecService,
        public layout: LayoutService) { }

    ngOnDestroy(): void {
        this.loadSub.unsubscribe();
        this.selectSub.unsubscribe();
        this.subsSubmit.unsubscribe();
    }

    ngOnInit(): void {
        this.disableProsBec = true;
        this.disableProsDet = true;

        this.headers = headers;
        this.emptyDataSource = 0;
        this.loadingDataSource = true;
        this.selectSub = this.analista.selectedSec$.subscribe(x => {
            this.dataSourceLength = undefined;
            this.analista.nom_sec = x.des_sec;
            this.analista.cod_bt = x.cod_sec;
            this.loadingDataSource = true;
            this.getDataSource(x);
        });
        this.loadSub = this.analista.doneLoadingDataSource$.subscribe(x => {
            this.dataSourceLength = x.length;
            this.loadingDataSource = false;
            if (x.length === 0) {
                this.emptyDataSource = 1;
            } else {
                /*if (this.checkFilters) {
                    this.checkFilters.forEach(c => {
                        this.checkFilter(c.key);
                    });
                }*/
                this.emptyDataSource = 0;
            }
        });
        this.subsSubmit = this.analista.onEventForm$.subscribe(x => {
            let v = x.controls.des_com.value;
            this.post(onNullOrUndefined(v, ''));
        });

        if (this.analista.cod_bt) {
            this.ds();
        } else {
            this.navRoot();
        }
    }

    private post(com: string) {
        let r = this.analista.selectedRow;
        this.antSec.postProsBecas(this.analista.cod_bt, r.num_doc, com).subscribe(x => {
            let res = x.body.result;
            if (res.code == 200) {
                this.disableProsBec = true;
                this.dataSource.forEach(x => {
                    if (x.num_doc === r.num_doc) {
                        x.ind_pro = 1;
                        x.com_pro = com;
                        x.fec_pro = res.fec_pro;
                        x.ori_sec = this.analista.cod_bt;
                        return;
                    }
                });
            } else {
                //
            }
        });
    }

    private ds() {
        this.antSec.getListaBecas(this.analista.cod_bt).subscribe(x => {
            this.dataSource = x.body.resultado;
            this.currDataSource = x.body.resultado;
            this.analista.doneLoadingDataSource$.next(x.body.resultado);
        });
    }

    getDataSource(sec: any) {
        this.dataSource = [];
        this.ds();
    }

    openSecPicker() {
        this.analista.showSecPickerDialog(true);
    }

    navMain() {
        this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    }

    navRoot() {
        this.router.navigateByUrl('/app/analista');
    }

    /*checkFilter(key: string) {

    }*/

    onSelectedRow(evt: any) {
        if (evt.ind_pro == 1) {
            this.disableProsBec = true;
        } else {
            this.disableProsBec = false;
        }
        this.disableProsDet = false;
        this.analista.selectedRow = evt;
    }

    postProsBecas() {
        let r = this.analista.selectedRow;
        this.confirm.open("¿Está seguro que desea prospectar al cliente " + r.des_cli + '?').subscribe(x => {
            if (x.result == 1) {
                this.analista.showFormDialog();
            }
        });
    }


    showDetail() {
        if (this.layout.isMobile) {
            this.router.navigate(['./detalle'], { relativeTo: this.activatedRoute });
        } else {
            this.dialogDetail();
        }
    }

    private dialogDetail(): void {
        const dialogConfig = new StgWindowConfig();
        dialogConfig.height = '500px';
        const dialogRef = this.dialog.open(DetalleDialogComponent, dialogConfig);
    }
}