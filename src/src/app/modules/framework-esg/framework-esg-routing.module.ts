import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FrameworkEsgComponent } from "./framework-esg.component";
import { PrincipalComponent } from "./principal/principal.component";

const routes: Routes = [
    {
        path: '',
        component: FrameworkEsgComponent,
        data: { title: 'ESG' },
        children: [
            {
                path:'',
                component: PrincipalComponent
            },
            {
                path:'usuarios',
                loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)
            },
            {
                path:'editar',
                loadChildren: () => import('./editar/editar.module').then(m => m.EditarModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FrameworkEsgRoutingModule { }