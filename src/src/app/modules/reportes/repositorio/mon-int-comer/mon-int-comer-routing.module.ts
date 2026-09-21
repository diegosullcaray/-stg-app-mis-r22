import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { MonIntComerComponent } from "./mon-int-comer.component";

const routes: Routes = [
    {
        path:'',
        component:MonIntComerComponent,
        data: {title:'Monitor Inteligencia Comercial'}
    }
];
 
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MonIntComerRoutingModule { }