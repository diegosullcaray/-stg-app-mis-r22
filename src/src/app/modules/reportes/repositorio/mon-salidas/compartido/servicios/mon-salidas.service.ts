import * as moment from 'moment';
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ModSysAdminService } from "app/core/data/remote/instances/mod-sys-admin.service";
import { StgAppLoaderService } from "app/core/screen/components/stg-app-loader/stg-app-loader.service";
import { cloneObject, isNullOrUndefined } from "app/core/shared/functions.util";
import { UserService } from "app/system/admin/services/user.service";
import { MonSalidasAntService } from "./mon-salidas-ant.service";
import { ActivatedRoute, Router } from "@angular/router";
import { principalConfig } from "../../principal/principal.util";

@Injectable()
export class MonSalidasService {
    tip_cod: number;
    cod_rel: string;

    curr_hier: any;

    loading: boolean
    firstLoad: boolean;

    curr_fec: string;

    principal: any;
    detalle: any;
    tip_cod2: any;

    lvl_scroll: [];
    show_lvl_scroll: boolean;

    constructor(
        private loader: StgAppLoaderService,
        private user: UserService,
        private antAdmin: ModSysAdminService,
        public mDialog: MatDialog,
        private antSali: MonSalidasAntService
    ) {
        this.setDefaults();
    }

    loadData() {
        this.loader.open();
        let profile = this.user.get('profile');
        this.curr_fec = profile.curr_fec;
        if (profile.tip_use === 1) {
            this.tip_cod = 1;
            this.cod_rel = profile.cod_bt;
            this.principal.tip_cod=1;
            this.setDs(this.tip_cod,this.cod_rel);
        } else {
            this.getBaseHier();
        }

    }

    clean() {
        this.setDefaults();
    }

    private setDefaults() {
        this.firstLoad = true;;
        this.principal = cloneObject(principalConfig);
        this.show_lvl_scroll = false;
        this.curr_hier = { des_rel: "", des_lab: "" }; 

    }

    private getBaseHier() {
        this.antAdmin.getBaseHierarchy(this.user.email, 9).subscribe(x => {
            let br: any = x.body;
            let h = br.base_hierarchy;
            if (!isNullOrUndefined(h)) {
                this.tip_cod = h[0].tip_cod;
                this.cod_rel = h[0].cod_rel
                let currentDate = moment(this.curr_fec).format("YYYY-MM-DD");
                this.antAdmin.getLevelHierarchy(9, h[0].lvl, this.tip_cod, [this.cod_rel], { key: "fec", val: currentDate }).subscribe(x => {
                    let lh = x.body.level_hierarchy;
                    let cl = lh[0]; 
                    this.saveBuffer({ tip_cod: cl.tip_cod, cod_rel: cl.cod_rel, des_rel: cl.des_rel });
                    this.principal.tip_cod=h[0].tip_cod;
                    this.setDs(h[0].tip_cod, h[0].cod_rel);
                    this.tip_cod2= cl;
                });
            }
        });
    }

    private setDs(tip_cod: number, cod_rel: string) {
        if (!this.firstLoad) {
            this.principal.loading = true;
            this.loader.open();
        }
        this.antSali.getDataSources(tip_cod, cod_rel, this.curr_fec).subscribe(x => {
            let ds = x.body.resultado; 
            this.principal.dataCards = ds.cards;
            this.principal.dataTable = ds.table;
            this.principal.loading = false;
            this.loader.close();
        });
    }

    private saveBuffer(obj: any) {
        obj['idx'] = this.principal.hierBuffer.length;
        this.setCurrHier(obj.des_rel, obj.tip_cod);
        this.principal.hierBuffer.push(obj);
    }

    private setCurrHier(des_rel: string, tip_cod: number) {

        this.curr_hier.des_rel = des_rel; 
        if (tip_cod == 18) {
            this.curr_hier.des_lab = "Unidad";
          
        } else if (tip_cod == 19) {
            this.curr_hier.des_lab = "Corredor";
        } else if (tip_cod == 20) {
            this.curr_hier.des_lab = "Territorio";
        } else if (tip_cod == 21) {
            this.curr_hier.des_lab = "Grupo";
        } else {
            this.curr_hier.des_lab = "Total";
        }

    }

    changeHier(item: any) {
        if (this.principal.hierBuffer.length - 1 == item.idx) {
            return;
        }
        this.loader.open();
        this.principal.loading = true;
        let tip_cod = item.tip_cod;
        let cod_rel = item.cod_rel;
        this.principal.hierBuffer = this.principal.hierBuffer.slice(0, item.idx + 1);
        let l = this.principal.hierBuffer.length;
        let ci = this.principal.hierBuffer[l - 1];
        this.setCurrHier(ci.des_rel, ci.tip_cod);
        this.setDs(tip_cod, cod_rel);
    }

    ddHier(evt: any) {
        let tip_cod = evt.tip_cod;

        if (tip_cod == 1) {
            return;
        }
        this.loader.open();
        this.principal.loading = true;
        let cod_rel = evt.cod_rel;
        this.saveBuffer({ tip_cod: tip_cod, cod_rel: cod_rel, des_rel: evt.desc });
        this.setDs(tip_cod, cod_rel);
    }
}