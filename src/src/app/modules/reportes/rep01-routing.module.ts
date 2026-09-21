import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DummyComponent } from './components/dummy/dummy.component';
import { Rep01Component } from './rep01.component';

const routes: Routes = [
    {
        path: "",
        component: Rep01Component,
        children: [
            {
                path:"repositorio",
                loadChildren: () => import('./organizacion/rep01-organizacion.module').then(m => m.Rep01OrganizacionModule)
            },
            {
                path: "leg/com",
                loadChildren: () => import('./legacy/comercial/comercial.module').then(m => m.ComercialModule)
            },
            {
                path: "leg/prd",
                loadChildren: () => import('./legacy/control-cargas/control-cargas.module').then(m => m.ControlCargasModule)
            },
            {
                path: "leg/sis",
                loadChildren: () => import('./legacy/usabilidad/usabilidad.module').then(m => m.UsabilidadModule)
            },
            {
                path: "leg/vista-agr",
                loadChildren: () => import('./legacy/vista-agrupada/vista-agrupada.module').then(m => m.VistaAgrupadaModule)
            },
            {
                path: "leg/sis/usabilidadMis",
                loadChildren: () => import('./repositorio/usabilidadMis/usabilidadMis.module').then(m => m.usabilidadMisModule)
            },
            {
                path: "leg/dummy",
                component: DummyComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01RoutingModule { }