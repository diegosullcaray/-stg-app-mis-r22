import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PresupuestoComponent } from "./presupuesto.component";

const routes: Routes = [
    {
        path:'',
        component:PresupuestoComponent,
        children:[
            {
                path: "lineas",
                loadChildren: () => import('./lineas/pre-lineas.module').then(m => m.PreLineasModule)
            },
            {
                path: "gestion",
                loadChildren: () => import('./gestion/pre-gestion.module').then(m => m.PreGestionModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PresupuestoRoutingModule { }