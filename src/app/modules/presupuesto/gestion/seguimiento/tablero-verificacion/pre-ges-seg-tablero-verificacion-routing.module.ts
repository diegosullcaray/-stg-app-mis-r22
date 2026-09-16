import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PreGesSegTableroVerificacionComponent } from "./pre-ges-seg-tablero-verificacion.component";

const routes: Routes = [
    {
        path:'',
        component:PreGesSegTableroVerificacionComponent,
        data: {title:'Verifiación'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PreGesSegTableroVerificacionRoutingModule { }