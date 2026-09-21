import { OnDestroy, OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { PreLineaSimpleComponent } from "app/modules/presupuesto/compartido/componentes/linea-simple/pre-linea-simple.component";
import { ModBudgetService } from "app/modules/presupuesto/compartido/servicios/mod-budget.service";
import { UserService } from "app/system/admin/services/user.service";
import { tableHeaders } from "../../pasivos-patrimonio/cartera-depositos-red/pre-pas-pat-cartera-depositos-red.util";


@Component({
    selector: 'app-pre-pas-pat-creditos-depositos-red',
    templateUrl: '../../../compartido/componentes/linea-simple/pre-linea-simple.component.html',
    styleUrls: ['../../../compartido/componentes/linea-simple/pre-linea-simple.component.scss']
})
export class PrePasPatCarteraDepositosRedComponent extends PreLineaSimpleComponent implements OnInit, OnDestroy {

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
            "Depósitos Red",
            tableHeaders,
            { code: 2, max_lvl: 4, dlg_tlt: 'JERARQUIA AGENCIA DEP.' },
           // { code: 6, max_lvl: 4, dlg_tlt: 'JERARQUIA AGENCIA DEP.' },
           // ['red_ah_sal_var', 'red_cts_sal_var', 'red_dpf_sal_var'],
           ['a2','b2','c2'],
            {get:'getResDepRed',post:'postResDepRed'}
        );
    }

    public calculateRow(idx: number, key: string): void {
        let sik: string = "";
        let vk: string = "";
        let sfk: string = "";
        if (key.startsWith('a')) { //startsWith('red_ah')
            sik = "a1";//"red_ah_sal_ini";
            vk = "a2";//""red_ah_sal_var";
            sfk = "a3";//"red_ah_sal_fin";
        } else if (key.startsWith('b')) { //startsWith('red_cts')
            sik = "b1";//"red_cts_sal_ini";
            vk = "b2";//"red_cts_sal_var";
            sfk = "b3";//"red_cts_sal_fin";
        } else if (key.startsWith('c')) { //startsWith('red_dpf')
            sik = "c1";//"red_dpf_sal_ini";
            vk = "c2";//"red_dpf_sal_var";
            sfk = "c3";//"red_dpf_sal_fin";
        }
        let sal_ini: number = +this.wsSource[idx][sik];
        let sal_var: number = +this.wsSource[idx][vk];
        let sal_fin = sal_ini + sal_var;
        this.wsSource[idx][sfk] = sal_fin;

        if (idx + 1 <= this.maxIdx) {
            this.wsSource[idx + 1][sik] = sal_fin;
        }
    }
}