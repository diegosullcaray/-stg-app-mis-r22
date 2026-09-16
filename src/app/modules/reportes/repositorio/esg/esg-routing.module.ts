import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EsgComponent } from './esg.component';
 

const routes: Routes = [
    {
        path:'',
        component:EsgComponent,
        data: {title:'Movimiento Clientes'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EsgRoutingModule { }