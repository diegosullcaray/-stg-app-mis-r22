import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsuariosComponent } from "./usuarios.component";


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path:'',
                component: UsuariosComponent,
                data: { title: 'Usuarios' }
            },
            {
                path:'detalle',
                loadChildren: () => import('./detalle/detalle.module').then(m => m.DetalleModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsuariosRoutingModule { }