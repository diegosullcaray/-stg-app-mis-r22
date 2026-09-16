import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";  
import { CarterizacionRoutingModule } from "./carterizacion-routing.module";
import { CarterizacionComponent} from "./carterizacion.component";  
const components=[  
];
@NgModule({
    imports:[
        CarterizacionRoutingModule,
        CommonModule,
        FormsModule,  
        FlexLayoutModule,
        SharedMaterialModule, 
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[CarterizacionComponent,components],
    //providers:[ModAppService]
})
export class CarterizacionModule{}