import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module"; 
import { rankingMujerComponent } from "./ranking-mujer.component";
import { rankingMujerRoutingModule } from "./ranking-mujer-routing.module";

@NgModule({
    imports:[
        rankingMujerRoutingModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        SharedMaterialModule,
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[rankingMujerComponent],
    //providers:[ModAppService]
})
export class rankingMujerModule{}