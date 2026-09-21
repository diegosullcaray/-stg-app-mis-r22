import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";
import { PrePasPatCarteraDepositosRedRoutingModule } from "./pre-pas-pat-cartera-depositos-red-routing.module";
import { PrePasPatCarteraDepositosRedComponent } from "./pre-pas-pat-cartera-depositos-red.component";

@NgModule({
    imports:[
        PrePasPatCarteraDepositosRedRoutingModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        SharedMaterialModule,
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[PrePasPatCarteraDepositosRedComponent]
})
export class PrePasPatCarteraDepositosRedModule{}