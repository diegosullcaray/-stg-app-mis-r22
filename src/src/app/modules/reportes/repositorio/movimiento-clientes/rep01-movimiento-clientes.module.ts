import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";
import { Rep01MovimientoClientesRoutingModule } from "./rep01-movimiento-clientes-routing.module";
import { Rep01MovimientoClientesComponent } from "./rep01-movimiento-clientes.component";

@NgModule({
    imports:[
        Rep01MovimientoClientesRoutingModule,
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[Rep01MovimientoClientesComponent],
    //providers:[ModAppService]
})
export class Rep01MovimientoClientesModule{}