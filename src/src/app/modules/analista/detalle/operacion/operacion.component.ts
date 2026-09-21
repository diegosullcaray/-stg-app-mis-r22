import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AnalistaService } from "../../compartido/servicios/analista.service";

@Component({
    selector: 'app-operacion-detalle-analista',
    templateUrl: './operacion.component.html',
    styleUrls: ['./operacion.component.scss']
})
export class OperacionDetalleComponent implements OnInit {

    constructor(public analista: AnalistaService,
        private router: Router, private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        console.log('hola?')
    }
}