import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "seguro-com",
                //loadChildren: () => import('../../../repositorio/desembolsos/desembolsos.module').then(m => m.UsaComeModule)  
                loadChildren: () => import('../../../repositorio/seguro-com/seguro-com.module').then(m => m.SeguroComModule)   
 
            }     
        ]
    } 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01SeguroComRoutingModule { }
