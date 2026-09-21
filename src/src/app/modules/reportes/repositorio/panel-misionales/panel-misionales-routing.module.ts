import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { panelMisioanlesComponent } from "./panel-misionales.component";

const routes: Routes = [
    {
        path:'',
        component:panelMisioanlesComponent,
        data: {title:'Productos Misionales'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class panelMisionalesRoutingModule { }  