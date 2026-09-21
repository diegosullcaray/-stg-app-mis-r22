import { NgModule } from "@angular/core";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";  
import { HighchartsChartModule } from "highcharts-angular";
import { MonImrComponent } from "app/modules/reportes/repositorio/mon-imr/mon-imr.component";
import { DetalleComponent } from "app/modules/reportes/repositorio/mon-imr/detalle/detalle.component";
import { MonImrService } from "app/modules/reportes/repositorio/mon-imr/compartido/servicios/mon-imr.service";
import { MonImrAntService } from "app/modules/reportes/repositorio/mon-imr/compartido/servicios/mon-imr-ant.service";
import { MonImrRoutingModule } from "./mon-imr-routing.module";
import { PrincipalComponent } from "./principal/principal.component";
import { DetalleDialogComponent } from "./detalle/detalle-dialog.component";
import { ListaClientesComponent } from "./lista-clientes/lista-clientes.component";
import { DetalleDialogWrapperComponent } from "./detalle/detalle-dialog-wrapper.component";
import { StgTable3Service } from "app/core/screen/components/stg-table3/stg-table3.service";

const components=[
    MonImrComponent,
    PrincipalComponent,
    DetalleComponent,
    DetalleDialogComponent,
    ListaClientesComponent,
    DetalleDialogWrapperComponent
];

@NgModule({
    imports:[
        MonImrRoutingModule,
        SharedCWCModule,
        SharedCMCModule,
        HighchartsChartModule
    ],
    declarations:[components],
    providers:[StgTable3Service,MonImrService,MonImrAntService]
})
export class MonImrModule{}