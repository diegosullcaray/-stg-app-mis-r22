import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { CaptacionCanalOperacionComponent } from './captacion-canal-operacion.component';

const routes: Routes = [
    {
        path:'',
        component:CaptacionCanalOperacionComponent,
        data: {title:'Captación Canal Operacional'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CaptacionCanalOperacionRoutingModule { }