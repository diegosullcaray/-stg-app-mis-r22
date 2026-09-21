import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "agro-mix-m",
                loadChildren: () => import('../../../repositorio/agro-mix/agro-mix.module').then(m => m.agroMixModule)
 
 
            }   
        ]
    } 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01AgroMixRoutingModule { }
 