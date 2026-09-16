import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";
import { PrePasPatSegurosComercialRoutingModule } from "./pre-pas-pat-seguros-comercial-routing.module";
import { PrePasPatSegurosComercialComponent } from "./pre-pas-pat-seguros-comercial.component";

@NgModule({
    imports:[
        PrePasPatSegurosComercialRoutingModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        SharedMaterialModule,
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[PrePasPatSegurosComercialComponent]
})
export class PrePasPatSegurosComercialModule{}