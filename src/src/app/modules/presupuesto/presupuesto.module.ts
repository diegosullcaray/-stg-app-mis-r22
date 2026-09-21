import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { ModAppService } from "app/core/data/remote/instances/mod-app-service";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "../shared/shared-cmc.module";
import { ModBudgetService } from "./compartido/servicios/mod-budget.service";
import { PresupuestoRoutingModule } from "./presupuesto-routing.module";
import { PresupuestoComponent } from "./presupuesto.component";

@NgModule({
    imports:[
        PresupuestoRoutingModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        SharedMaterialModule,
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[PresupuestoComponent],
    providers:[ModAppService,ModBudgetService]
})
export class PresupuestoModule{}