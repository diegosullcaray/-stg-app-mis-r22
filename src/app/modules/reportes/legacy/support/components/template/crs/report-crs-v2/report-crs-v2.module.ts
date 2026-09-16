import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportCrsV2Component } from './report-crs-v2.component';
import { GraphicModule } from '../../../graphic/graphic.module';
import { AutoCompleteModule } from '../../../auto-complete/auto-complete.module';
const components = [
    ReportCrsV2Component
  ]

@NgModule({
    imports: [
      CommonModule,
      GraphicModule,
      AutoCompleteModule
    ],
    declarations: components,
    exports:components

  })
  export class ReportCrsV2Module {

  }