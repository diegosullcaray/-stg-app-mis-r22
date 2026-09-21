import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportCrsV4Component } from './report-crs-v4.component';
import { TableModule } from '../../../table/table.module';
import { SelectModule } from '../../../select/select.module';
import { AutoCompletePropModule } from '../../../auto-complete-prop/auto-complete-prop.module';
const components = [
    ReportCrsV4Component
  ]

@NgModule({
    imports: [
      CommonModule,
      TableModule,
      SelectModule,
      AutoCompletePropModule
    ],
    declarations: components,
    exports:components

  })
  export class ReportCrsV4Module {

  }