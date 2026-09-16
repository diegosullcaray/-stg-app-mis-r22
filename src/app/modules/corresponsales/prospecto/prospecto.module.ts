import { NgModule } from '@angular/core';
//import { SharedMaterialModule } from '../../../../../../../core/screen/components/shared-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { ComercialService } from '../../../../comercial/comercial.service';
//import { ModRepService } from '../../../../support/data/ant-mod-rep.service';
import { ProspectoCorresponsalRoutingModule } from './prospecto-routing.module';
import { CommonModule } from '@angular/common';
//import { RouterModule } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
//import { ChartsModule } from 'ng2-charts';
//import { NgxEchartsModule } from 'ngx-echarts';
//import { SelectModule } from '../../../../support/components/select/select.module';
//import { TableModule } from '../../../../support/components/table/table.module';
//import { GraphicModule } from '../../../../support/components/graphic/graphic.module';
//import { AgmCoreModule } from '@agm/core';
//import { WinderService } from '../../../../../../../core/data/remote/winder/winder.service';
//import { ProspectoModule } from '../prospectos.module';
import { ProspectoComponent } from './prospecto.component';
import { SharedMaterialModule } from '../../../core/screen/components/shared-material.module';
import { ComercialService } from '../../reportes/legacy/comercial/comercial.service';
import { ModRepService } from '../../reportes/legacy/support/data/ant-mod-rep.service';
import { SelectModule } from '../../reportes/legacy/support/components/select/select.module';
import { TableModule } from '../../reportes/legacy/support/components/table/table.module';
import { GraphicModule } from '../../reportes/legacy/support/components/graphic/graphic.module';
import { SharedCMCModule } from 'app/modules/shared/shared-cmc.module';
//import { ProspectoModule } from '../../reportes/legacy/banca-electronica/gestion/prospecto/prospectos.module';
 
@NgModule({
  imports: [ 
    ProspectoCorresponsalRoutingModule,
    //ProspectoModule,
    FormsModule, ReactiveFormsModule,
    CommonModule,
    // MatIconModule,
    // MatCardModule,
    // MatMenuModule,
    // MatProgressBarModule,
    // MatExpansionModule,
    // MatButtonModule,
    // MatChipsModule,
    // MatListModule,
    // MatTabsModule,
    // MatTableModule,
    // MatGridListModule,
    FlexLayoutModule,
    //ChartsModule,
    //NgxEchartsModule,
    HighchartsChartModule,
    SelectModule,
    TableModule,
    GraphicModule,
    //AgmCoreModule.forRoot({ apiKey: 'AIzaSyAbboTmP7QZMKmyLzwaibF6GsnWJfo2SoE' }),
    SharedMaterialModule,
    SharedCMCModule
  ],
  declarations: [ProspectoComponent],
  //providers:[WinderService,/*VacacionesService,*/ComercialService,ModRepService],
  providers: [ComercialService, ModRepService]
})
export class CorresponsalProspectosModule { } 