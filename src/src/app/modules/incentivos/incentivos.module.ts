import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { ModAppService } from "app/core/data/remote/instances/mod-app-service";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "../shared/shared-cmc.module";
import { CalculadoraIncentivosComponent } from "./calculadora/calc-incentivos.component";
import { DetalleIncentivosComponent } from "./detalle/det-incentivos.component";
import { IncentivosRoutingModule } from "./incentivos-routing.module";
import { IncentivosComponent } from "./incentivos.component";
import { ResumenIncentivosComponent } from "./resumen/res-incentivos.component";

@NgModule({
    imports:[
        IncentivosRoutingModule,
        CommonModule,
        FormsModule,
        //RouterModule,
        FlexLayoutModule,
        SharedMaterialModule,
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[IncentivosComponent,ResumenIncentivosComponent,CalculadoraIncentivosComponent,DetalleIncentivosComponent],
    providers:[ModAppService]
})
export class IncentivosModule{}