import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";  
import { Kaypacha2Component } from './kaypacha2.component';

const routes: Routes = [
    {
        path:'',
        component:Kaypacha2Component,
        data: {title:'Kaypacha2'}, 
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Kaypacha2RoutingModule { }