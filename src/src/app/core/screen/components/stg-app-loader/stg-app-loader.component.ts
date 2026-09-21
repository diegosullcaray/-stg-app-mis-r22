import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'stg-app-loader',
    templateUrl: './stg-app-loader.component.html',
    styleUrls: ['./stg-app-loader.component.scss']
})
export class StgAppLoaderComponent implements OnInit {
    title;
    message;
    constructor(public dialogRef: MatDialogRef<StgAppLoaderComponent>) { }

    ngOnInit() {
    }

}