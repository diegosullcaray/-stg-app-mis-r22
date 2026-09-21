import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            /* {
                path:'captaciones'  
            }, */
            {
                path: "cartera",
                loadChildren: () => import('./cartera/cartera.module').then(m => m.CarteraModule)
            },
            {
                path: "clientes",
                loadChildren: () => import('./clientes/rep01-clientes-dia.module').then(m => m.Rep01ClientesDiaModule)
            },
            {
                path: "campanias",
                loadChildren: () => import('./campanias/agenda-comercial.module').then(m => m.AgendaComercialModule)
            }, 
            {
                path: "mujer",
                loadChildren: () => import('./mujer/mujer.module').then(m => m.MujerModule)
            }, 
            {
                path: "supervision",
                loadChildren: () => import('./panel-supervision/supervision.module').then(m => m.SupervisionModule)
            },
             
            { 
                path: "seguros-pasivos",
                loadChildren: () => import('./seguros-pasivos/rep01-seguros-pasivos.module').then(m => m.Rep01SegurosPasivosModule)
            },
            { 
                path: "mon-comercial",
                loadChildren: () => import('./mon-inte-comer/rep01-mon-inte-comer.module').then(m => m.Rep01MonIntComercialModule)
            },
            {   
                path: "tab-digital",
                loadChildren: () => import('./usabilidad_comercial/rep01-usa-come.module').then(m => m.Rep01UsaComeModule)
            },
            {   
                path: "carterizacion",
                loadChildren: () => import('./carterizacion/rep01-carterizacion.module').then(m => m.Rep01CarterizacionModule)
            },
            {   
                path: "carterizacion-com",
                loadChildren: () => import('./carterizacion-cap-com/rep01-carterizacion-cap-com.module').then(m => m.Rep01CarterizacionCapComModule)
            },
            {   
                path: "cartera", //path: "desemb",
                loadChildren: () => import('./desembolsos/rep01-desemb-come.module').then(m => m.Rep01DesembComeModule)
            },
            
            {
                path:"seg-pasivos-graf",
                loadChildren: () => import('./seguro-pasivos-graf/rep01-seguro-pasivos-graf.module').then(m => m.Rep01SeguroPasivosGrafModule)
            },
            {
                path:"prod-misionales",
                loadChildren: () => import('./productos-misionales/rep01-productos-misionales.module').then(m => m.Rep01ProductosMisionalesModule)
            },
            {
                path:"poblacion-misional",
                loadChildren: () => import('./poblacion-misional/rep01-poblacion-misional.module').then(m => m.Rep01PoblacionMisionalModule)
            },
            {
                path:"imr",
                loadChildren: () => import('./imr/rep01-imr.module').then(m => m.Rep01ImrModule)
            },
            {
                path:"cartera", 
                loadChildren: () => import('./cmg_cartera/rep01-cmg-cartera.module').then(m => m.Rep01CmgCarteraModule)
            },
            {
                path:"cartera", 
                loadChildren: () => import('./ranking-comercial/rep01-cmg-cartera.module').then(m => m.Rep01RankingComercialModule)
            },
            {
                path:"seguro", 
                loadChildren: () => import('./seguro-com/rep01-seguro-com.module').then(m => m.Rep01SeguroComModule)
            },

            {
                path:"tab-digital-com",
                loadChildren: () => import('./tab-digi-com/rep01-tab-digi.module').then(m => m.Rep01TableroDigitalModule)
            },
            {
                path:"dashboard", 
                loadChildren: () => import('./asesor/rep01-asesor.module').then(m => m.Rep01AsesorModule)
            },
            {
                path:"cartera", 
                loadChildren: () => import('./agro-mix/rep01-agro-mix.module').then(m => m.Rep01AgroMixModule)
            },
            {
                path:"cartera", 
                loadChildren: () => import('./gestion-comercial/rep01-gestion-comercial.module').then(m => m.Rep01GestionComercialModule)
            },
            {
                path:"mora", 
                loadChildren: () => import('./cero-cuotas/rep01-cero-cuotas.module').then(m => m.Rep01CeroCuotasModule)
            },
            {
                path:"cartera", 
                loadChildren: () => import('./banca-solidaria/rep01-banca-solidaria.module').then(m => m.Rep01BancaSolidariaModule)
            },
            /*{
                path: "mora",
                loadChildren: () => import('./mora/rep01-mora.module').then(m => m.Rep01MoraModule)
            },
            
             {
                path: "cartera",
                //loadChildren: () => import('./cartera/reportes-cartera-dia.module').then(m => m.ReportesCarteraDiaModule)
            },
            {
                path: "comitecre",
                loadChildren: () => import('../actividad-mensual/comitecre/rep01-comitecre.module').then(m => m.Rep01comitecreModule)
            }, */
            {
                path: "incentivos",
                loadChildren: () => import('./incentivos/incentivos-dia.module').then(m => m.IncentivosDiaModule)
            },
            {
                path: "captacion-caracterizacion",
                loadChildren: () => import('./captacion-caract/rep01-capta-caract.module').then(m => m.Rep01CaptaCaractModule)
            },
            { 
                path: "seguros-optativo",
                loadChildren: () => import('./seguro-optativo/rep01-seguro-optativo.module').then(m => m.Rep01SeguroOptativoModule)
            },
            {
                path:"zplantilla",
                loadChildren: () => import('./zplantilla/rep01-zplantilla.module').then(m => m.Rep01zplantillaModule)
            },
            {
                path:"reasignado",
                loadChildren: () => import('./reasignado/rep01-reasignado.module').then(m => m.Rep01reasignadoModule)
            },
            {
                path:"reporte-mora",
                loadChildren: () => import('./mora/rep01-mora.module').then(m => m.Rep01MoraModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01ActividadDiariaRoutingModule { }