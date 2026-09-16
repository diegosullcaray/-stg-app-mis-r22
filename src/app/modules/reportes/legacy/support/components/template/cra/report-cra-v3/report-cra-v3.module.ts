import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportCraV3Component } from './report-cra-v3.component';
import { SelectModule } from '../../../../components/select/select.module';
import { GraphicModule } from '../../../../components/graphic/graphic.module';
import { TableModule } from '../../../../components/table/table.module';
import { SharedCWCModule } from 'app/core/screen/components/shared-cwc.module';
import { SharedCMCModule } from 'app/modules/shared/shared-cmc.module';
const components = [
    ReportCraV3Component
  ]

@NgModule({
    imports: [
      CommonModule,
      SelectModule,
      GraphicModule,
      TableModule,
      SharedCWCModule,
      SharedCMCModule
    ],
    declarations: components,
    exports:components

  })
  export class ReportCraV3Module {

  }