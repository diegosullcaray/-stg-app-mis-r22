import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AnalistaComponent } from "./analista.component";
import { PrincipalComponent } from "./principal/principal.component";

const routes: Routes = [
    {
        path: '',
        component: AnalistaComponent,
        data: { title: 'Analista' },
        children: [
            {
                path: '',
                component: PrincipalComponent,
            },
            {
                path: 'listas',
                loadChildren: () => import('./listas/listas.module').then(m => m.ListasModule)
            },
            {
                path: 'prospecto',
                loadChildren: () => import('./prospecto/prospecto-cor.module').then(m => m.ProspectoCorModule)
            },
            {
                path: 'categorizacion',
                loadChildren: () => import('./categorizacion/categorizacion.module').then(m => m.CategorizacionModule)
            },
            {
                path: 'detalle',
                loadChildren: () => import('./detalle/detalle.module').then(m => m.DetalleModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AnalistaRoutingModule { }