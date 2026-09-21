import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { KaypachaComponent } from "./kaypacha.component";

const routes: Routes = [
    {
        path:'',
        component:KaypachaComponent,
        data: {title:'Kaypacha'} 
        
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class KaypachaRoutingModule { }