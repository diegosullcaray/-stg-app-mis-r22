import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditarCorComponent } from "./editar-cor.component"; 

const routes: Routes = [
    {
        path: '',
        component: EditarCorComponent,
        data: { title: 'Editar' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule] 
})
export class EditarRoutingCorModule { }