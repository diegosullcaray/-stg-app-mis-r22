import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "estructura-desembolsos",
                loadChildren: () => import('../../../repositorio/desembolsos/desembolsos.module').then(m => m.UsaComeModule)   
 
            }     
        ]
    } 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01DesembComeRoutingModule { }
