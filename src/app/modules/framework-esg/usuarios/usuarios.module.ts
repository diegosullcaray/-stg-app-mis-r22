import { NgModule } from "@angular/core";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";
import { UsuariosDialogComponent } from "./usuarios-dialog.component";
import { UsuariosRoutingModule } from "./usuarios-routing.module";
import { UsuariosComponent } from "./usuarios.component";

@NgModule({
    imports:[
        UsuariosRoutingModule,
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[UsuariosComponent,UsuariosDialogComponent]
})
export class UsuariosModule{}