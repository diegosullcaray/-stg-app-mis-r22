import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportCrsV6Component } from './report-crs-v6.component';
import { TableModule } from '../../../table/table.module';
import { SelectModule } from '../../../select/select.module';
import { AutoCompleteModule } from '../../../auto-complete/auto-complete.module';
import { ModAppService } from 'app/core/data/remote/instances/mod-app-service';
import { SharedMaterialModule } from 'app/core/screen/components/shared-material.module';
import { SharedCWCModule } from 'app/core/screen/components/shared-cwc.module';
import { SharedCMCModule } from 'app/modules/shared/shared-cmc.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
const components = [
    ReportCrsV6Component
  ]

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      TableModule,
      SelectModule,
      AutoCompleteModule,
      FlexLayoutModule,
      SharedMaterialModule,
      SharedCWCModule,
      SharedCMCModule 
    ],
    declarations: components,
    exports:components,
    providers:[ModAppService]
  })
  export class ReportCrsV6Module {

  }