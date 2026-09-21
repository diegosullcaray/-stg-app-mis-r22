import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SeguiIncentivosSecComponent } from "./segui-incentivos-sec.component";

const routes: Routes = [
    {
        path:'',
        component:SeguiIncentivosSecComponent,
        data: {title:'Seguimiento Incentivos Asesores'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SeguiIncentivosSecRoutingModule { }