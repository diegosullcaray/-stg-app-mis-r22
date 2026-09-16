import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'stg-app-confirm',
    templateUrl: './stg-app-confirm.component.html',
    styleUrls: ['./stg-app-confirm.component.scss']
})
export class StgAppConfirmComponent implements OnInit {
    title;
    message;
    constructor(public dialogRef: MatDialogRef<StgAppConfirmComponent>) { }

    ngOnInit() {
    }

    confirm(){
        this.dialogRef.close({result:1});
    }

    cancel(){
        this.dialogRef.close({result:0});
    }

}