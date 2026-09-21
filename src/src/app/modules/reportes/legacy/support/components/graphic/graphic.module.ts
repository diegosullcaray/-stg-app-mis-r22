import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { GraphicBasicComponent } from './graphic-basic/graphic-basic.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PipeModule } from '../../pipes/pipe.module';


const components = [
    GraphicBasicComponent,
  ]

@NgModule({
    imports: [
      CommonModule,
      MatProgressSpinnerModule,
      MatCardModule,
      MatChipsModule,
      MatButtonModule,
      MatIconModule,
      FlexLayoutModule,
      HighchartsChartModule,
      PipeModule
    ],
    declarations: components,
    exports:components

  })
  export class GraphicModule {}