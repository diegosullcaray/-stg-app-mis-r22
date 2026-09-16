import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsabilidadRoutingModule } from './usabilidad-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedMaterialModule } from 'app/core/screen/components/shared-material.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    UsabilidadRoutingModule,
    SharedMaterialModule,
    HighchartsChartModule,
    FlexLayoutModule]
})
export class UsabilidadModule { }
