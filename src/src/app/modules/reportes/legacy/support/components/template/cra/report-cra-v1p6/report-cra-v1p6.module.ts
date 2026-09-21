import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportCraV1p6Component } from './report-cra-v1p6.component';
import { SelectModule } from '../../../select/select.module';
import { TableModule } from '../../../table/table.module';
import { GraphicModule } from '../../../graphic/graphic.module';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedCWCModule } from 'app/core/screen/components/shared-cwc.module';
import { SharedCMCModule } from 'app/modules/shared/shared-cmc.module';

const components = [
    ReportCraV1p6Component
  ]

@NgModule({
    imports: [
      CommonModule,
      SelectModule,
      TableModule,
      GraphicModule,
      MatTabsModule,
      SharedCWCModule,
      SharedCMCModule
    ],
    declarations: components,
    exports:components

  })
  export class ReportCraV1P6Module {

  }