import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";
import { SeguiIncentivosSecRoutingModule } from "./segui-incentivos-sec-routing.module";
import { SeguiIncentivosSecComponent } from "./segui-incentivos-sec.component";

@NgModule({
    imports:[
        SeguiIncentivosSecRoutingModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        SharedMaterialModule,
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[SeguiIncentivosSecComponent],
    //providers:[ModAppService]
})
export class SeguiIncentivosSecModule{}