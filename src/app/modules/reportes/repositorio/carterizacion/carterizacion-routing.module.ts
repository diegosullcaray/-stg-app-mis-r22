import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { CarterizacionComponent } from "./carterizacion.component";

const routes: Routes = [
    {
        path:'',
        component:CarterizacionComponent,
        data: {title:'Carterizacion'}
    }
];  
 
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CarterizacionRoutingModule { }