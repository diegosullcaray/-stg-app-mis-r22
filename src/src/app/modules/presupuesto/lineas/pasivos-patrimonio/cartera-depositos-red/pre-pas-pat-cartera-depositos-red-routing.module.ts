import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PrePasPatCarteraDepositosRedComponent } from "./pre-pas-pat-cartera-depositos-red.component";

const routes: Routes = [
    {
        path:'',
        component:PrePasPatCarteraDepositosRedComponent,
        data: {title:'Cartera Depositos Red'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PrePasPatCarteraDepositosRedRoutingModule { }