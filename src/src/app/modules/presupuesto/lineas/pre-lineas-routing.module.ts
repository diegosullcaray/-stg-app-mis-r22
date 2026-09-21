import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "activos",
                loadChildren: () => import('./activos/pre-activos.module').then(m => m.PreActivosModule)
            },
            {
                path: "pasivos-patrimonio",
                loadChildren: () => import('./pasivos-patrimonio/pre-pasivos-patrimonio.module').then(m => m.PrePasivosPatrimonioModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PreLineasRoutingModule { }