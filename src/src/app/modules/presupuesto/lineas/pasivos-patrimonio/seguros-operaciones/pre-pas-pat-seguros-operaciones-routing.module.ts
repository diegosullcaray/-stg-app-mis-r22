import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PrePasPatSegurosOperacionesComponent } from "./pre-pas-pat-seguros-operaciones.component";

const routes: Routes = [
    {
        path:'',
        component:PrePasPatSegurosOperacionesComponent,
        data: {title:'Seguros Operaciones'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PrePasPatSegurosOperacionesRoutingModule { }