import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportCrsV3Component } from './report-crs-v3.component';
import { AutoCompleteModule } from '../../../auto-complete/auto-complete.module';
import { TableModule } from '../../../table/table.module';
import { SelectModule } from '../../../select/select.module';

const components = [
  ReportCrsV3Component
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
  export class ReportCrsV3Module {

  }