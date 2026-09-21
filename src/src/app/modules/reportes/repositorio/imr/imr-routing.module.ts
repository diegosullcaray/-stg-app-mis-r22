import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { imrComponent } from "./imr.component";

const routes: Routes = [
    {
        path:'',
        component:imrComponent,
        data: {title:'Productos Misionales'}
    }  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class imrRoutingModule { }