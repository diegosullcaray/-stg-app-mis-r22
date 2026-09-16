import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { StgWindowConfig } from "app/core/screen/components/stg-window/stg-window.config";
import { cloneObject, mergeObjects } from "app/core/shared/functions.util";
import { Subject } from "rxjs";
import { InFormDialogComponent } from "./in-form-dialog.component";
import { defaultInFormDialogOptions, defaultInFormFormOptions } from "./in-form-dialog.util";

@Injectable()
export class InFormDialogService {
    private form: any;
    private dialog: any;

    onSubmit$ = new Subject<any>();
    onCancel$ = new Subject<any>();
    onEvent$ = new Subject<any>();

    constructor(public mDialog: MatDialog) {
        this.dialog = cloneObject(defaultInFormDialogOptions);
        this.form = { options: cloneObject(defaultInFormFormOptions) };
    }

    public setFormOptions(opts: any): void {
        this.form = mergeObjects(this.form, opts);
    }

    public setDialogOptions(opts: any): void {
        this.dialog = mergeObjects(this.dialog, opts);
    }

    showDialog() {
        const dialogConfig = new StgWindowConfig();
        dialogConfig.width = this.dialog.panel.width;
        dialogConfig.height = this.dialog.panel.height;
        dialogConfig.data = {
            form: this.form,
            dialog: {
                title: this.dialog.title,
                submitButton: this.dialog.submitButton
            }
        };
        dialogConfig.disableClose = this.dialog.panel.modal;
        const dialogRef = this.mDialog.open(InFormDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(v => {
            if(v.action=="submit"){
                this.onSubmit$.next(v.controls);
            }else if(v.action=="cancel"){
                this.onCancel$.next(v.controls);
            }
            this.onEvent$.next(v);
        });
    }

}