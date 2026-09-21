import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { DesembolsosMComponent } from "./desembolsos-m.component";

const routes: Routes = [
    {
        path:'', 
        component:DesembolsosMComponent,
        data: {title:'Desembolsos'}
    }
];  
 
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsaComeRoutingModule { }