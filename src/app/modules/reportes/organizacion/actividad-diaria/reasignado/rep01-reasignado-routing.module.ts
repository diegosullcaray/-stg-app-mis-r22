import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "reasignado",
                loadChildren: () => import('../../../repositorio/reasignado/reasignado.module').then(m => m.reasignadoModule)
 
 
            }   
        ]
    } 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01reasignadoRoutingModule { }
 