import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'',
        children:[
            {
                path: "supervision",
                loadChildren: () => import('../../../repositorio/panel-supervision/panel-supervision.module').then(m => m.PanelSupervisionModule)
            } 
        ]
    }
]; 
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SupervisionRoutingModule { }
