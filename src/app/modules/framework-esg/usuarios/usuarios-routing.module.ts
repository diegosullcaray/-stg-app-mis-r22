import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsuariosComponent } from "./usuarios.component";

const routes: Routes = [
    {
        path: '',
        component: UsuariosComponent,
        data: { title: 'Usuarios' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsuariosRoutingModule { }