import { OnDestroy, OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { PreLineaSimpleComponent } from "app/modules/presupuesto/compartido/componentes/linea-simple/pre-linea-simple.component";
import { ModBudgetService } from "app/modules/presupuesto/compartido/servicios/mod-budget.service";
import { UserService } from "app/system/admin/services/user.service";
import { tableHeaders } from "./pre-pas-pat-seguros-operaciones.util";


@Component({
    selector: 'app-pre-pas-pat-seguros-operaciones',
    templateUrl: '../../../compartido/componentes/linea-simple/pre-linea-simple.component.html',
    styleUrls: ['../../../compartido/componentes/linea-simple/pre-linea-simple.component.scss']
})
export class PrePasPatSegurosOperacionesComponent extends PreLineaSimpleComponent implements OnInit, OnDestroy {
    constructor(
        public antBudget: ModBudgetService,private user: UserService
    ) {
        super(antBudget,user);
    }

    ngOnDestroy(): void {
    }

    ngOnInit(): void {
        this.baseInit(
            "Seguros Operaciones",
            tableHeaders,
            { code: 2, max_lvl: 4, dlg_tlt: "JERARQUIA AGENCIA DEP." },
           // { code: 6, max_lvl: 4, dlg_tlt: "JERARQUIA AGENCIA DEP." },
           "all",
            {get:'getResSegOperaciones',post:'postResSegOperaciones'}
        );
    }

    public calculateRow(idx: number, key: string): void {
    }

}