import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";
import { PrePasPatSegurosOperacionesRoutingModule } from "./pre-pas-pat-seguros-operaciones-routing.module";
import { PrePasPatSegurosOperacionesComponent } from "./pre-pas-pat-seguros-operaciones.component";

@NgModule({
    imports:[
        PrePasPatSegurosOperacionesRoutingModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        SharedMaterialModule,
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[PrePasPatSegurosOperacionesComponent]
})
export class PrePasPatSegurosOperacionesModule{}