import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdministracionComponent } from "./administracion.component";

const routes: Routes = [
    {
        path:'',
        component:AdministracionComponent,
        data: {title:'Administracion'}
    },
    {
        path:'rutas',
        loadChildren: () => import('./rutas/rutas.module').then(m => m.RutasModule),
        data: {title:'Rutas'}
    },
    {
        path:'usuarios',
        loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule),
        data: {title:'Usuarios'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministracionRoutingModule { }