import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { bottomAlert } from "app/core/screen/animations/animations.util";
import { FrameworkEsgService } from "../compartido/servicios/framework-esg.service";
import { ModFrameworkEsgService } from "../compartido/servicios/mod-framework-esg.service";
import { UsuariosBaseComponent } from "./usuarios-base.component";

@Component({
    selector: 'app-usuarios-framework-esg',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.scss'],
    animations: [bottomAlert]
})
export class UsuariosComponent extends UsuariosBaseComponent implements OnInit {

    constructor(
        public antService: ModFrameworkEsgService, public esgService: FrameworkEsgService,
        private router: Router, private activatedRoute: ActivatedRoute
    ) {
        super(antService,esgService);
    }

    ngOnInit(): void {
        this.init();
    }

    navMain() {
        this.router.navigate(['../'], { relativeTo: this.activatedRoute, skipLocationChange: true });
    }
}