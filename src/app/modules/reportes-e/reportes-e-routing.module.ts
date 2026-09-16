import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PowerbiComponent } from "./powerbi/powerbi.component";
import { PrincipalComponent } from "./principal/principal.component";
import { ReportesEComponent } from "./reportes-e.component";

const routes: Routes = [
    {
        path:'',
        component:ReportesEComponent,
        data: {title:'Reportes Integrados'},
        children: [
            {
                path:'',
                component: PrincipalComponent
            },
            {
                path:'power-bi',
                component: PowerbiComponent
            },
            {
                path:'usuarios',
                loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportesERoutingModule { }