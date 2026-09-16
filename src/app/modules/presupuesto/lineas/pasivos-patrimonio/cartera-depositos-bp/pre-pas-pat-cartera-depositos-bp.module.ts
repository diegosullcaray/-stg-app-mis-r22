import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";
import { PrePasPatCarteraDepositosBpRoutingModule } from "./pre-pas-pat-cartera-depositos-bp-routing.module";
import { PrePasPatCarteraDepositosBpComponent } from "./pre-pas-pat-cartera-depositos-bp.component";

@NgModule({
    imports:[
        PrePasPatCarteraDepositosBpRoutingModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        SharedMaterialModule,
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[PrePasPatCarteraDepositosBpComponent]
})
export class PrePasPatCarteraDepositosBpModule{}