import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorresponsalesComponent } from './corresponsales.component';

const routes: Routes = [
  {
    path: '',
    component: CorresponsalesComponent,
    children: [
      { 
        path: 'trans-corr',
        loadChildren: () => import('./corresponsal/corresponsal.module').then(m => m.CorresponsalCorresponsalModule)
      },
      {  
        path: 'prosp-corr',
        loadChildren: () => import('./prospecto/prospecto.module').then(m => m.CorresponsalProspectosModule)
      },
      { 
        path: 'regprosp-corr', 
        loadChildren: () => import('./transaccion/transaccion.module').then(m => m.TransaccionModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorresponsalesRoutingModule { }
