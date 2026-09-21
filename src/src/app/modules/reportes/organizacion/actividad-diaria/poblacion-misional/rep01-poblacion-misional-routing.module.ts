import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "poblacion-misional",
                loadChildren: () => import('../../../repositorio/poblacion-misional/poblacion-misional.module').then(m => m.poblacionMisionalModule)
 
 
            }   
        ]
    } 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01PoblacionMisionalRoutingModule { }
 