import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";  
import { SeguroOptativoComponent } from "./seguro-optativo.component";

const routes: Routes = [
    {
        path:'',
        component:SeguroOptativoComponent,
        data: {title:'Seguros Optativos'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SeguroOptativoRoutingModule { }