import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { usabilidadMisComponent } from "./usabilidadMis.component";


const routes: Routes = [
    {
        path:'',
        component:usabilidadMisComponent,
        data: {title:'Usabilidad Mis'}
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class usabilidadMisRoutingModule { }