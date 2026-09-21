import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";   
import { SeguroPasivoGrafComponent } from "./seguro-pasivo-graf.component";
import { SeguroPasivoGrafRoutingModule } from "./seguro-pasivo-graf-routing.module";
import { ModRepService } from "../../legacy/support/data/ant-mod-rep.service";
import { ComercialService } from "../../legacy/comercial/comercial.service";
import { ModSecService } from "../../legacy/support/data/ant-mod-sec.service";
 
@NgModule({
    imports:[
        SeguroPasivoGrafRoutingModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        SharedMaterialModule,
        SharedCWCModule,
        SharedCMCModule, 

    ],
    declarations:[SeguroPasivoGrafComponent] ,
    providers: [ModRepService,ComercialService,ModSecService],
    //providers:[ModAppService]
})
export class SeguroPasivoGrafModule{}