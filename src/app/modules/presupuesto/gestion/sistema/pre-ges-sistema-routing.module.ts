import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "resp",
                loadChildren: () => import('./responsables/pre-ges-sis-responsables.module').then(m => m.PreGesSisResponsablesModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PreGesSistemaRoutingModule { }