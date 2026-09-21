import { NgModule } from "@angular/core";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";  
import { HighchartsChartModule } from "highcharts-angular";
import { MonSalidasComponent } from "app/modules/reportes/repositorio/mon-salidas/mon-salidas.component";
import { DetalleComponent } from "app/modules/reportes/repositorio/mon-salidas/detalle/detalle.component";
import { MonSalidasService } from "app/modules/reportes/repositorio/mon-salidas/compartido/servicios/mon-salidas.service";
import { MonSalidasAntService } from "app/modules/reportes/repositorio/mon-salidas/compartido/servicios/mon-salidas-ant.service";
import { MonSalidasRoutingModule } from "./mon-salidas-routing.module";
import { PrincipalComponent } from "./principal/principal.component";
import { DetalleDialogComponent } from "./detalle/detalle-dialog.component";
import { ListaClientesComponent } from "./lista-clientes/lista-clientes.component";
import { DetalleDialogWrapperComponent } from "./detalle/detalle-dialog-wrapper.component";
import { StgTable3Service } from "app/core/screen/components/stg-table3/stg-table3.service";

const components=[
    MonSalidasComponent,
    PrincipalComponent,
    DetalleComponent,
    DetalleDialogComponent,
    ListaClientesComponent,
    DetalleDialogWrapperComponent
];

@NgModule({
    imports:[
        MonSalidasRoutingModule,
        SharedCWCModule,
        SharedCMCModule,
        HighchartsChartModule
    ],
    declarations:[components],
    providers:[StgTable3Service,MonSalidasService,MonSalidasAntService]
})
export class MonSalidasModule{}