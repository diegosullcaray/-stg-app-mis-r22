import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { CarterizacionCapComComponent } from "./carterizacion-cap-com.component";

const routes: Routes = [
    {
        path:'',
        component:CarterizacionCapComComponent,
        data: {title:'Carterizacion'}
    }
];  
 
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CarterizacionCapComRoutingModule { }