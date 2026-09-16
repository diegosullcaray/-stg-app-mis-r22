import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module"; 
import { CaptacionCanalOperacionComponent } from './captacion-canal-operacion.component';
import { CaptacionCanalOperacionRoutingModule } from './captacion-canal-operacion-routing.module';

@NgModule({
    imports:[
        CaptacionCanalOperacionRoutingModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        SharedMaterialModule,
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[CaptacionCanalOperacionComponent],
    //providers:[ModAppService]
})
export class CaptacionCanalOperacionModule{}