import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActividadesComponent } from './actividades.component';

const routes: Routes = [
  {
    path: '',
    component: ActividadesComponent,
    children: [
      {
        path: 'dest-credito',
        loadChildren: () => import('./destino-credito/destino-credito.module').then(m => m.DestinoCreditoModule)
      },
      { 
        path: 'regprosp-corr', 
        loadChildren: () => import('./transaccion/transaccion.module').then(m => m.TransaccionModule)
      },
      { 
        path: 'reg-prosp-corr', 
        loadChildren: () => import('./registro-transaccion/registro-transaccion.module').then(m => m.RegistroTransaccionModule)
      }
    ]
  }
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActividadesRoutingModule { }
