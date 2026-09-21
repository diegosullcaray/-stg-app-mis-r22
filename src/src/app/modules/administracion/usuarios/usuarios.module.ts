import { NgModule } from "@angular/core";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";
import { UsuariosRoutingModule } from "./usuarios-routing.module";
import { UsuariosComponent } from "./usuarios.component";


@NgModule({
    imports:[
        UsuariosRoutingModule,
        SharedCWCModule,
        SharedCMCModule,
        //HighchartsChartModule      
    ],
    declarations:[UsuariosComponent],
    providers:[]
})
export class UsuariosModule{}