import { NgModule } from "@angular/core";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedCMCModule } from "../shared/shared-cmc.module";
import { PowerBIEmbedModule } from 'powerbi-client-angular'; 
import { ModKaypachaService } from "../kaypacha/compartido/servicio/mod-kaypacha.service";
import { RankingKRoutingModule } from "./ranking-k-routing.module";
import { RankingKComponent } from './ranking-k.component'; 
import {  FilterPeoplePipe } from './detallek/filter.pipe';
import { DetalleKComponent } from './detallek/detallek.component';
import { ModFrameworkEsgService } from '../framework-esg/compartido/servicios/mod-framework-esg.service';
import { PrincipalComponent } from "./principal/principal.component"; 
import { ReportesEService } from "./compartido/servicios/reportes-e.service";
import { ModReportesEService } from "./compartido/servicios/mod-reportes-e.service";

// import { ReportesERoutingModule } from "./reportes-e-routing.module";
// import { ReportesEComponent } from "./reportes-e.component";
// import { ModReportesEService } from './compartido/servicios/mod-reportes-e.service';
//import { PrincipalComponent } from './principal/principal.component';
/*import { ReportesEService } from "./compartido/servicios/reportes-e.service";
import { RankingKComponent } from './ranking-k.component';
*/
@NgModule({
    imports:[  
        RankingKRoutingModule,
        SharedCWCModule,
        SharedCMCModule,
        PowerBIEmbedModule    
    ],
    declarations:[RankingKComponent,PrincipalComponent,DetalleKComponent,FilterPeoplePipe ],
    providers: [ModFrameworkEsgService,ModKaypachaService,ReportesEService]
})
export class RankingKModule{}