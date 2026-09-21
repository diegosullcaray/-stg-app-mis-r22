import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "zplantilla",
                loadChildren: () => import('../../../repositorio/zplantilla/zplantilla.module').then(m => m.zplantillaModule)
 
 
            }   
        ]
    } 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01zplantillaRoutingModule { }
 