import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportCraV8Component } from './report-cra-v8.component';

//import {NgxPaginationModule} from 'ngx-pagination'
import { SelectModule } from '../../../select/select.module';
import { TableModule } from '../../../table/table.module';
import { GraphicModule } from '../../../graphic/graphic.module';
import { SharedCWCModule } from 'app/core/screen/components/shared-cwc.module';
import { SharedCMCModule } from 'app/modules/shared/shared-cmc.module';
import { MatTabsModule } from '@angular/material/tabs';
const components = [
  ReportCraV8Component
]

@NgModule({
  imports: [
    CommonModule,
    SelectModule,
    TableModule,
    GraphicModule,
    //NgxPaginationModule,
    SharedCWCModule,
    SharedCMCModule,
    MatTabsModule
  ],
  declarations: components,
  exports:components

})

export class ReportCraV8Module {

}