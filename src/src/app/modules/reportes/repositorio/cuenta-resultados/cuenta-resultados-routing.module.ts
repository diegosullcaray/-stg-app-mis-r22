import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CuentaResultadosComponent } from "./cuenta-resultados.component";

const routes: Routes = [
    {
        path: '',
        component: CuentaResultadosComponent,
        data: { title: 'Cuenta de Resultados' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CuentaResultadosRoutingModule { }
