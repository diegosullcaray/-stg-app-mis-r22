import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CalculadoraComponent } from "./calculadora/calculadora.component";
import { ClientesComponent } from "./clientes/clientes.component";
import { Incentivos2Component } from "./incentivos2.component";
import { PrincipalComponent } from "./principal/principal.component";
import { VariableComponent } from "./variable/variable.component";

const routes: Routes = [
    {
        path: '',
        component: Incentivos2Component,
        data: { title: 'Incentivos' },
        children: [
            {
                path:'',
                component: PrincipalComponent
            },
            {
                path:'variable',
                component: VariableComponent
            },
            {
                path:'calculadora',
                component: CalculadoraComponent
            },
            {
                path:'clientes',
                component: ClientesComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Incentivos2RoutingModule { }