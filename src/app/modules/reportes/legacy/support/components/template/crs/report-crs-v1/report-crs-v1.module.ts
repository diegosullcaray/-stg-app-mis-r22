import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportCrsV1Component } from './report-crs-v1.component';
import { TableModule } from '../../../table/table.module';
import { SelectModule } from '../../../select/select.module';
import { AutoCompleteModule } from '../../../auto-complete/auto-complete.module';
const components = [
    ReportCrsV1Component
  ]

@NgModule({
    imports: [
      CommonModule,
      TableModule,
      SelectModule,
      AutoCompleteModule
    ],
    declarations: components,
    exports:components

  })
  export class ReportCrsV1Module {

  }