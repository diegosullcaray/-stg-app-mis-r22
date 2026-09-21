import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            /* {
                path:'avance-comercial'  
            }, */
            {
                path: "actividad-diaria",
                loadChildren: () => import('./actividad-diaria/rep01-actividad-diaria.module').then(m => m.Rep01ActividadDiariaModule)
            },
            {
                path: "actividad-mensual",
                //loadChildren: () => import('./pasivos-patrimonio/pre-pasivos-patrimonio.module').then(m => m.PrePasivosPatrimonioModule)
                loadChildren: () => import('./actividad-mensual/rep01-actividad-mensual.module').then(m=>m.Rep01ActividadMensualModule)
            } 
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01OrganizacionRoutingModule { }