import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { TransaccionComponent } from './transaccion.component';

const routes: Routes = [
  {
    path: '',
    component: TransaccionComponent,
     
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransaccionRoutingModule { }