import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { EditarPmComponent } from './editar-pm.component';

const routes: Routes = [
    {
        path: '',
        component: EditarPmComponent,
        data: { title: 'Editar' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule] 
})
export class EditarRoutingPmModule { }