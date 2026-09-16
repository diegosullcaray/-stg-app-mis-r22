import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProspectoComponent } from './prospecto.component';
const routes: Routes = [
  {
    path: "",
    component: ProspectoComponent,
    data: { title: "Resumen" }

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProspectoCorresponsalRoutingModule { }
 
