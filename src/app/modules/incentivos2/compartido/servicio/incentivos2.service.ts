import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SecPickerDialogComponent } from 'app/modules/shared/components/sec-picker-dialog/sec-picker-dialog.component';

@Injectable()
export class Incentivos2Service {
    currCardData: any;
    private currPointer: number;
    dataSource: any;
    cod_bt: any;

    private tip_cod: any;
    private cod_rel: any;

    dsLoadedObs$ = new Subject<boolean>();
    currHierObs$ = new Subject<any>();
    currUserObs$ = new Subject<any>();
    btnSelSec$ = new BehaviorSubject<boolean>(false);


    constructor(public dialog: MatDialog) {
        this.currHierObs$.subscribe(x => {
            this.tip_cod = x.tip_cod;
            this.cod_rel = x.cod_rel;
            this.openSecSelector(true);
        });
    }

    openSecSelector(dc: boolean) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
            tip_cod: this.tip_cod,
            cod_rel: this.cod_rel,
            showCloseBtn: !dc
        };
        dialogConfig.disableClose = dc;
        const dialogRef = this.dialog.open(SecPickerDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(v => {
            if (v) {
                //this.cod_bt = this.cod_bt;
                let r = {cod_sec:v.cod_sec,cod_gru:v.cod_gru};
                this.currUserObs$.next(r);
                this.btnSelSec$.next(true);
            }
        });
    }


    setCardData(i: number) {
        this.currPointer = i;
        this.currCardData = this.dataSource.cards[this.currPointer];
    }

    nextCardData() {
        this.currPointer++;
        if (this.currPointer >= this.dataSource.cards.length) {
            this.currPointer = 0;
        }
        return this.dataSource.cards[this.currPointer];
    }

    prevCardData() {
        this.currPointer--;
        if (this.currPointer == -1) {
            this.currPointer = this.dataSource.cards.length - 1;
        }
        return this.dataSource.cards[this.currPointer];
    }


}