import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { ingresosAppComponent } from "./ingresosApp.component";



const routes: Routes = [
    {
        path:'',
        component:ingresosAppComponent,
        data: {title:'Ingresos App'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ingresosAppRoutingModule { }