import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { agendacomercialComponent } from "./agenda-comercial.component";

const routes: Routes = [
    {
        path:'',
        component:agendacomercialComponent,
        data: {title:'Agenda Comercial'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class agendacomercialRoutingModule { }