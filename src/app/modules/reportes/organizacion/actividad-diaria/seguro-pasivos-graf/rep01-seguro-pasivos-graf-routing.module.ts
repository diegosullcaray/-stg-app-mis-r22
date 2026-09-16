import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[ 
            {
                path: "seguro-pasivos-grafico",
                loadChildren: () => import('../../../repositorio/seguro-pasivos-graf/seguro-pasivo-graf.module').then(m => m.SeguroPasivoGrafModule)
 
            }  
        ]
    } 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01SeguroPasivosGrafRoutingModule { }
