import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CaptacionCanalComercialRoutingModule } from '../../../repositorio/captacion-canal-comercial/captacion-canal-comercial-routing.module';

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "dashboard-clientes",
                loadChildren: () => import('../../../repositorio/dashboard-clientes/rep01-dashboard-clientes.module').then(m => m.Rep01DashboardClientesModule)
            },
            {
                path: "movimiento-clientes",
                loadChildren: () => import('../../../repositorio/movimiento-clientes/rep01-movimiento-clientes.module').then(m => m.Rep01MovimientoClientesModule)
            },
            {
                path: "esg",
                loadChildren: () => import('../../../repositorio/esg/esg.module').then(m => m.EsgModule)
            }
            /*,
            {
                path: "desempeno-social",
                loadChildren: () => import('../../../repositorio/desempeno-social/rep01-desempeno-social.module').then(m => m.Rep01DesempenoSocialModule)
            }*/
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01ClientesDiaRoutingModule { }
