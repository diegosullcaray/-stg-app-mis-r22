import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportCraV6Component } from './report-cra-v6.component';

//import {NgxPaginationModule} from 'ngx-pagination'
import { SelectModule } from '../../../select/select.module';
import { TableModule } from '../../../table/table.module';
import { GraphicModule } from '../../../graphic/graphic.module';
import { SharedCWCModule } from 'app/core/screen/components/shared-cwc.module';
import { SharedCMCModule } from 'app/modules/shared/shared-cmc.module';
const components = [
  ReportCraV6Component
]

@NgModule({
  imports: [
    CommonModule,
    SelectModule,
    TableModule,
    GraphicModule,
    //NgxPaginationModule,
    SharedCWCModule,
    SharedCMCModule
  ],
  declarations: components,
  exports:components

})

export class ReportCraV6Module {

}