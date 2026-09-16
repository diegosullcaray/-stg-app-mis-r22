import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
//import { ActividadesRoutingModule } from './actividades-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout'; 
import { SharedCMCModule } from '../shared/shared-cmc.module';
import { SharedCWCModule } from 'app/core/screen/components/shared-cwc.module';
import { ModAppService } from 'app/core/data/remote/instances/mod-app-service'; 
import { ModCorresponsalService } from './servicio/mod-corresponsal.service';
import { CorresponsalesComponent } from './corresponsales.component';
import { CorresponsalesRoutingModule } from './corresponsales-routing.module';
import { CorresponsalCorresponsalModule } from './corresponsal/corresponsal.module';
import { ModSecService } from '../reportes/legacy/support/data/ant-mod-sec.service';
import { ModRepService } from '../reportes/compartido/servicios/mod-rep.service';
 /*
const components =[
  // AppComfirmComponent,
  // AppLoaderComponent,
  HierRemSelectorComponent
] */

@NgModule({
  declarations: [CorresponsalesComponent/*,components*/],
  imports: [
    CommonModule,
    CorresponsalesRoutingModule,
    CorresponsalCorresponsalModule,
    
    FormsModule,
    RouterModule,
    FlexLayoutModule,
    SharedMaterialModule,
    SharedCWCModule,
    SharedCMCModule,
    
  ],
  providers: [ModAppService, ModCorresponsalService,ModSecService,ModRepService],
  //exports: components
})
export class CorresponsalesModule { }
