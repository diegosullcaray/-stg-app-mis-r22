import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IncentivosComponent } from "./incentivos.component";

const routes: Routes = [
    {
        path:'',
        component:IncentivosComponent,
        data: {title:'Incentivos'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IncentivosRoutingModule { }