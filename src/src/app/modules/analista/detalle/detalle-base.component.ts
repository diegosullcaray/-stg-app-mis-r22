import { TemplateRef } from "@angular/core";
import { AnalistaService } from "../compartido/servicios/analista.service";

export abstract class DetalleBaseComponent {

    title:string;

    showCli:boolean;
    showOpe:boolean;

    constructor(public analista: AnalistaService) { }

    init(): void {
        this.title="Detalle Cliente";
        this.showCli=true;
        this.showOpe=false;
    }

    abstract navMain(): void;
}