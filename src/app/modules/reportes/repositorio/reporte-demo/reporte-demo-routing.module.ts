import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReporteDemoComponent } from "./reporte-demo.component";

const routes: Routes = [
    {
        path:'',
        component:ReporteDemoComponent,
        data: {title:'Reporte Demo'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReporteDemoRoutingModule { }