import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ControlCargasRoutingModule } from './control-cargas-routing.module';

//import { WinderService } from '../../../../core/data/remote/winder/winder.service';
import { WinderService } from '../../../../core/data/remote/winder/winder.service';
import { ModRepService } from '../support/data/ant-mod-rep.service';
import { ModSecService } from '../support/data/ant-mod-sec.service';
import { ComercialService } from '../comercial/comercial.service';
import { ControlCargasComponent } from './control-cargas.component';
import { TableModule } from '../../legacy/support/components/table/table.module';

@NgModule({
  declarations: [ControlCargasComponent],
  imports: [
    ControlCargasRoutingModule,
    TableModule
  ],
  providers: [WinderService,ModRepService,ModSecService,ComercialService]
})
export class ControlCargasModule { }