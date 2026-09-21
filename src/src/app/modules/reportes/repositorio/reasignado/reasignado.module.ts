import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";   
import { reasignadoComponent } from "./reasignado.component";
import { reasignadoRoutingModule } from "./reasignado-routing.module";

@NgModule({
    imports:[
        reasignadoRoutingModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        SharedMaterialModule,
        SharedCWCModule,
        SharedCMCModule 
    ],
    declarations:[reasignadoComponent],
    //providers:[ModAppService]
})  
export class reasignadoModule{}