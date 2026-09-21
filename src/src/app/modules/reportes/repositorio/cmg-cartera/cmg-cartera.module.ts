import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";   
import { CmgCarteraComponent } from "./cmg-cartera.component";
import { CmgcarteraRoutingModule } from "./cmg-cartera-routing.module";

@NgModule({
    imports:[
        CmgcarteraRoutingModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        SharedMaterialModule,
        SharedCWCModule,
        SharedCMCModule 
    ],
    declarations:[CmgCarteraComponent],
    //providers:[ModAppService]
})  
export class cmgcarteraModule{}