import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { bottomAlert } from "app/core/screen/animations/animations.util";
import { FrameworkEsgService } from "../compartido/servicios/framework-esg.service";
import { ModFrameworkEsgService } from "../compartido/servicios/mod-framework-esg.service";
import { EditarBaseComponent } from "./editar-base.component";

@Component({
    selector: 'app-editar-dialog-framework-esg',
    templateUrl: './editar.component.html',
    styleUrls: ['./editar.component.scss'],
    animations: [bottomAlert]
})
export class EditarDialogComponent extends EditarBaseComponent implements OnInit {

    constructor(
        public antService: ModFrameworkEsgService, public esgService: FrameworkEsgService,public formBuilder:FormBuilder,
        private dialogRef: MatDialogRef<EditarDialogComponent>) {
        super(antService, esgService,formBuilder);
    }

    ngOnInit(): void {
        this.init();
    }

    navMain() {
        this.dialogRef.close();
    }
}