import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";  
import { SeguroComRoutingModule } from "./seguro-com-routing.module";
import { SeguroComComponent} from "./seguro-com.component";  
const components=[  
];
@NgModule({
    imports:[
        SeguroComRoutingModule,
        CommonModule,
        FormsModule,  
        FlexLayoutModule,
        SharedMaterialModule, 
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[SeguroComComponent,components],
    //providers:[ModAppService]
})
export class SeguroComModule{}