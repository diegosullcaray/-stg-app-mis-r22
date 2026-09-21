import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProspectoCorComponent } from "./prospecto-cor.component";
import { PrincipalComponent } from "./principal/principal.component";

const routes: Routes = [
    {
        path: '',
        component: ProspectoCorComponent,
        data: { title: 'PROSPECTO' },
        children: [
            {
                path:'',
                component: PrincipalComponent
              }  , 
             {
                 path:'editar',
               loadChildren: () => import('./editar/editar-cor.module').then(m => m.EditarCorModule)
              },
              {
                path:'guardar',
              loadChildren: () => import('./guardar/guardar-cor.module').then(m => m.GuardarCorModule)
             }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProspectoCorRoutingModule { }