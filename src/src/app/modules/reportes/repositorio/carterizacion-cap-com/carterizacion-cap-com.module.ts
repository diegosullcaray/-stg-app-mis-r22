import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";  
import { CarterizacionCapComRoutingModule } from "./carterizacion-cap-com-routing.module";
import { CarterizacionCapComComponent} from "./carterizacion-cap-com.component";  
const components=[  
];
@NgModule({
    imports:[
        CarterizacionCapComRoutingModule,
        CommonModule,
        FormsModule,  
        FlexLayoutModule,
        SharedMaterialModule, 
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[CarterizacionCapComComponent,components],
    //providers:[ModAppService]
})
export class CarterizacionCapComModule{}