import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportCraV1p1Component } from './report-cra-v1p1.component';
import { SelectModule } from '../../../select/select.module';
import { TableModule } from '../../../table/table.module';
import { GraphicModule } from '../../../graphic/graphic.module';
import { SharedCWCModule } from 'app/core/screen/components/shared-cwc.module';
import { SharedCMCModule } from 'app/modules/shared/shared-cmc.module';

const components = [
    ReportCraV1p1Component
  ]

@NgModule({
    imports: [
      SharedCWCModule,
      SharedCMCModule,
      SelectModule,
      TableModule,
      GraphicModule,
      
    ],
    declarations: components,
    exports:components

  })
  export class ReportCraV1P1Module {

  }