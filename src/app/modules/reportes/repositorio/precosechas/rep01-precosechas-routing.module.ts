import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Rep01PrecosechasComponent } from "./rep01-precosechas.component";

const routes: Routes = [
    {
        path:'',
        component:Rep01PrecosechasComponent,
        data: {title:'Precosechas'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01PrecosechasRoutingModule { }