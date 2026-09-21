import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalComponent } from './principal/principal.component';
import { Incentivos4Component } from './incentivos4.component';
import { Incentivos4RoutingModule } from './incentivos4-routing.module';
import { SharedCWCModule } from 'app/core/screen/components/shared-cwc.module';
import { SharedCMCModule } from '../shared/shared-cmc.module';
import { AvancesComponent } from './avances/avances.component';
import { HighchartsChartModule } from 'highcharts-angular';
//import { SelectorJerComponent } from './selector-jer/selector-jer.component';
import { SecPickerDialog2Service } from '../shared/services/sec-picker-dialog2.service';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { DetalleComponent } from './detalle/detalle.component';
import { Detalle2Component } from './detalle2/detalle2.component';
import { Incentivos4Service } from './compartido/servicios/incentivos4.service';
import { ModIncentivos4Service } from './compartido/servicios/mod-incentivos4.service';
import { Detalle2DialogComponent } from './detalle2/detalle2-dialog.component';
import { DetalleDialogComponent } from './detalle/detalle-dialog.component';
import { CardsComponent } from './cards/cards.component';
import { DinamizadoresComponent } from './dinamizadores/dinamizadores.component';

@NgModule({
    imports: [
        Incentivos4RoutingModule,
        SharedCWCModule,
        SharedCMCModule,
        HighchartsChartModule
    ],
    declarations: [
        PrincipalComponent,
        CardsComponent,
        AvancesComponent,
        DinamizadoresComponent,
        CalculadoraComponent,
        Incentivos4Component,
        //SelectorJerComponent,
        DetalleComponent,
        DetalleDialogComponent,
        Detalle2DialogComponent,
        Detalle2Component
    ],
    providers: [Incentivos4Service,SecPickerDialog2Service,ModIncentivos4Service]
})
export class Incentivos4Module { }
