import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { bottomAlert } from "app/core/screen/animations/animations.util";
import { AnalistaService } from "app/modules/analista/compartido/servicios/analista.service";
import { ModSecService } from "app/modules/analista/compartido/servicios/mod-sec.service";
import { DetalleBaseComponent } from "./detalle-base.component";

@Component({
    selector: 'app-detalle-listas-analista',
    templateUrl: './detalle.component.html',
    styleUrls: ['./detalle.component.scss'],
    animations: [bottomAlert]
})
export class DetalleComponent extends DetalleBaseComponent implements OnInit {

    constructor(
        public antSec: ModSecService, public analista: AnalistaService,
        private router: Router, private activatedRoute: ActivatedRoute
    ) {
        super(antSec,analista);
    }

    ngOnInit(): void {
        this.init();
    }

    navMain() {
        this.router.navigate(['../'], { relativeTo: this.activatedRoute, skipLocationChange: true });
    }
}