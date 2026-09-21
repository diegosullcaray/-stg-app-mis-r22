import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { zplantillaComponent } from "./zplantilla.component";

const routes: Routes = [
    {
        path:'',
        component:zplantillaComponent,
        data: {title:'Plantilla Inicial'}
    }  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class zplantillaRoutingModule { }