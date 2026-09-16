import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SecPickerDialogComponent } from 'app/modules/shared/components/sec-picker-dialog/sec-picker-dialog.component';

@Injectable()
export class SistematicaService {
    curr_lbl:string;

    curr_hier:any;

    constructor(){
        this.curr_lbl="";
    }
}