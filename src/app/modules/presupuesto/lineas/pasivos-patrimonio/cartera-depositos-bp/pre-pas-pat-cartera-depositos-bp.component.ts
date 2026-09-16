import { OnDestroy, OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { PreLineaSimpleComponent } from "app/modules/presupuesto/compartido/componentes/linea-simple/pre-linea-simple.component";
import { ModBudgetService } from "app/modules/presupuesto/compartido/servicios/mod-budget.service";
import { UserService } from "app/system/admin/services/user.service";
import { tableHeaders } from "./pre-pas-pat-cartera-depositos-bp.util";

@Component({
    selector: 'app-pre-pas-pat-creditos-depositos-bp',
    templateUrl: '../../../compartido/componentes/linea-simple/pre-linea-simple.component.html',
    styleUrls: ['../../../compartido/componentes/linea-simple/pre-linea-simple.component.scss']
})
export class PrePasPatCarteraDepositosBpComponent extends PreLineaSimpleComponent implements OnInit, OnDestroy {
    constructor(
        public antBudget: ModBudgetService,private user: UserService
    ) {
        super(antBudget,user);
    }

    ngOnDestroy(): void {
    }


    ngOnInit(): void {
        let currentDate = this.user.get('profile').curr_fec;
        this.baseInit(
            "Depósitos Banca Preferente",
            tableHeaders,
            { code: 7, max_lvl: 2, dlg_tlt: "JERARQUIA BANCA PREF." },
            //['bp_ah_sal_var','bp_cts_sal_var','bp_dpf_sal_var'],
            ['a2','b2','c2'],
            {get:'getResDepBP',post:'postResDepBP'}
        );
    }

    public calculateRow(idx:number,key:string){
        let sik:string="";
        let vk:string="";
        let sfk:string="";
        if(key.startsWith('a')){ //startsWith('bp_ah')
            sik="a1";//"bp_ah_sal_ini";
            vk="a2";//"bp_ah_sal_var";
            sfk="a3";//"bp_ah_sal_fin";
        }else if(key.startsWith('b')){ //startsWith('bp_cts')
            sik="b1";//"bp_cts_sal_ini";
            vk="b2";//"bp_cts_sal_var";
            sfk="b3";//"bp_cts_sal_fin";
        }else if(key.startsWith('c')){ //startsWith('bp_dpf')
            sik="c1";//""bp_dpf_sal_ini";
            vk="c2";//""bp_dpf_sal_var";
            sfk="c3";//""bp_dpf_sal_fin";
        }
        let sal_ini:number =+this.wsSource[idx][sik];
        let sal_var:number = +this.wsSource[idx][vk];
        let sal_fin = sal_ini+sal_var;
        this.wsSource[idx][sfk]=sal_fin;

        if(idx+1<=this.maxIdx){
            this.wsSource[idx+1][sik]=sal_fin;
        }
    }

}