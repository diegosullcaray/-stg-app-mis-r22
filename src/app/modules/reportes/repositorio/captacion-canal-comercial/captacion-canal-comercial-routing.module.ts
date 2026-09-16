import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { CaptacionCanalComercialComponent } from './captacion-canal-comercial.component';

const routes: Routes = [
    {
        path:'',
        component:CaptacionCanalComercialComponent,
        data: {title:'Captación Canal Comercial'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CaptacionCanalComercialRoutingModule { }