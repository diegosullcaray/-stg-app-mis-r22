import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { PanelSupervisionComponent } from "./panel-supervision.component";

const routes: Routes = [
    {
        path:'',
        component:PanelSupervisionComponent,
        data: {title:'Agenda Comercial'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PanelSupervisionRoutingModule { }