import { NgModule } from '@angular/core';
import { ReportCraV4Component } from './report-cra-v4.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from '../../../select/select.module';
import { TableModule } from '../../../table/table.module';
import { SharedCWCModule } from 'app/core/screen/components/shared-cwc.module';
import { SharedCMCModule } from 'app/modules/shared/shared-cmc.module';
const components = [
    ReportCraV4Component
  ]

@NgModule({
    imports: [
      //CommonModule,
      SharedCWCModule,
      SharedCMCModule,
      SelectModule,
      TableModule,
      
      FormsModule, ReactiveFormsModule,
      //FlexLayoutModule,
      
    ],
    declarations: components,
    exports:components

  })
  export class ReportCraV4Module {

  }