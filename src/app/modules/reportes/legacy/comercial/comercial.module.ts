import { NgModule } from '@angular/core';
import { WinderService } from 'app/core/data/remote/winder/winder.service';
import { ModRepService } from '../support/data/ant-mod-rep.service';
import { ModSecService } from '../support/data/ant-mod-sec.service';
import { ComercialRoutingModule } from './comercial-routing.module';
import { ComercialService } from './comercial.service';

@NgModule({
  imports: [
    ComercialRoutingModule
  ],
  providers:[WinderService,ModRepService,ModSecService,ComercialService/*,FileService*/]
})
export class ComercialModule { }