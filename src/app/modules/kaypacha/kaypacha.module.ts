import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "../shared/shared-cmc.module";
import { KaypachaRoutingModule } from "./kaypacha-routing.module";
import { KaypachaComponent } from "./kaypacha.component";
import { PreguntasKaypachaComponent } from "./preguntas/preguntas.component";
import { PuntajeKaypachaComponent } from "./puntaje/puntaje.component";
import { DesempenioKaypachaComponent } from './desempenio/desempenio.component';
import { DinamizadoresKaypachaComponent } from './dinamizadores/dinamizadores.component';
import { BonosKaypachaComponent } from './bonos/bonos.component';
import { HighchartsChartModule } from "highcharts-angular";
import { ModKaypachaService } from "./compartido/servicio/mod-kaypacha.service";
import { BuscadorKaypachaComponent } from './buscador/buscador.component';

@NgModule({
    imports: [
        KaypachaRoutingModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        SharedMaterialModule,
        SharedCWCModule,
        SharedCMCModule,
        HighchartsChartModule
    ],
    declarations: [KaypachaComponent, PreguntasKaypachaComponent, PuntajeKaypachaComponent,
        DesempenioKaypachaComponent, DinamizadoresKaypachaComponent, BonosKaypachaComponent, BuscadorKaypachaComponent],
    providers: [ModKaypachaService]
})
export class KaypachaModule { }