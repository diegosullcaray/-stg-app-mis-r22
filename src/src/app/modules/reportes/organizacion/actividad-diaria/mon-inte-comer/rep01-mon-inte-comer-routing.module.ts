import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "Monincome",
                loadChildren: () => import('../../../repositorio/mon-int-comer/mon-int-comer.module').then(m => m.MonIntComerModule)
 
            }   
        ]
    } 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01MonIntComercialRoutingModule { }
