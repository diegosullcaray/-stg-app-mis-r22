import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "pasivocom",
                //loadChildren: () => import('../../../repositorio/desembolsos/desembolsos.module').then(m => m.UsaComeModule)  
                loadChildren: () => import('../../../repositorio/carterizacion-cap-com/carterizacion-cap-com.module').then(m => m.CarterizacionCapComModule)   
 
            }     
        ]
    } 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01CarterizacionCapComRoutingModule { }
