import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { RegistroTransaccionComponent } from './registro-transaccion.component';

const routes: Routes = [
  {
    path: '',
    component: RegistroTransaccionComponent,
     
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroTransaccionRoutingModule { }