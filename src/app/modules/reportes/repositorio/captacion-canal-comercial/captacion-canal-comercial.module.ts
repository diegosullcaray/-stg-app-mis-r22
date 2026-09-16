import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module"; 
import { CaptacionCanalComercialComponent } from './captacion-canal-comercial.component';
import { CaptacionCanalComercialRoutingModule } from './captacion-canal-comercial-routing.module';

@NgModule({
    imports:[
        CaptacionCanalComercialRoutingModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        SharedMaterialModule,
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[CaptacionCanalComercialComponent],
    //providers:[ModAppService]
})
export class CaptacionCanalComercialModule{}