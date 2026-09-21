import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportCraV1p8Component } from './report-cra-v1p8.component';
import { SelectModule } from '../../../select/select.module';
import { TableModule } from '../../../table/table.module';
import { GraphicModule } from '../../../graphic/graphic.module';
import { SharedCWCModule } from 'app/core/screen/components/shared-cwc.module';
import { SharedCMCModule } from 'app/modules/shared/shared-cmc.module';

const components = [
    ReportCraV1p8Component
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
  export class ReportCraV1P8Module {

  }