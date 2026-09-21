import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { poblacionMisionalComponent } from "./poblacion-misional.component";

const routes: Routes = [
    {
        path:'',
        component:poblacionMisionalComponent,
        data: {title:'Productos Misionales'}
    }  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class poblacionMisionalRoutingModule { }