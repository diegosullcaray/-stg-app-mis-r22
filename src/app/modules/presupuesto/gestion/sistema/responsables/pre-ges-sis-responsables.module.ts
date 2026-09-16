import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";
import { PreGesSisResponsablesRoutingModule } from "./pre-ges-sis-responsables-routing.module";
import { PreGesSisResponsablesComponent } from "./pre-ges-sis-responsables.component";

@NgModule({
    imports:[
        PreGesSisResponsablesRoutingModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        SharedMaterialModule,
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[PreGesSisResponsablesComponent],
    //providers:[ModAppService]
})
export class PreGesSisResponsablesModule{}