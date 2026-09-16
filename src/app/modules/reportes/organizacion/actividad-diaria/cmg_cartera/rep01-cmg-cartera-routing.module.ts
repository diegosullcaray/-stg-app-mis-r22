import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "cmg-cartera",
                loadChildren: () => import('../../../repositorio/cmg-cartera/cmg-cartera.module').then(m => m.cmgcarteraModule)
 
 
            }   
        ]
    } 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01CmgcarteraRoutingModule { }
 