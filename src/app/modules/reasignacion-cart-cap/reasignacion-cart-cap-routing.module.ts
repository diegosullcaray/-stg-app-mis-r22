import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { PrincipalComponent } from "./principal/principal.component";  
import { ReasignacionCartCapComponent } from './reasignacion-cart-cap.component';

const routes: Routes = [
    {
        path:'',
        component:ReasignacionCartCapComponent,
        data: {title:'Reportes Integrados'},
        children: [
            {
                path:'',
                component: PrincipalComponent
             } ,
             {
                path:'editar',
              loadChildren: () => import('./editar/editar-pm.module').then(m => m.EditarPmModule)
             },
             {
                path:'guardar',
              loadChildren: () => import('./guardar/guardar-pm.module').then(m => m.GuardarPmModule)
             }
            //  ,
            // {
            //       path:'detalles', 
            //      component: DetalleComponent
            //  }
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
export class ReasignacionCartCapRoutingModule { }