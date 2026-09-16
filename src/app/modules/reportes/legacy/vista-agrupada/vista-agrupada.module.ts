import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from 'app/core/screen/components/shared-material.module';
import { VistaAgrupadaRoutingModule } from './vista-agrupada-routing.module';
import { DummyComponent } from './dummy/dummy.component';


@NgModule({
  declarations: [DummyComponent],
  imports: [
    CommonModule,
    VistaAgrupadaRoutingModule,
    SharedMaterialModule
  ]
})
export class VistaAgrupadaModule { }
