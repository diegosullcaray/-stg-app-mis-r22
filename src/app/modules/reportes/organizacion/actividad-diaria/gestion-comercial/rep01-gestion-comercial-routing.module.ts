import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "gest-comercial",
              //  loadChildren: () => import('../../../repositorio/agro-mix-d/agro-mix-d.module').then(m => m.agroMixDModule)
              loadChildren: () => import('../../../repositorio/gestion-comercial/gestion-comercial.module').then(m => m.gestionComercialModule)
 
 
            }   
        ]
    } 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01GestionComercialRoutingModule { }
 