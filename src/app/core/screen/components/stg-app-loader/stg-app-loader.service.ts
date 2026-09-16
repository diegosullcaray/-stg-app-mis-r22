import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { StgAppLoaderComponent } from './stg-app-loader.component';

interface StgAppLoaderConfig {
  width?: string
}

@Injectable({
  providedIn: 'root',
})
export class StgAppLoaderService {
  dialogRef: MatDialogRef<StgAppLoaderComponent>;
  constructor(private dialog: MatDialog) { }

  public open(title: string = 'Espere por favor...', config: StgAppLoaderConfig = {width: '200px'}): Observable<boolean> {
    this.dialogRef = this.dialog.open(StgAppLoaderComponent, { disableClose: true});//backdropClass: 'light-backdrop'
    this.dialogRef.updateSize(config.width);
    this.dialogRef.componentInstance.title = title;
    return this.dialogRef.afterClosed();
  }

  public close() {
    if(this.dialogRef)
      this.dialogRef.close();
  }
}
