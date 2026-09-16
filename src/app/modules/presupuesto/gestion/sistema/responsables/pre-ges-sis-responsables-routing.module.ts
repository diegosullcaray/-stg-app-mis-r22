import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PreGesSisResponsablesComponent } from "./pre-ges-sis-responsables.component";

const routes: Routes = [
    {
        path:'',
        component:PreGesSisResponsablesComponent,
        data: {title:'Responsables'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PreGesSisResponsablesRoutingModule { }