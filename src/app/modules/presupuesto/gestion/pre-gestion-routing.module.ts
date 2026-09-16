import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "sistema",
                loadChildren: () => import('./sistema/pre-ges-sistema.module').then(m => m.PreGesSistemaModule)
            },
            {
                path: "seguimiento",
                loadChildren: () => import('./seguimiento/pre-ges-seguimiento.module').then(m => m.PreGesSeguimientoModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PreGestionRoutingModule { }