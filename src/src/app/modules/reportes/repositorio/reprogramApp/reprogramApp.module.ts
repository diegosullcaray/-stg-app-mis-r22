import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module"; 
import { reprogramAppRoutingModule } from "./reprogramApp-routing.module";
import { reprogramAppComponent } from "./reprogramApp.component";

@NgModule({
    imports:[
        reprogramAppRoutingModule,
        SharedCWCModule,
        SharedCMCModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        SharedMaterialModule  
    ],
    declarations:[reprogramAppComponent],
    //providers:[ModAppService]
})
export class reprogramAppModule{}