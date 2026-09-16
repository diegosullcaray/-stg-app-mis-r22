import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { SeguroComComponent } from "./seguro-com.component";

const routes: Routes = [
    {
        path:'',
        component:SeguroComComponent,
        data: {title:'Carterizacion'}
    }
];  
 
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SeguroComRoutingModule { }