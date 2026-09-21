import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "rank-comercial",
                loadChildren: () => import('../../../repositorio/ranking-comercial/ranking-comercial.module').then(m => m.rankingcomercialModule)
 
 
 
            }   
        ]
    } 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Rep01RankingComercialRoutingModule { }
 