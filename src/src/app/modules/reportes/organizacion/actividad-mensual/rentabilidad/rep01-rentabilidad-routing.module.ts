import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'cuenta-resultados',
                loadChildren: () => import('../../../repositorio/cuenta-resultados/cuenta-resultados.module')
                    .then(module => module.CuentaResultadosModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01RentabilidadRoutingModule { }
