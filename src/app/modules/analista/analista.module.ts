import { NgModule } from "@angular/core";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedCMCModule } from "../shared/shared-cmc.module";
import { SecPickerDialog2Service } from "../shared/services/sec-picker-dialog2.service";
import { AnalistaRoutingModule } from "./analista-routing.module";
import { AnalistaComponent } from "./analista.component";
import { AnalistaService } from "./compartido/servicios/analista.service";
import { ModSecService } from "./compartido/servicios/mod-sec.service";
import { PrincipalComponent } from "./principal/principal.component";
import { HighchartsChartModule } from "highcharts-angular";

@NgModule({
    imports:[
        AnalistaRoutingModule,
        SharedCWCModule,
        SharedCMCModule,
        HighchartsChartModule
    ],
    declarations:[AnalistaComponent,PrincipalComponent],
    providers:[ModSecService,AnalistaService,SecPickerDialog2Service]
})
export class AnalistaModule{}