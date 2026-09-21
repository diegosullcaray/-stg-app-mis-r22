import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DummyComponent } from 'app/modules/reportes/components/dummy/dummy.component';
//import { NotFoundComponent } from 'app/core/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: 'sec',
        loadChildren: () => import('./sectorista/rda-sectorista.module').then(m => m.RDASectoristaModule),
        data: { title: "Sectorista" }
      },
      {
        path: 'adm',
        loadChildren: () => import('./administracion/rda-administracion.module').then(m => m.RdaAdministracionModule),
        data: { title: "Administrador" }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RDARoutingModule { }
