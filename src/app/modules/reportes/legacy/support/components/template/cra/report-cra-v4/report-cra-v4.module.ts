import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportCraV4Component } from './report-cra-v4.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SelectModule } from '../../../select/select.module';
import { TableModule } from '../../../table/table.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
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