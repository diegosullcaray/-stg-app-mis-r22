import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { bottomAlert } from "app/core/screen/animations/animations.util";
import { AnalistaService } from "app/modules/analista/compartido/servicios/analista.service";
import { ModSecService } from "app/modules/analista/compartido/servicios/mod-sec.service";
import { DetalleBaseComponent } from "./detalle-base.component";

@Component({
    selector: 'app-detalle-dialog-listas-analista',
    templateUrl: './detalle.component.html',
    styleUrls: ['./detalle.component.scss'],
    animations: [bottomAlert]
})
export class DetalleDialogComponent extends DetalleBaseComponent implements OnInit {

    constructor(
        public antSec: ModSecService, public analista: AnalistaService,
        private dialogRef: MatDialogRef<DetalleDialogComponent>) {
        super(antSec, analista);
    }

    ngOnInit(): void {
        this.init();
    }

    navMain() {
        this.dialogRef.close();
    }
}