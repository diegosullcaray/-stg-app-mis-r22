import { NgModule } from "@angular/core";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedCMCModule } from "../shared/shared-cmc.module";
import { AdministracionComponent } from "./administracion.component";
import { AdministracionRoutingModule } from "./administracion-routing.module";
import { ModAdminService } from "./compartido/servicios/mod-admin.service";
import { AdministracionService } from "./compartido/servicios/administracion.service";

@NgModule({
    imports:[
        AdministracionRoutingModule,
        SharedCWCModule,
        SharedCMCModule,
        //HighchartsChartModule      
    ],
    declarations:[AdministracionComponent],
    providers:[ModAdminService,AdministracionService]
})
export class AdministracionModule{}