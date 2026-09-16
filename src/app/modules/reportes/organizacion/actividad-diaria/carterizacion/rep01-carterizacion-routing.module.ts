import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "pasivo",
                //loadChildren: () => import('../../../repositorio/desembolsos/desembolsos.module').then(m => m.UsaComeModule)  
                loadChildren: () => import('../../../repositorio/carterizacion/carterizacion.module').then(m => m.CarterizacionModule)   
 
            }     
        ]
    } 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01CarterizacionRoutingModule { }
