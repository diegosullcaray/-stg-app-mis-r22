import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "banca-solidaria",
              //  loadChildren: () => import('../../../repositorio/agro-mix-d/agro-mix-d.module').then(m => m.agroMixDModule)
              loadChildren: () => import('../../../repositorio/banca-solidaria/banca-solidaria.module').then(m => m.bancasolidariaModule)
 
 
            }   
        ]
    } 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01BancaSolidariaRoutingModule { }
 