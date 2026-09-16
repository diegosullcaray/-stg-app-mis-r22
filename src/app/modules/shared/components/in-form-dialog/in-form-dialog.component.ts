import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { StgFormComponent } from "app/core/screen/components/stg-form/stg-form.component";

@Component({
    selector: 'in-form-dialog',
    templateUrl: './in-form-dialog.component.html',
    styleUrls: ['./in-form-dialog.component.scss']
})
export class InFormDialogComponent implements OnInit {
    private matData: any;

    title: any;
    submitButton: any;

    form: any;

    @ViewChild('localForm', { static: false }) formComp: StgFormComponent;

    constructor(
        private dialogRef: MatDialogRef<InFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
        this.matData = data;
    }

    ngOnInit(): void {

        let dialog = this.matData.dialog;

        this.title = dialog.title;
        this.submitButton = dialog.submitButton;
        this.form = this.matData.form;
    }


    closeForm() {
        this.dialogRef.close({ action: "cancel" });
    }

    submitForm() {
        this.dialogRef.close({ action: "submit", controls: this.formComp.getControls() });
    }
}