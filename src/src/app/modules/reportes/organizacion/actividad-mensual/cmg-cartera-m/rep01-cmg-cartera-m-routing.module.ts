import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "cmg-cartera-m",
                loadChildren: () => import('../../../repositorio/cmg-cartera-m/cmg-cartera-m.module').then(m => m.cmgcarteramModule)
 
 
            }   
        ]
    } 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01CmgcarteraMRoutingModule { }
 