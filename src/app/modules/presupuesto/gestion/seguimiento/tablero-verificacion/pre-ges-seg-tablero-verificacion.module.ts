import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";
import { PreGesSegTableroVerificacionRoutingModule } from "./pre-ges-seg-tablero-verificacion-routing.module";
import { PreGesSegTableroVerificacionComponent } from "./pre-ges-seg-tablero-verificacion.component";

@NgModule({
    imports:[
        PreGesSegTableroVerificacionRoutingModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        SharedMaterialModule,
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[PreGesSegTableroVerificacionComponent],
    //providers:[ModAppService]
})
export class PreGesSegTableroVerificacionModule{}