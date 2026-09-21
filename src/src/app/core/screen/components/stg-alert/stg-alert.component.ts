import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'stg-alert',
    templateUrl: './stg-alert.component.html',
    styleUrls: ['./stg-alert.component.scss']
})
export class StgAlertComponent implements OnInit {
    title;
    message;
    constructor(public dialogRef: MatDialogRef<StgAlertComponent>) { }

    ngOnInit() {
    }

}