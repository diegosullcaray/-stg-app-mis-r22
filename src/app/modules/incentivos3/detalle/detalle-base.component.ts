import { StgAppLoaderService } from "app/core/screen/components/stg-app-loader/stg-app-loader.service";
import { Incentivos3Service } from "../compartido/servicios/incentivos3.service";
import { detalleConfig } from "./detalle.util";
import { cloneObject, isNullOrUndefined } from "app/core/shared/functions.util";
import { ModIncentivos3Service } from "../compartido/servicios/mod-incentivos3.service";
import { formatNumber } from "@angular/common";
import { LayoutService } from "app/system/admin/services/layout.service";

export abstract class DetalleBaseComponent {
    config: any;
    item: any;
    tip_cod: number;
    cod_rel: string;
    des_rel: string;
    des_lab: string

    card: any;
    vars: any;
    rank: any;

    subs: any;

    showCards:boolean;

    showVars: boolean;
    showRank: boolean;

    head1: any;
    head2: any;

    isNav: boolean;
    buffer: any;
    pointer: number;
    disNavLeft: boolean;
    disNavRight: boolean;

    constructor(public inc3: Incentivos3Service, public loader: StgAppLoaderService, public ant: ModIncentivos3Service) { }

    init() {
        this.config = cloneObject(detalleConfig);
        this.tip_cod = this.inc3.perfil.usu.tip_cod;
        this.cod_rel = this.inc3.perfil.usu.cod_rel;

        //this.isNav = this.tip_cod == 1 ? false : true;
        this.isNav = true;
        this.buffer = [];
        this.disNavLeft = true;
        this.disNavRight = true;
        this.pointer = 0;
        if (this.tip_cod == 1) {
            this.des_rel = this.inc3.perfil.usu.nom;
            this.des_lab = "Asesor";
        } else {
            this.des_rel = this.inc3.perfil.usu.des_niv;
            if (this.tip_cod == 18) {
                this.des_lab = "Unidad";
            } else if(this.tip_cod == 19) {
                this.des_lab = "Corredor";
            } else if(this.tip_cod == 20) {
                this.des_lab = "Territorio";
            } else{
                this.des_lab = "Total";
            }
        }
        this.data();
    }
    abstract navMain(): void;

    private data() {
        this.subs = {};
        this.config.loading = true;
        this.loader.open();
        this.showVars = true;
        this.showRank = false;
        let idx = this.inc3.detalle.idx;
        
        let params = this.inc3.detalle.params;
    
        if(params.typ=='cv'){
            //let idxn = this.inc3.model=='2025' && idx==91 ? 1 : idx;
            let idxn = idx==91 ? 1 : idx;
            this.item = detalleConfig.items[idxn - 1];
        }else{
            this.item = detalleConfig.items2[idx - 1];
        }
        

        this.showCards= params.card;
        this.ant[params.req](this.tip_cod, this.cod_rel, idx,this.inc3.curr_fec).subscribe((x:any) => {
            let res = x.body.resultado;
            this.buffer[this.pointer] = {
                event: 'dd',
                body: {
                    res: res,
                    tip_cod: this.tip_cod,
                    cod_rel: this.cod_rel,
                    des_rel: this.des_rel,
                    des_lab: this.des_lab
                }
            };
            this.card = res.card;
            this.rank = res.rank;
            this.vars = res.vars.filter((x: any) => x.cod_block == 1);
            for (let i = 2; i <= this.card.blocks; i++) {

                this.subs['' + i + ''] = res.vars.filter((x: any) => x.cod_block == i);
            }
            this.setHeaders();

            this.config.loading = false;
            this.loader.close();
        });
    }



    private setHeaders() {
        this.head1 = cloneObject(this.config.header1);
        this.head1[1].subs[0].label = this.card.f1;
        this.head1[1].subs[1].label = this.card.f2;

        this.head2 = cloneObject(this.config.header2);
        if (this.tip_cod == 18) {
            this.head2[0].label = "Asesor";
        } else if (this.tip_cod == 19) {
            this.head2[0].label = "Unidad";
        }
        let params = this.inc3.detalle.params;
        //let idx = this.inc3.model=='2025' && this.inc3.detalle.idx==91 ? 1 : this.inc3.detalle.idx;
        let idx = this.inc3.detalle.idx==91 ? 1 : this.inc3.detalle.idx;
        
        if(params.typ=='cv'){
            if (idx == 1) {
                this.head2[1].label = "Var. Saldo";
            } else if (idx == 2) {
                this.head2[1].label = "Var. Clientes";
            } else {
                this.head2[1].label = "Efectividad";
                this.head2[1].format.type = 'percent';
                this.head2[2].format.type = 'percent';
                this.head2[3].format.type = 'percent';
            }
        }else if(params.typ=='sp'){
            if(idx==6){
                this.head2[1].label = "Tasa Mes";
                this.head2[2].label = "Tasa Mínima";
                this.head2[1].format.type = 'percent';
                this.head2[2].format.type = 'percent';
                this.head2[3].format.type = 'pbs';
            }else if(idx==1){
                this.head2[1].label = "Productividad";
                this.head2[1].format.type = 'decimal';
                this.head2[2].format.type = 'decimal';
                this.head2[3].format.type = 'decimal';
            }
        }
    }

