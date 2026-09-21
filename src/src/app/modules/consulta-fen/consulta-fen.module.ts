import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedCWCModule } from 'app/core/screen/components/shared-cwc.module';
import { ModRepService } from 'app/modules/reportes/compartido/servicios/mod-rep.service';
import { ConsultaFenRoutingModule } from './consulta-fen-routing.module';
import { ConsultaFenComponent } from './consulta-fen.component';

@NgModule({
  imports: [
    CommonModule,
    SharedCWCModule,
    ConsultaFenRoutingModule
  ],
  declarations: [ConsultaFenComponent],
  providers: [ModRepService]
})
export class ConsultaFenModule { }
