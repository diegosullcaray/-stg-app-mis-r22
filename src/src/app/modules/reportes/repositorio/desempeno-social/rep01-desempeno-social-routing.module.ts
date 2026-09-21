import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Rep01DesempenoSocialComponent } from "./rep01-desempeno-social.component";

const routes: Routes = [
    {
        path:'',
        component:Rep01DesempenoSocialComponent,
        data: {title:'Desempeno Social'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01DesempenoSocialRoutingModule { }