import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { ModRepService } from "app/modules/reportes/compartido/servicios/mod-rep.service";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";
import { PreActCarteraCreditosRoutingModule } from "./pre-act-cartera-creditos-routing.module";
import { PreActCarteraCreditosComponent } from "./pre-act-cartera-creditos.component";

@NgModule({
    imports:[
        PreActCarteraCreditosRoutingModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        SharedMaterialModule,
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[PreActCarteraCreditosComponent], 
    //providers:[ModAppService]
})
export class PreActCarteraCreditosModule{}