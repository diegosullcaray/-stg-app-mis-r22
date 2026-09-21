import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { RankingComercialComponent } from "./ranking-comercial.component";

const routes: Routes = [
    {
        path:'',
        component:RankingComercialComponent,
        data: {title:'CMG Cartera'}
    }  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RankingComercialRoutingModule { }