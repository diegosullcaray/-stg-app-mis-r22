import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { DesembolsosComponent } from "./desembolsos.component";

const routes: Routes = [
    {
        path:'',
        component:DesembolsosComponent,
        data: {title:'Desembolsos'}
    }
];  
 
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsaComeRoutingModule { }