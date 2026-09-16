import { Component, OnInit } from "@angular/core";
import { FormBuilder, UntypedFormBuilder } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { bottomAlert } from "app/core/screen/animations/animations.util"; 
import { ModReportesEService } from '../compartido/servicios/mod-reportes-e.service';
import { ReportesEService } from '../compartido/servicios/reportes-e.service';
import { EditarBasePmComponent } from './editar-base-pm.component';
 
 

@Component({
    selector: 'app-editar-dialog-pm',
    templateUrl: './editar-pm.component.html',
    styleUrls: ['./editar-pm.component.scss'],
    animations: [bottomAlert]
})
export class EditarDialogPmComponent extends EditarBasePmComponent implements OnInit {

    constructor(
        public antService: ModReportesEService, public incentivos: ReportesEService,public formBuilder:FormBuilder,
        private dialogRef: MatDialogRef<EditarDialogPmComponent>) {
        super(antService,incentivos,formBuilder);
    }

    ngOnInit(): void {
        this.init();
    }

    navMain() {
        this.dialogRef.close();
    }
}