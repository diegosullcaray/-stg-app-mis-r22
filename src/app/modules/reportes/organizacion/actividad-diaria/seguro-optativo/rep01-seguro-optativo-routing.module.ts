import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "seguro-optativo",
                loadChildren: () => import('../../../repositorio/panel-misionales/panel-misionales.module').then(m => m.panelMisionalesModule)
 
            }   
        ]
    } 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01SeguroOptativoRoutingModule { }
