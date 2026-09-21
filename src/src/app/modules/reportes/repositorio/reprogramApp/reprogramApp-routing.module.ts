import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { reprogramAppComponent } from "./reprogramApp.component";



const routes: Routes = [
    {
        path:'',
        component:reprogramAppComponent,
        data: {title:'Ingresos App'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class reprogramAppRoutingModule { }