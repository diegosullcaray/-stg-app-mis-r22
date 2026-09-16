import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { rankingMujerComponent } from "./ranking-mujer.component";

const routes: Routes = [
    {
        path:'',
        component:rankingMujerComponent,
        data: {title:'Ranking Mujer'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class rankingMujerRoutingModule { }