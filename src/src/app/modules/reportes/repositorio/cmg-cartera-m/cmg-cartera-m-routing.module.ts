import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { CmgCarteraMComponent } from "./cmg-cartera-m.component";

const routes: Routes = [
    {
        path:'',
        component:CmgCarteraMComponent,
        data: {title:'CMG Cartera'}
    }  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CmgcarteraMRoutingModule { }