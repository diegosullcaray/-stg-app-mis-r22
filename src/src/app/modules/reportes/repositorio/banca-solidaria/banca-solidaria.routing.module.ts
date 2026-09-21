import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";   
import { BancaSolidariaComponent } from "./banca-solidaria.component";

const routes: Routes = [
    {
        path:'',
        component:BancaSolidariaComponent,
        data: {title:'Banca Solidaria'}
    }  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BancaSolidariaRoutingModule { }