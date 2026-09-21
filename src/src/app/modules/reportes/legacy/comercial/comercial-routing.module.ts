import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DummyComponent } from '../../components/dummy/dummy.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: 'rda',
        loadChildren: () => import('./rda/rda.module').then(m => m.RDAModule),
        data: { title: "RDA" }
      },
      {
        path: 'rma',
        loadChildren: () => import('./rma/rma.module').then(m => m.RmaModule),
        data: { title: "RMA" }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComercialRoutingModule { }
