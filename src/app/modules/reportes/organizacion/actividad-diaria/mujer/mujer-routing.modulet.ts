import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "mujer",
                loadChildren: () => import('../../../repositorio/ranking-mujer/ranking-mujer.module').then(m => m.rankingMujerModule)
                //loadChildren: () => import('../../../repositorio/agenda-comercial/agenda-comercial.module').then(m => m.agendacomercialModule)
            } 
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MujerRoutingModule { }
