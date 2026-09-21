import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";   
import { GestionComercialComponent } from "./gestion-comercial.component";

const routes: Routes = [
    {
        path:'',
        component:GestionComercialComponent,
        data: {title:'Agro Mix'}
    }  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GestionComercialRoutingModule { }