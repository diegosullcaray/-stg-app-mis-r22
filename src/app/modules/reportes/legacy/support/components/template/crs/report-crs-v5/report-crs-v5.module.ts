import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { ReportCrsV5Component } from './report-crs-v5.component';
import { TableModule } from '../../../table/table.module';
import { SelectModule } from '../../../select/select.module';
import { AutoCompleteModule } from '../../../auto-complete/auto-complete.module';
import { ReportCrsv5Component } from './report-crs-v5.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
const components = [
    ReportCrsv5Component
  ]

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      TableModule,
      SelectModule,
      AutoCompleteModule,
      MatTabsModule
    ],
    declarations: components,
    exports:components

  })
  export class ReportCrsV5Module {

  }