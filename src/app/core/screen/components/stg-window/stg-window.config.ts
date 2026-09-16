import { MatDialogConfig } from "@angular/material/dialog";

export class StgWindowConfig extends MatDialogConfig {
    width='600px';
    height='650px';
    disableClose = true;
    panelClass = 'stg-window-dialog';
}