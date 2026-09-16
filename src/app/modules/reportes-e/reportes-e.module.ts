import { NgModule } from "@angular/core";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedCMCModule } from "../shared/shared-cmc.module";
import { PowerBIEmbedModule } from 'powerbi-client-angular';
import { ReportesERoutingModule } from "./reportes-e-routing.module";
import { ReportesEComponent } from "./reportes-e.component";
import { ModReportesEService } from "./compartido/servicios/mod-reportes-e.service";
import { PrincipalComponent } from './principal/principal.component';
import { ReportesEService } from "./compartido/servicios/reportes-e.service";
import { PowerbiComponent } from "./powerbi/powerbi.component";

@NgModule({
    imports:[
        ReportesERoutingModule,
        SharedCWCModule,
        SharedCMCModule,
        PowerBIEmbedModule
        //HighchartsChartModule      
    ],
    declarations:[ReportesEComponent, PrincipalComponent,PowerbiComponent],
    providers:[ModReportesEService,ReportesEService]
})
export class ReportesEModule{}