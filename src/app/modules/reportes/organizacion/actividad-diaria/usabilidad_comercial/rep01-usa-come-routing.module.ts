import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "usa-come",
                loadChildren: () => import('../../../repositorio/usabilidad_comercial/usa_come.module').then(m => m.UsaComeModule) 
 
            }     
        ]
    } 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01UsaComeRoutingModule { }
