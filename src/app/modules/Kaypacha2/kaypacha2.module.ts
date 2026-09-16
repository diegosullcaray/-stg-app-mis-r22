import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "../shared/shared-cmc.module";
import { Kaypacha2RoutingModule } from "./kaypacha2-routing.module"; 
import { HighchartsChartModule } from "highcharts-angular"; 
import { Kaypacha2Component } from './kaypacha2.component'; 
import { ModKaypachaService } from '../kaypacha/compartido/servicio/mod-kaypacha.service';
import { HistoricoKaypachaComponent } from './historico/historico.component'; 
import { BuscadorKaypachaComponent } from "./buscador/buscador.component";
import { VariableKaypachaComponent } from './variable/variable.component';

@NgModule({
    imports: [
        Kaypacha2RoutingModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        SharedMaterialModule,
        SharedCWCModule,
        SharedCMCModule,
        HighchartsChartModule
    ],
    declarations: [Kaypacha2Component,HistoricoKaypachaComponent,VariableKaypachaComponent,BuscadorKaypachaComponent],
    providers: [ModKaypachaService]
})
export class Kaypacha2Module { }