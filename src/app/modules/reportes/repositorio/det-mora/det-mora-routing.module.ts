import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { DetMoraComponent } from "./det-mora.component";

const routes: Routes = [
    {
        path:'',
        component:DetMoraComponent,
        data: {title:'Detalle Mora'}
    }  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DetmoraRoutingModule { }