import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { cloneObject, isNullOrUndefined, mergeObjects } from "app/core/shared/functions.util";
import { ReplaySubject, Subject } from "rxjs";
import { TblPickerDialogComponent } from "./tbl-picker-dialog.component";
import { defaultTblPickerDialogOptions, defaultTblPickerTableOptions } from "./tbl-picker-dialog.util";

@Injectable()
export class TblPickerDialogService {
    private table: any;
    private dialog: any;
    dataSource$ = new ReplaySubject(1);
    //headers$ = new ReplaySubject(1);
    headers: any;
    afterCloseEvent$ = new Subject<any>();

    constructor(public mDialog: MatDialog) {
        this.headers=[];
        this.dialog = cloneObject(defaultTblPickerDialogOptions);
        this.table = cloneObject(defaultTblPickerTableOptions);
    }

    public setTableOptions(opts: any): void {
        this.table = mergeObjects(this.table, opts);
    }

    public setDialogOptions(opts: any): void {
        this.dialog = mergeObjects(this.dialog, opts);
    }

    showDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = this.dialog.panel.width;
        dialogConfig.height = this.dialog.panel.height;
        dialogConfig.data = {
            table: this.table,
            dialog: {
                closeButton: this.dialog.closeButton,
                title: this.dialog.title,
                searchBox: this.dialog.searchBox,
                refreshButton: this.dialog.refreshButton,
                selectButton: this.dialog.selectButton,
                paginator: this.dialog.paginator
            }
        };
        dialogConfig.disableClose = this.dialog.panel.modal;
        const dialogRef = this.mDialog.open(TblPickerDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(v => {
            if (this.dialog.panel.clearDataSourceOnClose) {
                this.dataSource$.next([]);
            }
            if (this.dialog.panel.allowNullSelection || !isNullOrUndefined(v)) {
                this.afterCloseEvent$.next(v);
            }
        });
    }
}