import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            
            {
                path: "capta-canal-operacional",
                loadChildren: () => import('../../../repositorio/captacion-canal-operacion/captacion-canal-operacion.module').then(m => m.CaptacionCanalOperacionModule)
            },
            {
                path: "capta-canal-comercial",
                loadChildren: () => import('../../../repositorio/captacion-canal-comercial/captacion-canal-comercial.module').then(m => m.CaptacionCanalComercialModule)
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
export class Rep01CaptaCaractRoutingModule { }
