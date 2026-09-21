import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "agendamiento",
                loadChildren: () => import('../../../repositorio/agenda-comercial/agenda-comercial.module').then(m => m.agendacomercialModule)
            },
            {
                path: "mon-ran-camp",
                loadChildren: () => import('../../../repositorio/mon-ran-camp/mon-ran-camp.module').then(m => m.MonRanCampModule)
            } 
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AgendaComercialRoutingModule { }
