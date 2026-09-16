import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PriorizacionLeadsComponent } from "./priorizacion-leads.component";

const routes: Routes = [
    {
        path: '',
        component: PriorizacionLeadsComponent,
        data: { title: 'Priorizacion Leads' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PriorizacionLeadsRoutingModule { }