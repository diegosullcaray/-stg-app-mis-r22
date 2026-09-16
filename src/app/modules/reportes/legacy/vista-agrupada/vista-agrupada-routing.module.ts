import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DummyComponent } from '../vista-agrupada/dummy/dummy.component';

const routes: Routes = [
  {
    path:'',
    component:DummyComponent,
    data: {title:'Vista agrupada'}
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VistaAgrupadaRoutingModule { }
