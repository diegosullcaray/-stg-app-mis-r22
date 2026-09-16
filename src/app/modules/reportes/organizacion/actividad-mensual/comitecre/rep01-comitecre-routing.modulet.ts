import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "comite",
                loadChildren: () => import('../../../repositorio/comite/rep01-comite.module').then(m => m.Rep01ComiteModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01ComiteRoutingModule { }