    getCardsCie() {
        let t = this.inc3.detalle.params.typ;
        //let cv = this.inc3.model=='2025' && this.inc3.detalle.idx==91 ? 1 : this.inc3.detalle.idx;
        let cv = this.inc3.detalle.idx==91 ? 1 : this.inc3.detalle.idx;
        if (cv == 1 && t=='cv') {
            return 'S/. ' + formatNumber(this.card.cie_real, 'en-US', '.0-0');
        } else if (cv == 2 && t=='cv') {
            return formatNumber(this.card.cie_real, 'en-US', '.0-0');
        } else if (t=='cv') {
            return formatNumber(this.card.cie_real * 100, 'en-US', '.0-2') + '%';
        } else{
            return formatNumber(this.card.cie_real, 'en-US', '.0-2');
        }
    }

    getCardsVar() {
        let t = this.inc3.detalle.params.typ;
        //let cv = this.inc3.model=='2025' && this.inc3.detalle.idx==91 ? 1 : this.inc3.detalle.idx;
        let cv = this.inc3.detalle.idx==91 ? 1 : this.inc3.detalle.idx;
        if (cv == 1 && t=='cv') {
            return 'S/. ' + formatNumber(this.card.var_real, 'en-US', '.0-0');
        } else if (cv == 2 && t=='cv') {
            return formatNumber(this.card.var_real, 'en-US', '.0-0');
        } else if (t=='cv') {
            return formatNumber(this.card.var_real * 100, 'en-US', '.0-2') + '%';
        }else{
            return formatNumber(this.card.var_real, 'en-US', '.0-2');
        }
    }

    getCardsMet() {
        let t = this.inc3.detalle.params.typ;
        //let cv = this.inc3.model=='2025' && this.inc3.detalle.idx==91 ? 1 : this.inc3.detalle.idx;
        let cv = this.inc3.detalle.idx==91 ? 1 : this.inc3.detalle.idx;
        if (this.card.exis_met == 0) {
            return '--';
        }
        if (cv == 1 && t=='cv') {
            return 'S/. ' + formatNumber(this.card.met, 'en-US', '.0-0');
        } else if (cv == 2 && t=='cv') {
            return formatNumber(this.card.met, 'en-US', '.0-0');
        } else if (t=='cv') {
            return formatNumber(this.card.met * 100, 'en-US', '.0-2') + '%';
        }else{
            return formatNumber(this.card.met, 'en-US', '.0-2');
        }
    }

    showButtons() {
        return this.tip_cod != 1;
    }

    showTblVars() {
        this.showVars = true;
        this.showRank = false
    }

    showTblRank() {
        this.showVars = false;
        this.showRank = true
    }

    ddEventV(evt: any) {
        if(isNullOrUndefined(evt.row.cod_bdd) || evt.key !== 'des_var'){
            return;
        }
        this.pointer += 1;
        for (let i = this.pointer; i < this.buffer.length; i++) {
            this.buffer.pop();
        }
        this.disNavLeft = false;
        this.disNavRight = true;
        let s = evt.row.cod_bdd + '';
        this.vars = this.subs[s];
        this.buffer[this.pointer] = {
            event: 'ddv',
            body: {
                vars: this.subs[s],
                des_rel: this.des_rel,
                des_lab: this.des_lab
            }
        };
    }

    ddEvent(evt: any) {
        if(evt.key !== 'des_rel'){
            return;
        }
        this.pointer += 1;
        for (let i = this.pointer; i < this.buffer.length; i++) {
            //this.buffer[i] = undefined;
            this.buffer.pop();
        }
        this.disNavLeft = false;
        this.disNavRight = true;
        if (evt.key == "des_rel") {
            this.tip_cod = evt.row.tip_cod;
            this.cod_rel = evt.row.cod_rel;
            if (this.tip_cod == 1) {
                this.des_lab = "Asesor";
            } else if (this.tip_cod == 18) {
                this.des_lab = "Unidad";
            } else if (this.tip_cod == 19) {
                this.des_lab = "Corredor";
            } else if (this.tip_cod == 20) {
                this.des_lab = "Territorio";
            } else {
                this.des_lab = "Total";
            }
            this.des_rel = evt.row.des_rel;
            this.data();
        }
    }

    navDiag(evt: any) {
        if (evt.value == "left") {
            this.disNavRight = false;
            this.pointer -= 1;
            if (this.pointer == 0) {
                this.disNavLeft = true;
            }
        } else {
            this.disNavLeft = false;
            this.pointer += 1;
            if (this.buffer.length == this.pointer + 1) {
                this.disNavRight = true;
            }
        }
        this.config.loading = true;
        //this.loader.open();
        this.showVars = true;
        this.showRank = false;
        let bi = this.buffer[this.pointer];
        if (bi.event == 'dd') {
            let res = bi.body.res;
            this.card = res.card;

            this.vars = res.vars.filter((x: any) => x.cod_block == 1);
            for (let i = 2; i <= this.card.blocks; i++) {
                this.subs['' + i + ''] = res.vars.filter((x: any) => x.cod_block == i);
            }
            this.rank = res.rank;
            this.des_rel = bi.body.des_rel;
            this.des_lab = bi.body.des_lab;
            this.tip_cod = bi.body.tip_cod;
            this.cod_rel = bi.body.cod_rel;

            this.setHeaders();
        } else {
            this.vars = bi.body.vars;
            this.des_rel = bi.body.des_rel;
            this.des_lab = bi.body.des_lab;
        }


        this.config.loading = false;
        //this.loader.close();

    }

    semfCls() {
        let av = this.card.avan;
        if (av >= 0.65 && av < 1) {
            return "ca1 ba2";
        } else if (av >= 1) {
            return "ca1 ba1";
        }
        return "ca1 ba3";
    }

    semfCls2() {
        let av = this.card.avan;
        if (av >= 0.65 && av < 1) {
            return "a fa2";
        } else if (av >= 1) {
            return "a fa1";
        }
        return "a fa3";
    }
}

