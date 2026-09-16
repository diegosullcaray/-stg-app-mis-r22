import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "car-cre",
                loadChildren: () => import('./cartera-creditos/pre-act-cartera-creditos.module').then(m => m.PreActCarteraCreditosModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PreActivosRoutingModule { }