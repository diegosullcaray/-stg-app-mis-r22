import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";   
import { RankingComercialComponent } from "./ranking-comercial.component"; 
import { RankingComercialRoutingModule } from "./ranking-comercial-routing.module";

@NgModule({
    imports:[
        RankingComercialRoutingModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        SharedMaterialModule,
        SharedCWCModule,
        SharedCMCModule 
    ],
    declarations:[RankingComercialComponent],
    //providers:[ModAppService]
})  
export class rankingcomercialModule{}