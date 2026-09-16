import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BecasComponent } from "./becas.component";

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path:'',
                component: BecasComponent,
                data: { title: 'Becas' }
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
export class BecasRoutingModule { }