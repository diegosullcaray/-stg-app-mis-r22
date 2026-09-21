import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { bottomAlert } from "app/core/screen/animations/animations.util";
import { AdministracionService } from "../../compartido/servicios/administracion.service";
import { ModAdminService } from "../../compartido/servicios/mod-admin.service";
import { DetalleBaseComponent } from "./detalle-base.component";

@Component({
    selector: 'app-detalle-dialog-usuarios-administracion',
    templateUrl: './detalle.component.html',
    styleUrls: ['./detalle.component.scss'],
    animations: [bottomAlert]
})
export class DetalleDialogComponent extends DetalleBaseComponent implements OnInit,OnDestroy {

    constructor(
        public antAdmin: ModAdminService, public administracion: AdministracionService,
        private dialogRef: MatDialogRef<DetalleDialogComponent>,public formBuilder: FormBuilder) {
        super(antAdmin, administracion,formBuilder);
    }
    ngOnDestroy(): void {
        this.destroy();
    }

    ngOnInit(): void {
        this.init();
    }

    navMain() {
        this.dialogRef.close();
    }
}