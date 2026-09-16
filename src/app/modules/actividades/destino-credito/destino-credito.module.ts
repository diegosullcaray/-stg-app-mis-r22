import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinoCreditoRoutingModule } from './destino-credito-routing.module';
import { DestinoCreditoComponent } from './destino-credito.component';
import { SharedCMCModule } from 'app/modules/shared/shared-cmc.module';
import { SharedCWCModule } from 'app/core/screen/components/shared-cwc.module';
import { SharedMaterialModule } from 'app/core/screen/components/shared-material.module';
import { DestinoCreditoPopupComponent } from './destino-credito-popup/destino-credito-popup.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DestinoCreditoComponent, DestinoCreditoPopupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DestinoCreditoRoutingModule,
    SharedMaterialModule,
    SharedCWCModule,
    SharedCMCModule,
    FlexLayoutModule
  ]
})
export class DestinoCreditoModule { }
