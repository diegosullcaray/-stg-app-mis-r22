import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { CorresponsalComponent } from './corresponsal.component';

const routes: Routes = [
  {
    path: '',
    component: CorresponsalComponent,
     
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorresponsalRoutingModule { }
 