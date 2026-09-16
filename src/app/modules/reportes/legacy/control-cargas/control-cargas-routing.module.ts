import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ControlCargasComponent } from './control-cargas.component';

const routes: Routes = [
  {
    path: "",
    component: ControlCargasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlCargasRoutingModule { }
