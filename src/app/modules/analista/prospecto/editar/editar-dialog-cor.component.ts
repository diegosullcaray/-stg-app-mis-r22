import { Component, OnInit } from "@angular/core";
import { FormBuilder, UntypedFormBuilder } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { bottomAlert } from "app/core/screen/animations/animations.util"; 
import { ProspectoCorService } from '../compartido/servicios/prospecto-cor.service';
import { ModProspectoCorService } from '../compartido/servicios/mod-prospecto-cor.service';
import { EditarBaseCorComponent } from "./editar-base-cor.component";
 

@Component({
    selector: 'app-editar-dialog-prospecto-cor',
    templateUrl: './editar-cor.component.html',
    styleUrls: ['./editar-cor.component.scss'],
    animations: [bottomAlert]
})
export class EditarDialogCorComponent extends EditarBaseCorComponent implements OnInit {

    constructor(
        public antService: ModProspectoCorService, public incentivos: ProspectoCorService,public formBuilder:FormBuilder,
        private dialogRef: MatDialogRef<EditarDialogCorComponent>) {
        super(antService,incentivos,formBuilder);
    }

    ngOnInit(): void {
        this.init();
    }

    navMain() {
        this.dialogRef.close();
    }
}