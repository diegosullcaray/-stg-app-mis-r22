import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "cero-cuotas",
              //  loadChildren: () => import('../../../repositorio/agro-mix-d/agro-mix-d.module').then(m => m.agroMixDModule) 
              loadChildren: () => import('../../../repositorio/cero-cuotas/cero-cuotas.module').then(m => m.ceroCuotasModule)
 
 
            }   
        ]
    } 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01CeroCuotasRoutingModule { }
 