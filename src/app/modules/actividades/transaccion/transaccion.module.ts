import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedMaterialModule } from '../../../core/screen/components/shared-material.module';
import { SharedCWCModule } from '../../../core/screen/components/shared-cwc.module';
import { SharedCMCModule } from '../../shared/shared-cmc.module';
import { TransaccionRoutingModule } from './transaccion-routing.module';
import { ModAppService } from '../../../core/data/remote/instances/mod-app-service';
//import { ModCorresponsalService } from '../servicio/mod-corresponsal.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { HighchartsChartModule } from 'highcharts-angular';
import { SelectModule } from '../../reportes/legacy/support/components/select/select.module';
import { TableModule } from '../../reportes/legacy/support/components/table/table.module';
import { GraphicModule } from '../../reportes/legacy/support/components/graphic/graphic.module';
import { TransaccionComponent } from './transaccion.component';
import { ComercialService } from '../../reportes/legacy/comercial/comercial.service';
import { TransaccionPopupComponent } from './transaccion-popup/transaccion-popup.component';
import { ModCorresponsalService } from '../../corresponsales/servicio/mod-corresponsal.service';
import { ModSecService } from '../../reportes/legacy/support/data/ant-mod-sec.service';
import { ModRepService } from '../../reportes/compartido/servicios/mod-rep.service';

@NgModule({
  imports: [ 
    TransaccionRoutingModule,
    SharedMaterialModule, //
    FormsModule, //
    ReactiveFormsModule,
    CommonModule,//    
    FlexLayoutModule,//
    SharedCWCModule,//
    SharedCMCModule,//
    SharedMaterialModule,
    FormsModule, ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatTabsModule,
    MatTableModule,
    MatGridListModule,
    FlexLayoutModule,
    HighchartsChartModule,
    SelectModule,
    TableModule,
    GraphicModule, 
    
  ],
  declarations: [TransaccionComponent,TransaccionPopupComponent],
  providers: [ModSecService,ComercialService]
  /*,
  providers: [ModAppService, ModCorresponsalService],*/
})
export class TransaccionModule { } 