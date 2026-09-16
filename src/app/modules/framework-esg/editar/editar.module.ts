import { NgModule } from "@angular/core";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";
import { EditarDialogComponent } from "./editar-dialog.component";
import { EditarRoutingModule } from "./editar-routing.module";
import { EditarComponent } from "./editar.component";

@NgModule({
    imports:[
        EditarRoutingModule,
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[EditarComponent,EditarDialogComponent]
})
export class EditarModule{}