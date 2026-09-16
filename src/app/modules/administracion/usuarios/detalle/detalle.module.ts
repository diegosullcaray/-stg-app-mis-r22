import { NgModule } from "@angular/core";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";
import { DetalleDialogComponent } from "./detalle-dialog.component";
import { DetalleRoutingModule } from "./detalle-routing.module";
import { DetalleComponent } from "./detalle.component";

@NgModule({
    imports:[
        DetalleRoutingModule,
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[DetalleComponent,DetalleDialogComponent]
})
export class DetalleModule{}