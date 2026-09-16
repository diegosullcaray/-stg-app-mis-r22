import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "usa-come-m",
                loadChildren: () => import('../../../repositorio/usabilidad-comercial-m/usa_come-m.module').then(m => m.UsaComeMModule) 
 
            }     
        ]
    } 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01UsaComeMRoutingModule { }
