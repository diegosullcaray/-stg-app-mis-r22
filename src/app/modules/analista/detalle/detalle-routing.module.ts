import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClienteDetalleComponent } from "./cliente/cliente.component";
import { DetalleComponent } from "./detalle.component";

const routes: Routes = [
    {
        path: '',
        component: DetalleComponent,
        data: { title: 'Detalle' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DetalleRoutingModule { }