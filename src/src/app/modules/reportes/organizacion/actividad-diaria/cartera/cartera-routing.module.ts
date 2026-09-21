import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "mon-retenciones",
                loadChildren: () => import('../../../repositorio/mon-salidas/mon-salidas.module').then(m => m.MonSalidasModule)
            },
            {
                path: "mon-imr",
                loadChildren: () => import('../../../repositorio/mon-imr/mon-imr.module').then(m => m.MonImrModule)
            },  

            {
                path:"demo-table3",
                loadChildren: () => import('../../../repositorio/demo-table3/demo-table3.module').then(m => m.DemoTable3Module)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CarteraRoutingModule { }
