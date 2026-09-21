import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { UsaComeComponent } from "./usa_come.component";

const routes: Routes = [
    {
        path:'',
        component:UsaComeComponent,
        data: {title:'Tablero Digital'}
    }
];  
 
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsaComeRoutingModule { }