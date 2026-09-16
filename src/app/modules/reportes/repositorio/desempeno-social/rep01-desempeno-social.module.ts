import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";
import { Rep01DesempenoSocialRoutingModule } from "./rep01-desempeno-social-routing.module";
import { Rep01DesempenoSocialComponent } from "./rep01-desempeno-social.component";

@NgModule({
    imports:[
        Rep01DesempenoSocialRoutingModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        SharedMaterialModule,
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[Rep01DesempenoSocialComponent],
    //providers:[ModAppService]
})
export class Rep01DesempenoSocialModule{}