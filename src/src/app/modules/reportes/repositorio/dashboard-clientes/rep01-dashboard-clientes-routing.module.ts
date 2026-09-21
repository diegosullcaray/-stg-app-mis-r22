import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Rep01DashboardClientesComponent } from "./rep01-dashboard-clientes.component";

const routes: Routes = [
    {
        path:'',
        component:Rep01DashboardClientesComponent,
        data: {title:'Dashboard Clientes'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01DashboardClientesRoutingModule { }