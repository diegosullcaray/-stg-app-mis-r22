import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalComponent } from './principal/principal.component';
import { Incentivos3Component } from './incentivos3.component';
import { Incentivos3RoutingModule } from './incentivos3-routing.module';
import { SharedCWCModule } from 'app/core/screen/components/shared-cwc.module';
import { SharedCMCModule } from '../shared/shared-cmc.module';
import { PerfilComponent } from './perfil/perfil.component';
import { AvancesComponent } from './avances/avances.component';
import { ComposicionComponent } from './composicion/composicion.component';
import { SuperPlusComponent } from './super-plus/super-plus.component';
import { TablaComponent } from './tabla/tabla.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { MonetizadoComponent } from './monetizado/monetizado.component';
import { HistoricoComponent } from './historico/historico.component';
import { SelectorJerComponent } from './selector-jer/selector-jer.component';
import { SecPickerDialog2Service } from '../shared/services/sec-picker-dialog2.service';
import { ModIncentivos3Service } from './compartido/servicios/mod-incentivos3.service';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { CalculadoraDialogComponent } from './calculadora/calculadora-dialog.component';
import { AportesComponent } from './aportes/aportes.component';
import { DetalleDialogComponent } from './detalle/detalle-dialog.component';
import { DetalleComponent } from './detalle/detalle.component';
import { Detalle2DialogComponent } from './detalle2/detalle2-dialog.component';
import { Detalle2Component } from './detalle2/detalle2.component';
import { Incentivos3Service } from './compartido/servicios/incentivos3.service';

@NgModule({
    imports: [
        Incentivos3RoutingModule,
        SharedCWCModule,
        SharedCMCModule,
        HighchartsChartModule
    ],
    declarations: [
        PrincipalComponent,
        PerfilComponent,
        AvancesComponent,
        ComposicionComponent,
        SuperPlusComponent,
        TablaComponent,
        MonetizadoComponent,
        HistoricoComponent,
        AportesComponent,
        CalculadoraComponent,
        CalculadoraDialogComponent,
        Incentivos3Component,
        SelectorJerComponent,
        DetalleComponent,
        DetalleDialogComponent,
        Detalle2DialogComponent,
        Detalle2Component
    ],
    providers: [Incentivos3Service,SecPickerDialog2Service,ModIncentivos3Service]
})
export class Incentivos3Module { }
