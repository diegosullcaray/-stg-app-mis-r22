import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Rep01ActividadDiariaRoutingModule } from "./rep01-actividad-diaria-routing.module";
import { ComercialService } from "../../legacy/comercial/comercial.service";
import { ModRepService } from "../../compartido/servicios/mod-rep.service";

@NgModule({
    imports:[
        Rep01ActividadDiariaRoutingModule,
        CommonModule
    ],
    providers: [ComercialService,ModRepService],
})
export class Rep01ActividadDiariaModule{} 