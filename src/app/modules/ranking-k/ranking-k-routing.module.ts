import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { PrincipalComponent } from "./principal/principal.component";
import { RankingKComponent } from './ranking-k.component';
import { DetalleKComponent } from './detallek/detallek.component';

const routes: Routes = [
    {
        path:'',
        component:RankingKComponent,
        data: {title:'Reportes Integrados'},
        children: [
            {
                path:'',
                component: PrincipalComponent
             } ,
            {
                  path:'detalles', 
                 component: DetalleKComponent
             }
            // {
            //     path:'usuarios',
            //     loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)
            // }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RankingKRoutingModule { }