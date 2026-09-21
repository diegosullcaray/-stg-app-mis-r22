import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { SeguroPasivoGrafComponent } from "./seguro-pasivo-graf.component";

const routes: Routes = [
    {
        path:'',
        component:SeguroPasivoGrafComponent,
        data: {title:'Seguro Pasivo Graf'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SeguroPasivoGrafRoutingModule { }