import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Rep01ComiteComponent } from "./rep01-comite.component";

const routes: Routes = [
    {
        path:'',
        component:Rep01ComiteComponent,
        data: {title:'Comite'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01ComiteRoutingModule { }