import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { StgAlertComponent } from './stg-alert.component';

interface StgAlertConfig {
  width?: string
}

@Injectable({
  providedIn: 'root',
})
export class StgAlertService {
  dialogRef: MatDialogRef<StgAlertComponent>;
  constructor(private dialog: MatDialog) { }

  public open(title: string = 'Redireccionando',message:string, config: StgAlertConfig = {width: '200px'}): Observable<boolean> {
    this.dialogRef = this.dialog.open(StgAlertComponent,{disableClose:true});//backdropClass: 'light-backdrop'
    this.dialogRef.updateSize(config.width);
    this.dialogRef.componentInstance.title = title;
    this.dialogRef.componentInstance.message = message;
    return this.dialogRef.afterClosed();
  }

  public close() {
    if(this.dialogRef)
      this.dialogRef.close();
  }
}
