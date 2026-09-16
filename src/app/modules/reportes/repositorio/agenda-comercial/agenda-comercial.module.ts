import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";
import { agendacomercialRoutingModule } from "./agenda-comercial-routing.module";
import { agendacomercialComponent } from "./agenda-comercial.component";

@NgModule({
    imports:[
        agendacomercialRoutingModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        SharedMaterialModule,
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[agendacomercialComponent],
    //providers:[ModAppService]
})
export class agendacomercialModule{}