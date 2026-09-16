import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { SegurosPasivosComponent } from "./seguros-pasivos.component";

const routes: Routes = [
    {
        path:'',
        component:SegurosPasivosComponent,
        data: {title:'Seguro Pasivo'}
    }
];
 
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SegurosPasivosRoutingModule { }