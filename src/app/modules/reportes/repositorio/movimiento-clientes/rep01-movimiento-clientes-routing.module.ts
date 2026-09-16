import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Rep01MovimientoClientesComponent } from "./rep01-movimiento-clientes.component";

const routes: Routes = [
    {
        path:'',
        component:Rep01MovimientoClientesComponent,
        data: {title:'Movimiento Clientes'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01MovimientoClientesRoutingModule { }