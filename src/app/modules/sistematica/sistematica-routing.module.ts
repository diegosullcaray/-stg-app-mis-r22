import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PrincipalComponent } from "./principal/principal.component";
import { SistematicaComponent } from "./sistematica.component";

const routes: Routes = [
    {
        path: '',
        component: SistematicaComponent,
        data: { title: 'Analista' },
        children: [
            {
                path: '',
                component: PrincipalComponent,
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SistematicaRoutingModule { }