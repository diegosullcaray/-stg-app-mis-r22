import { Component, OnInit } from "@angular/core";
import { FormBuilder, UntypedFormBuilder } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { bottomAlert } from "app/core/screen/animations/animations.util";  
import { GuardarBasePmComponent } from './guardar-base-pm.component';
import { ModReportesEService } from '../compartido/servicios/mod-reportes-e.service';
import { ReportesEService } from '../compartido/servicios/reportes-e.service';
 

@Component({
    selector: 'app-guardar-dialog-prospecto-pm',
    templateUrl: './guardar-pm.component.html',
    styleUrls: ['./guardar-pm.component.scss'],
    animations: [bottomAlert]
})
export class GuardarDialogPmComponent extends GuardarBasePmComponent implements OnInit {

    constructor(
        public antService: ModReportesEService, public incentivos: ReportesEService,public formBuilder:FormBuilder,
        private dialogRef: MatDialogRef<GuardarDialogPmComponent>) {
        super(antService,incentivos,formBuilder);
    }

    ngOnInit(): void {
        this.init();
    }

    navMain() {
        this.dialogRef.close();
    }
}