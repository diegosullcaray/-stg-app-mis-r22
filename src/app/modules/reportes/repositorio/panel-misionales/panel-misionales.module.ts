import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";  
import { panelMisionalesRoutingModule } from "./panel-misionales-routing.module";
import { panelMisioanlesComponent } from "./panel-misionales.component";

@NgModule({
    imports:[
        panelMisionalesRoutingModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule, 
        SharedMaterialModule,
        SharedCWCModule,
        SharedCMCModule 
    ],
    declarations:[panelMisioanlesComponent],
    //providers:[ModAppService]
})
export class panelMisionalesModule{}