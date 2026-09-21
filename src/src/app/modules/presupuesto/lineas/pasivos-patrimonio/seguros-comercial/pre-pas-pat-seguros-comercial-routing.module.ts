import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PrePasPatSegurosComercialComponent } from "./pre-pas-pat-seguros-comercial.component";

const routes: Routes = [
    {
        path:'',
        component:PrePasPatSegurosComercialComponent,
        data: {title:'Seguros Comercial'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PrePasPatSegurosComercialRoutingModule { }