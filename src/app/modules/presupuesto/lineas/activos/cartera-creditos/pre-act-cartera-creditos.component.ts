import { OnDestroy, OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { PreLineaSimpleComponent } from "app/modules/presupuesto/compartido/componentes/linea-simple/pre-linea-simple.component";
import { ModBudgetService } from "app/modules/presupuesto/compartido/servicios/mod-budget.service";
import { UserService } from "app/system/admin/services/user.service";
import { tableHeaders, tableHeaders2, tableHeaders3, tableConf } from "./pre-act-cartera-creditos.util";
import { Subject } from "rxjs";
import { cloneObject } from "app/core/shared/functions.util";

@Component({
    selector: 'app-pre-act-creditos-cartera',
    templateUrl: './pre-act-cartera-creditos.component.html',
    styleUrls: ['./pre-act-cartera-creditos.component.scss']
})
export class PreActCarteraCreditosComponent extends PreLineaSimpleComponent implements OnInit, OnDestroy {
    headerDefs2: any;
    headerDefs3: any;
    csSource: any;
    private bcsSource: any;
    tableCfgStyle: any;
    level$ = new Subject<any>();

    constructor(
        public antBudget: ModBudgetService, private user: UserService
    ) {
        super(antBudget, user);
    }

    ngOnDestroy(): void {
    }

    ngOnInit(): void {
        this.headerDefs2 = tableHeaders2;
        this.headerDefs3 = tableHeaders3;
        this.tableCfgStyle = tableConf;
        let currentDate = this.user.get('profile').curr_fec;
        this.csSource = [];

        this.baseInit(
            "Cartera Créditos",
            tableHeaders,
            { code: 9, max_lvl: 5, dlg_tlt: "JERARQUIA ADMIN. COMER." },
            //['ase_nue', 'prod_ase', 'tick_prom','ase_ope'],
            ['b1', 'b3', 'b5', 'b2'],
            { get: 'getResCarCreditos', post: 'postResCarCreditos' }
        );

    }

    private onSelectHierComp(x: any, evt: any) {
        //console.log(x.body.resumen.cs)
        this.csSource = x.body.resumen.cs;
        //console.log(this.csSource)
        this.bcsSource = cloneObject(this.csSource);
    }


    onSelectHier(x: any, evt: any) {
        //console.log(x)
        //console.log(evt)
        this.onSelectHierComp(x, evt);
        this.onSelectHierMain(x, evt);
    }


    restart() {
        super.restart();
        this.csSource = cloneObject(this.bcsSource);
    }

    public editCell(evt: any) {
        //console.log(evt.row.ord)
        console.log(evt);
        let idx = evt.row.ord - 1;
        //if (evt.key == 'ase_nue') {
        if (evt.key == 'b1') {

            for (let i = idx + 2; i <= this.maxIdx; i++) {
                //let ase_nue: number = +this.wsSource[i - 2]['ase_nue'];
                let ase_nue: number = +this.wsSource[i - 2]['b1'];
                let ase_ope: number = +this.wsSource[i - 1]['b2'];
                //let ase_ope: number = +this.wsSource[i - 1]['ase_ope'];
                //this.wsSource[i]['ase_ope'] = ase_nue + ase_ope;
                this.wsSource[i]['b2'] = ase_nue + ase_ope;
                //console.log(ase_nue)
                //console.log(ase_ope)
            }
            this.calculate(idx + 2, null);
        }
        //else if(evt.key == 'ase_ope'){
        else if (evt.key == 'b2') {
            for (let i = idx + 1; i <= this.maxIdx; i++) {
                /*
                let ase_nue: number = +this.wsSource[i - 2]['ase_nue'];
                let ase_ope: number = +this.wsSource[i - 1]['ase_ope'];
                this.wsSource[i]['ase_ope'] = ase_nue + ase_ope;
                */
                let ase_nue: number = +this.wsSource[i - 2]['b1'];
                let ase_ope: number = +this.wsSource[i - 1]['b2'];
                this.wsSource[i]['b2'] = ase_nue + ase_ope;
            }
            this.calculate(idx,null);
        }
        else {
            this.calculate(idx, null);
        }


    }


    public calculateRow(idx: number, key: string) {
        /*
        let ase_ope: number = +this.wsSource[idx]['ase_ope'];
        let prod_ase: number = +this.wsSource[idx]['prod_ase'];
        let ope_des = Math.floor(ase_ope * prod_ase);
        this.wsSource[idx]['ope_des'] = ope_des;
        let tick_prom: number = +this.wsSource[idx]['tick_prom'];
        let mon_des = tick_prom * ope_des;
        this.wsSource[idx]['mon_des'] = mon_des;
        let mon_can: number = +this.wsSource[idx]['mon_can'];
        let sal_ini: number = +this.wsSource[idx]['sal_ini'];
        let sal_cas: number = +this.wsSource[idx]['sal_cas'];
        let sal_fin = sal_ini + mon_des - mon_can - sal_cas;
        this.wsSource[idx]['sal_fin'] = sal_fin;
        */
   

        let ase_ope: number = +this.wsSource[idx]['b2'];
        let prod_ase: number = +this.wsSource[idx]['b3'];
        let ope_des = Math.floor(ase_ope * prod_ase);
        this.wsSource[idx]['b4'] = ope_des;
        let tick_prom: number = +this.wsSource[idx]['b5'];
        let mon_des = tick_prom * ope_des;
        this.wsSource[idx]['b6'] = mon_des;
        //let mon_can: number = +this.wsSource[idx]['c2'];
        
        let sal_ini: number = +this.wsSource[idx]['a1'];
        let rat_can: number = +this.wsSource[idx]['c1'];
        let mon_can: number = sal_ini * rat_can;
        this.wsSource[idx]['c2'] = mon_can;
        console.log(sal_ini+' sal_ini');
        console.log(rat_can);
        console.log(mon_can);


        let sal_cas: number = +this.wsSource[idx]['a2'];
        let sal_fin = sal_ini + mon_des - mon_can - sal_cas;
        this.wsSource[idx]['a3'] = sal_fin;

        /*
        if (idx + 1 <= this.maxIdx) {
            this.wsSource[idx + 1]['sal_ini'] = sal_fin;
            let rat_can: number = +this.wsSource[idx+1]['rat_can'];
            this.wsSource[idx + 1]['mon_can'] = sal_fin*rat_can;
        }
        */

        if (idx + 1 <= this.maxIdx) {
            this.wsSource[idx + 1]['a1'] = sal_fin;
            //let rat_can: number = +this.wsSource[idx + 1]['c1'];
            //this.wsSource[idx + 1]['c2'] = sal_fin * rat_can;
        }

        let r = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '18', '99'];
        r.forEach(
            /*x => {
                console.log(+this.csSource[idx]['rat_comp_'+x])
                let rc = +this.csSource[idx]['rat_comp_'+x];
                this.csSource[idx]['mon_des_'+x]=rc*mon_des;
            }*/
            x => {
                //console.log(+this.csSource[idx]['g_'+x])
                let rc = +this.csSource[idx]['g_' + x];
                this.csSource[idx]['d_' + x] = rc * mon_des;
            }
        );
    }

}