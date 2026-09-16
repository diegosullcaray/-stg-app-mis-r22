import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";   
import { CeroCuotasComponent } from "./cero-cuotas.component";

const routes: Routes = [
    {
        path:'',
        component:CeroCuotasComponent,
        data: {title:'Agro Mix'}
    }  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CeroCuotasRoutingModule { }