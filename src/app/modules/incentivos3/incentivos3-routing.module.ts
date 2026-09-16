import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Incentivos3Component } from "./incentivos3.component";
import { PrincipalComponent } from "./principal/principal.component";
import { CalculadoraComponent } from "./calculadora/calculadora.component";
import { DetalleComponent } from "./detalle/detalle.component";
import { Detalle2Component } from "./detalle2/detalle2.component";

const routes: Routes = [
    {
        path: '',
        component: Incentivos3Component,
        data: { title: 'Incentivos' },
        children: [
            {
                path:'',
                component: PrincipalComponent
            },
            {
                path:'calculadora',
                component: CalculadoraComponent
            },
            {
                path:'detalle',
                component: DetalleComponent
            },
            {
                path:'detalle-2',
                component: Detalle2Component
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Incentivos3RoutingModule { }
