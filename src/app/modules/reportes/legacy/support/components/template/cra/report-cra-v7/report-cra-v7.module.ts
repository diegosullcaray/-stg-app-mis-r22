import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportCraV7Component } from './report-cra-v7.component';
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
import { SharedCWCModule } from 'app/core/screen/components/shared-cwc.module';
import { SharedCMCModule } from 'app/modules/shared/shared-cmc.module';
const components = [
    ReportCraV7Component
  ]

@NgModule({
    imports: [
      CommonModule,
      SelectModule,
      TableModule,
      MatTabsModule,
      MatInputModule,
      MatFormFieldModule,
      MatCardModule,
      MatIconModule,
      MatButtonModule,
      FormsModule, ReactiveFormsModule,
      FlexLayoutModule,
      SharedCWCModule,
      SharedCMCModule
    ],
    declarations: components,
    exports:components

  })
  export class ReportCraV7Module {

  }