import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PreActCarteraCreditosComponent } from "./pre-act-cartera-creditos.component";

const routes: Routes = [
    {
        path:'',
        component:PreActCarteraCreditosComponent,
        data: {title:'Cartera Creditos'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PreActCarteraCreditosRoutingModule { }