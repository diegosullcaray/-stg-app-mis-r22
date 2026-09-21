import { Component, OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { bottomAlert } from "app/core/screen/animations/animations.util";
import { AdministracionService } from "../../compartido/servicios/administracion.service";
import { ModAdminService } from "../../compartido/servicios/mod-admin.service";
import { DetalleBaseComponent } from "./detalle-base.component";

@Component({
    selector: 'app-detalle-usuarios-administracion',
    templateUrl: './detalle.component.html',
    styleUrls: ['./detalle.component.scss'],
    animations: [bottomAlert]
})
export class DetalleComponent extends DetalleBaseComponent implements OnInit,OnDestroy {

    constructor(
        public antAdm: ModAdminService, public administracion: AdministracionService,
        private router: Router, private activatedRoute: ActivatedRoute,public formBuilder: FormBuilder
    ) {
        super(antAdm,administracion,formBuilder);
    }
    ngOnDestroy(): void {
       this.destroy();
    }

    ngOnInit(): void {
        this.init();
    }

    navMain() {
        this.router.navigate(['../'], { relativeTo: this.activatedRoute, skipLocationChange: true });
    }
}