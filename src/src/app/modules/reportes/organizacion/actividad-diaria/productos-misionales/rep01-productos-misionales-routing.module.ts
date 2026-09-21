import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "productos-misionales",
                loadChildren: () => import('../../../repositorio/panel-misionales/panel-misionales.module').then(m => m.panelMisionalesModule)
 
            }   
        ]
    } 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01ProductosMisonalesRoutingModule { }
