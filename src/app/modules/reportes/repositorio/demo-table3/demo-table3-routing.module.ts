import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DemoTable3Component } from "./demo-table3.component";


const routes: Routes = [
    {
        path: '',
        component: DemoTable3Component
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DemoTable3RoutingModule { }