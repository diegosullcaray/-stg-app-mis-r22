import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListasComponent } from "./listas.component";

const routes: Routes = [
    {
        path: '',
        data: { title: 'Listas' },
        children:[
            {
                path:'',
                component: ListasComponent
            },
            {
                path:'priorizacion-leads',
                loadChildren: () => import('./priorizacion-leads/priorizacion-leads.module').then(m => m.PriorizacionLeadsModule)
            },
            {
                path:'becas',
                loadChildren: () => import('./becas/becas.module').then(m => m.BecasModule)
            } 
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListasRoutingModule { }