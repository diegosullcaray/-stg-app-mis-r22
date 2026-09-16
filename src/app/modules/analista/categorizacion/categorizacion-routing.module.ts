import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategorizacionComponent } from "./categorizacion.component";

const routes: Routes = [
    {
        path: '',
        data: { title: 'Categorizacion' },
        children:[
            {
                path:'',
                component: CategorizacionComponent
            } 
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategorizacionRoutingModule { }