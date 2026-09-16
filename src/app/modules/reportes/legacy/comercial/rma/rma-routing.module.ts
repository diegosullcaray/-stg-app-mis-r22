import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: 'adm',
        loadChildren: () => import('./administracion/rma-administracion.module').then(m => m.RmaAdministracionModule),
        data: { title: "Administrador" }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RmaRoutingModule { }
