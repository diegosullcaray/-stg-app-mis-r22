import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";  
import { UsaComeRoutingModule } from "./desembolsos-routing.module";
import { DesembolsosComponent} from "./desembolsos.component";  
const components=[  
];
@NgModule({
    imports:[
        UsaComeRoutingModule,
        CommonModule,
        FormsModule,  
        FlexLayoutModule,
        SharedMaterialModule, 
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[DesembolsosComponent,components],
    //providers:[ModAppService]
})
export class UsaComeModule{}