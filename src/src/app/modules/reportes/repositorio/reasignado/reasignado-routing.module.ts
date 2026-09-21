import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { reasignadoComponent } from "./reasignado.component";

const routes: Routes = [
    {
        path:'',
        component:reasignadoComponent,
        data: {title:'Plantilla reasignado'}
    }  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class reasignadoRoutingModule { }