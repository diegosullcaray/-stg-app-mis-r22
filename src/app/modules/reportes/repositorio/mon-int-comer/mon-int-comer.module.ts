import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module"; 
import { MonIntComerComponent } from "./mon-int-comer.component";
import { MonIntComerRoutingModule } from "./mon-int-comer-routing.module";

@NgModule({
    imports:[
        MonIntComerRoutingModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        SharedMaterialModule, 
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[MonIntComerComponent],
    //providers:[ModAppService]
})
export class MonIntComerModule{}