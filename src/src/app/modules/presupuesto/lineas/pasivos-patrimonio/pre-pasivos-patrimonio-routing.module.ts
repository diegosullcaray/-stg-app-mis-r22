import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "car-dep-bp",
                loadChildren: () => import('./cartera-depositos-bp/pre-pas-pat-cartera-depositos-bp.module').then(m => m.PrePasPatCarteraDepositosBpModule)
            },
            {
                path: "car-dep-red",
                loadChildren: () => import('./cartera-depositos-red/pre-pas-pat-cartera-depositos-red.module').then(m => m.PrePasPatCarteraDepositosRedModule)
            },
            {
                path: "seg-com",
                loadChildren: () => import('./seguros-comercial/pre-pas-pat-seguros-comercial.module').then(m => m.PrePasPatSegurosComercialModule)
            },
            {
                path: "seg-ope",
                loadChildren: () => import('./seguros-operaciones/pre-pas-pat-seguros-operaciones.module').then(m => m.PrePasPatSegurosOperacionesModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PrePasivosPatrimonioRoutingModule { }