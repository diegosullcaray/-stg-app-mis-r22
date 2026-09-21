import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { tableroDigitalComponent } from "./tablero-digital.component";

const routes: Routes = [
    {
        path:'',
        component:tableroDigitalComponent,
        data: {title:'Tablero Digital Comercial'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TableroDigitalRoutingModule { }