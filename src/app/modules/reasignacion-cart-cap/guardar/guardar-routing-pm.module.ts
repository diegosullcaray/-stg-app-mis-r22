import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { GuardarPmComponent } from './guardar-pm.component';

const routes: Routes = [
    {
        path: '',
        component: GuardarPmComponent,
        data: { title: 'Guardar' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule] 
})
export class GuardarRoutingPmModule { }