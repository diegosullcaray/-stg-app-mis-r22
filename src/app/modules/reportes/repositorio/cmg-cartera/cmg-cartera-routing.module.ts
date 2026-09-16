import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { CmgCarteraComponent } from "./cmg-cartera.component";

const routes: Routes = [
    {
        path:'',
        component:CmgCarteraComponent,
        data: {title:'CMG Cartera'}
    }  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CmgcarteraRoutingModule { }