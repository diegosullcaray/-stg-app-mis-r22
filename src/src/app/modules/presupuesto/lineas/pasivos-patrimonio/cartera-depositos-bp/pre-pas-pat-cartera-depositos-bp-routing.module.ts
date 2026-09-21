import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PrePasPatCarteraDepositosBpComponent } from "./pre-pas-pat-cartera-depositos-bp.component";

const routes: Routes = [
    {
        path:'',
        component:PrePasPatCarteraDepositosBpComponent,
        data: {title:'Cartera Depositos BP'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PrePasPatCarteraDepositosBpRoutingModule { }