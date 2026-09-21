import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";  
import { Kaypacha3Component } from './kaypacha3.component';

const routes: Routes = [
    {
        path:'',
        component:Kaypacha3Component,
        data: {title:'Kaypacha3'}, 
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Kaypacha3RoutingModule { }