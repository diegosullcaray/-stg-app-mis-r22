import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "../shared/shared-cmc.module";
import { Kaypacha3RoutingModule } from "./kaypacha3-routing.module"; 
import { HighchartsChartModule } from "highcharts-angular"; 
import { Kaypacha3Component } from './kaypacha3.component'; 
import { ModKaypachaService } from '../kaypacha/compartido/servicio/mod-kaypacha.service'; 
import { BuscadorKaypachaComponent } from "./buscador/buscador.component";  
import { ModFrameworkEsgService } from '../framework-esg/compartido/servicios/mod-framework-esg.service';

@NgModule({
    imports: [
        Kaypacha3RoutingModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        SharedMaterialModule,
        SharedCWCModule,
        SharedCMCModule,
        HighchartsChartModule 
    ],
    declarations: [Kaypacha3Component,BuscadorKaypachaComponent],
    providers: [ModFrameworkEsgService,ModKaypachaService]
})
export class Kaypacha3Module { }