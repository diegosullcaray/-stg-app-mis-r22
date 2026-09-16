import { OnDestroy, OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { PreLineaSimpleComponent } from "app/modules/presupuesto/compartido/componentes/linea-simple/pre-linea-simple.component";
import { ModBudgetService } from "app/modules/presupuesto/compartido/servicios/mod-budget.service";
import { UserService } from "app/system/admin/services/user.service";
import { tableHeaders } from "./pre-pas-pat-seguros-comercial.util";


@Component({
    selector: 'app-pre-pas-pat-seguros-comercial',
    templateUrl: '../../../compartido/componentes/linea-simple/pre-linea-simple.component.html',
    styleUrls: ['../../../compartido/componentes/linea-simple/pre-linea-simple.component.scss']
})
export class PrePasPatSegurosComercialComponent extends PreLineaSimpleComponent implements OnInit, OnDestroy {

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
            "Seguros Comercial",
            tableHeaders,
            { code: 9, max_lvl: 5, dlg_tlt: "JERARQUIA ADMIN. COMER." },
            //{ code: 5, max_lvl: 5, dlg_tlt: "JERARQUIA ADMIN. COMER." },
            "all",
            {get:'getResSegComercial',post:'postResSegComercial'}
        );
    }

    public calculateRow(idx: number, key: string): void {
    }

}