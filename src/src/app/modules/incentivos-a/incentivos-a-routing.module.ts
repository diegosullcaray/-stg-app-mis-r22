import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CalculadoraComponent } from "./calculadora/calculadora.component";
import { IncentivosAComponent } from "./incentivos-a.component";
import { PrincipalComponent } from "./principal/principal.component";

const routes: Routes = [
    {
        path: '',
        component: IncentivosAComponent,
        data: { title: 'Incentivos Admin.' },
        children: [
            {
                path:'',
                component: PrincipalComponent
            },
            {
                path:'calculadora',
                component: CalculadoraComponent
            }
            /*{
                path:'variable',
                component: VariableComponent
            },
            ,
            {
                path:'clientes',
                component: ClientesComponent
            }*/
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IncentivosARoutingModule { }