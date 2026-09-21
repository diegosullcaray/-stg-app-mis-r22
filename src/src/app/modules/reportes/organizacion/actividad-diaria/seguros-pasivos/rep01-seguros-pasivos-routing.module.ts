import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "seguros-pasivos",
                loadChildren: () => import('../../../repositorio/seguros-pasivos/seguros-pasivos.module').then(m => m.SegurosPasivosModule)
 
            }   
        ]
    } 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01SegurosPasivosRoutingModule { }
