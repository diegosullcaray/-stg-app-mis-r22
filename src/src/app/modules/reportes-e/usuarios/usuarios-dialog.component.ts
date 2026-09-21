import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { bottomAlert } from "app/core/screen/animations/animations.util";
import { InFormDialogService } from "app/modules/shared/components/in-form-dialog/in-form-dialog.service";
import { ModReportesEService } from "../compartido/servicios/mod-reportes-e.service";
import { ReportesEService } from "../compartido/servicios/reportes-e.service";
import { UsuariosBaseComponent } from "./usuarios-base.component";

@Component({
    selector: 'app-usuarios-reportes-e',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.scss'],
    animations: [bottomAlert]
})
export class UsuariosDialogComponent extends UsuariosBaseComponent implements OnInit,OnDestroy {

    constructor(
        public antService: ModReportesEService, public reportesE:ReportesEService,
        private dialogRef: MatDialogRef<UsuariosDialogComponent>) {
        super(antService, reportesE);
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