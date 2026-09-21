import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { UsaComeMComponent } from "./usa_come-m.component";

const routes: Routes = [
    {
        path:'',
        component:UsaComeMComponent,
        data: {title:'Tablero Digital'}
    }
];  
 
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsaComeMRoutingModule { }