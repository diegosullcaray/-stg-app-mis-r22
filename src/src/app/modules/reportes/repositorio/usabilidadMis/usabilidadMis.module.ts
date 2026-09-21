import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module"; 
import { usabilidadMisRoutingModule } from "./usabilidadMis-routing.module";
import { usabilidadMisComponent } from "./usabilidadMis.component";
import { HighchartsChartModule } from "highcharts-angular"; 


@NgModule({
    imports:[
        usabilidadMisRoutingModule,
        SharedCWCModule,
        SharedCMCModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        SharedMaterialModule,
        HighchartsChartModule  
    ],
    declarations:[usabilidadMisComponent],
    //providers:[ModAppService]
})

export class usabilidadMisModule{}