import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
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
export class UsuariosDialogComponent extends UsuariosBaseComponent implements OnInit,OnDestroy {

    constructor(
        public antService: ModFrameworkEsgService, public esgService:FrameworkEsgService,
        private dialogRef: MatDialogRef<UsuariosDialogComponent>) {
        super(antService, esgService);
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