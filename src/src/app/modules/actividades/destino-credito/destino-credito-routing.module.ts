import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DestinoCreditoComponent } from './destino-credito.component';

const routes: Routes = [
  {
    path: '',
    component: DestinoCreditoComponent,
    /*children: [
      {
        path: 'destino_credito',
        loadChildren: () => import('./destino-credito.module').then(m => m.DestinoCreditoModule)
      },
      {
        path: 'destino_credito',
        loadChildren: () => import('./destino-credito.module').then(m => m.DestinoCreditoModule);
      }
    ]*/
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DestinoCreditoRoutingModule { }
