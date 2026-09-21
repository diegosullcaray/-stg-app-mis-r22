import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaFenComponent } from './consulta-fen.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultaFenComponent,
    data: { title: 'Consulta FEN - CENEPRED' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaFenRoutingModule { }
