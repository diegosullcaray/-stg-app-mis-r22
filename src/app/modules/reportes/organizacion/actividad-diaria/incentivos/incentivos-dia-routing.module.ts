import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "segui-incentivos-sec",
                loadChildren: () => import('../../../repositorio/segui-incentivos-sec/segui-incentivos-sec.module').then(m => m.SeguiIncentivosSecModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IncentivosDiaRoutingModule { }
