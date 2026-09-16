import * as moment from 'moment';
import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ModAppService } from "app/core/data/remote/instances/mod-app-service";
import { ModSysAdminService } from "app/core/data/remote/instances/mod-sys-admin.service";
import { cloneObject, isNullOrUndefined } from "app/core/shared/functions.util";
import { LayoutService } from "app/system/admin/services/layout.service";
import { UserService } from "app/system/admin/services/user.service";
import { concat } from "rxjs";
import { SecPickerDialogComponent } from "../shared/components/sec-picker-dialog/sec-picker-dialog.component";
import { StgAlertService } from 'app/core/screen/components/stg-alert/stg-alert.service';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-incentivos',
    templateUrl: './incentivos.component.html',
    styleUrls: ['./incentivos.component.scss'],
    //providers: [DatePipe]
})
export class IncentivosComponent implements OnInit {
    currentDate: string;
    dataSource: any;
    dataSourceCalc: any;
    cardsSource: any;
    cardsSourceCalc: any;
    otherSource: any;
    dataLoadObs: boolean;
    calcDataLoadObs: boolean;
    activeBtnSecSelect: boolean;
    name: string;
    position: string;
    disableCalcTab: boolean;

    cod_bt: string;
    private tip_cod: number;
    private cod_rel: string;

    constructor(
        public layout: LayoutService,
        public user: UserService,
        //private datePipe: DatePipe,
        public dialog: MatDialog,
        private antApp: ModAppService,
        private antAdmin: ModSysAdminService,
        private alertService: StgAlertService,
        public router: Router
    ) {
        this.dataLoadObs = true;
        this.calcDataLoadObs = true;
    }

    ngOnInit(): void {
        let profile = this.user.get('profile');
        this.activeBtnSecSelect = false;
        this.disableCalcTab = true;
        this.currentDate = moment(profile.curr_fec).format("YYYY-MM-DD");
        this.otherSource = {};
        if (profile.cla_use == 2) {
            this.alertService.open(
                "Atención!",
                "Si eres asesor de negocio inclusivo grupal, te informamos que el módulo estará desactivado hasta nuevo aviso, debido a las modificaciones vigentes de acuerdo a la Directiva 071-2021. Gracias por tu comprensión.",
                { width: '400px' }
            ).subscribe(x => {
                this.router.navigateByUrl(environment.homePage);
            });
        } else {
            if (profile.tip_use === 1) {
                this.name = profile.nombre;
                this.position = profile.cargo;
                this.cod_bt = profile.cod_bt;
                concat(this.resObs(), this.baseHierObs()).subscribe(x => {
                    let br: any = x.body;
                    let r = br.resumen;
                    if (!isNullOrUndefined(r)) {
                        this.proRes(r);
                    }
                    let h = br.base_hierarchy;
                    if (!isNullOrUndefined(h)) {
                        this.proHier(h);
                    }
                });
                this.disableCalcTab = false;
            } else {
                this.name = '--';
                this.position = '--';
                this.baseHierObs().subscribe(x => {
                    let br: any = x.body;
                    let h = br.base_hierarchy;
                    if (!isNullOrUndefined(h)) {
                        this.proHier(h);
                    }
                    this.openSecSelector(true);
                });

            }
        }

    }

    private proHier(h: any) {
        this.tip_cod = h[0].tip_cod;
        this.cod_rel = h[0].cod_rel;
    }

    private baseHierObs() {
        return this.antAdmin.getBaseHierarchy(this.user.email, 1);
    }

    private proRes(r: any) {
        this.dataSource = r.res;
        this.dataSourceCalc = cloneObject(r.res);
        this.cardsSource = r.cards;
        this.cardsSourceCalc = {
            ...r.cards
        }
        this.otherSource['efec'] = r.efec;
        this.dataLoadObs = false;
        this.calcDataLoadObs = false;
    }

    private resObs() {
        return this.antApp.getIncentivosResumen(this.cod_bt);
    }

    openSecSelector(dc: boolean) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
            tip_cod: this.tip_cod,
            cod_rel: this.cod_rel,
            showCloseBtn: !dc
        };
        dialogConfig.disableClose = dc;
        const dialogRef = this.dialog.open(SecPickerDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(v => {
            if (v) {
                this.name = v.des_sec;
                this.position = v.des_car;
                this.cod_bt = v.cod_sec;
                this.dataLoadObs = true;
                this.calcDataLoadObs = true;
                this.resObs().subscribe(x => {
                    let br: any = x.body;
                    let r = br.resumen;
                    this.proRes(r);
                    this.activeBtnSecSelect = true;
                    this.disableCalcTab = false;
                });
            }
        });
    }

}