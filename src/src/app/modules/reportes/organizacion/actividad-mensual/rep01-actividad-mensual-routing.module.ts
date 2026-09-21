import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[

            {
                path: "reporte-demo",
                loadChildren: () => import('../../repositorio/reporte-demo/reporte-demo.module').then(m => m.ReporteDemoModule)
            },
            {
                path: "ingresosApp",
                loadChildren: () => import('../../repositorio/ingresosApp/ingresosApp.module').then(m => m.ingresosAppModule)
            },
            {
                path: "reprogramApp",
                loadChildren: () => import('../../repositorio/reprogramApp/reprogramApp.module').then(m => m.reprogramAppModule)
            },
            {   
                path: "cartera", //path: "desemb",
                loadChildren: () => import('./desembolsos/rep01-desemb-come.module').then(m => m.Rep01DesembComeModule)
            },
            {   
                path: "cartera", //path: "desemb",
                loadChildren: () => import('./cmg-cartera-m/rep01-cmg-cartera-m.module').then(m => m.Rep01CmgCarteraMModule)
            },
            
            {
                path: "tab-digital",
                loadChildren: () => import('./usabilidad_comercial-m/rep01-usa-come-m.module').then(m => m.Rep01UsaComeMModule)
            },
            {
                path: "rentabilidad",
                loadChildren: () => import('./rentabilidad/rep01-rentabilidad.module').then(m => m.Rep01RentabilidadModule)
            },
            {   
                path: "cartera", //path: "desemb",
                loadChildren: () => import('./agro-mix/rep01-agro-mix-m.module').then(m => m.Rep01AgroMixModule)
            },


            /*,{
                path: "comitecre",
                loadChildren: () => import('../actividad-mensual/comitecre/rep01-comitecre.module').then(m => m.Rep01comitecreModule)
            }*/
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01ActividadMensualRoutingModule { }
