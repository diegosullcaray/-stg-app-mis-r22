import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "tab-digital-comercial",
                loadChildren: () => import('../../../repositorio/tablero-digital-comercial/tablero-digital.module').then(m => m.tableroDigitalModule)
 
            }   
        ]
    } 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01TableroDigitalRoutingModule { }
