import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "tbl-ver",
                loadChildren: () => import('./tablero-verificacion/pre-ges-seg-tablero-verificacion.module').then(m => m.PreGesSegTableroVerificacionModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PreGesSeguimientoRoutingModule { }