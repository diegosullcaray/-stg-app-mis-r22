import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";  
import { AgroMixDComponent } from "./agro-mix-d.component";

const routes: Routes = [
    {
        path:'',
        component:AgroMixDComponent,
        data: {title:'Agro Mix'}
    }  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AgroMixDRoutingModule { }