import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { StgWindowConfig } from '../stg-window/stg-window.config';
import { StgAppConfirmComponent } from './stg-app-confirm.component';

interface StgAppConfirmConfig {
  width?: string
}

@Injectable({
  providedIn: 'root',
})
export class StgAppConfirmService {
  dialogRef: MatDialogRef<StgAppConfirmComponent>;
  constructor(private dialog: MatDialog) { }

  public open(message: string = '¿Confirma la acción?', config: StgAppConfirmConfig = {width: '300px'}): Observable<any> {

    const dialogConfig = new StgWindowConfig();
    dialogConfig.height =config.width;

    this.dialogRef = this.dialog.open(StgAppConfirmComponent, dialogConfig);//backdropClass: 'light-backdrop'
    this.dialogRef.updateSize(config.width);
    this.dialogRef.componentInstance.message = message;
    return this.dialogRef.afterClosed();
  }

  public close() {
    if(this.dialogRef)
      this.dialogRef.close();
  }
}
