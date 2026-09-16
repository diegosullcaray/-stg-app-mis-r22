import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditarComponent } from "./editar.component";

const routes: Routes = [
    {
        path: '',
        component: EditarComponent,
        data: { title: 'Editar' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EditarRoutingModule { }