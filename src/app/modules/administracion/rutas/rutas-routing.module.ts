import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RutasComponent } from "./rutas.component";


const routes: Routes = [
    {
        path:'',
        component:RutasComponent,
        data: {title:'Rutas'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RutasRoutingModule { }