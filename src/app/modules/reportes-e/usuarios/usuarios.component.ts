import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { bottomAlert } from "app/core/screen/animations/animations.util";
import { ModReportesEService } from "../compartido/servicios/mod-reportes-e.service";
import { ReportesEService } from "../compartido/servicios/reportes-e.service";
import { UsuariosBaseComponent } from "./usuarios-base.component";

@Component({
    selector: 'app-usuarios-reportes-e',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.scss'],
    animations: [bottomAlert]
})
export class UsuariosComponent extends UsuariosBaseComponent implements OnInit {

    constructor(
        public antService: ModReportesEService, public reportesE: ReportesEService,
        private router: Router, private activatedRoute: ActivatedRoute
    ) {
        super(antService,reportesE);
    }

    ngOnInit(): void {
        this.init();
    }

    navMain() {
        this.router.navigate(['../'], { relativeTo: this.activatedRoute, skipLocationChange: true });
    }
}