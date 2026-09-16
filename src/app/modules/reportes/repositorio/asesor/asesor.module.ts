import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";   
import { AsesorComponent} from "./asesor.component";
import { AsesorRoutingModule } from "./asesor-routing.module";
import { NgChartsModule } from "ng2-charts";

@NgModule({
    imports:[
        AsesorRoutingModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        SharedMaterialModule,
        SharedCWCModule,
        SharedCMCModule ,
        NgChartsModule
        
    ],
    declarations:[AsesorComponent],
    //providers:[ModAppService]
})  
export class AsesorModule{}