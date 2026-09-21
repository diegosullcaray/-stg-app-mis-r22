import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'stg-binput-dialog',
    templateUrl: './stg-binput-dialog.component.html',
    styleUrls: ['./stg-binput-dialog.component.scss'],
})
export class StgBinputDialogComponent implements OnInit {
    textAreaForm: FormGroup;
    dataSource:any;
    title:string;

    constructor(
        private dialogRef: MatDialogRef<StgBinputDialogComponent>,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) data
    ) {
        this.dataSource=data;
     }

    ngOnInit(): void {
        let controls = {
            inText: this.dataSource.value
        }
        this.textAreaForm = this.formBuilder.group(controls);
        if(!this.dataSource.enabled){
            this.textAreaForm.disable();
            this.title="Detalle del dato";
        }else{
            this.title="Editar el dato";
        }
    }

    accept() {
        this.dialogRef.close(this.textAreaForm.controls.inText.value);
    }

    close() {
        this.dialogRef.close(this.dataSource.value);
    }
}