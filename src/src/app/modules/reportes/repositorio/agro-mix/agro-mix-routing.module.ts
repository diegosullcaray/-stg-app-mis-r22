import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";  
import { AgroMixComponent } from "./agro-mix.component";

const routes: Routes = [
    {
        path:'',
        component:AgroMixComponent,
        data: {title:'Agro Mix'}
    }  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AgroMixRoutingModule { }