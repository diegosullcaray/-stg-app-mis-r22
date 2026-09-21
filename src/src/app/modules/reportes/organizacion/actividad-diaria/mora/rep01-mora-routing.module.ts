import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "precosechas",
                loadChildren: () => import('../../../repositorio/precosechas/rep01-precosechas.module').then(m => m.Rep01PrecosechasModule)
            },
            {
                path: "det-mora",
                //loadChildren: () => import('./rep01-mora.module').then(m => m.Rep01MoraModule) 
                loadChildren: () => import('../../../repositorio/det-mora/det-mora.module').then(m => m.detmoraModule) 
            }   
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01PrecosechasRoutingModule { }
