import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";   
import { SeguroOptativoComponent } from "./seguro-optativo.component";
import { SeguroOptativoRoutingModule } from "./seguro-optativo-routing.module";

@NgModule({
    imports:[
        SeguroOptativoRoutingModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        SharedMaterialModule,
        SharedCWCModule,
        SharedCMCModule 
    ],
    declarations:[SeguroOptativoComponent],
    //providers:[ModAppService]
})
export class panelMisionalesModule{}