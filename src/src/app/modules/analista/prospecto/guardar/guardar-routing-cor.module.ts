import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GuardarCorComponent } from "./guardar-cor.component"; 

const routes: Routes = [
    {
        path: '',
        component: GuardarCorComponent,
        data: { title: 'Guardar' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule] 
})
export class GuardarRoutingCorModule { }