import { Component, OnInit } from "@angular/core";
import { FormBuilder, UntypedFormBuilder } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { bottomAlert } from "app/core/screen/animations/animations.util"; 
import { ProspectoCorService } from '../compartido/servicios/prospecto-cor.service';
import { ModProspectoCorService } from '../compartido/servicios/mod-prospecto-cor.service';
import { GuardarBaseCorComponent } from "./guardar-base-cor.component";
 

@Component({
    selector: 'app-guardar-dialog-prospecto-cor',
    templateUrl: './guardar-cor.component.html',
    styleUrls: ['./guardar-cor.component.scss'],
    animations: [bottomAlert]
})
export class GuardarDialogCorComponent extends GuardarBaseCorComponent implements OnInit {

    constructor(
        public antService: ModProspectoCorService, public incentivos: ProspectoCorService,public formBuilder:FormBuilder,
        private dialogRef: MatDialogRef<GuardarDialogCorComponent>) {
        super(antService,incentivos,formBuilder);
    }

    ngOnInit(): void {
        this.init();
    }

    navMain() {
        this.dialogRef.close();
    }
}