import { Injectable } from "@angular/core";
import { TblPickerDialogService } from "app/modules/shared/components/tbl-picker-dialog/tbl-picker-dialog.service";
import { ReplaySubject } from "rxjs";
import { chooserOpts } from "./incentivos-a.util";
import { ModIncentivosAService } from "./mod-incentivos-a.service";

@Injectable()
export class IncentivosAService {
    tip_cod: number;
    cod_rel: string;
    calcCfg: any;
    selHierObs$ = new ReplaySubject(1);
    cache:boolean;

    constructor(
        private tblPicker: TblPickerDialogService,
        private antInc: ModIncentivosAService
    ) {
        this.tblPicker.setTableOptions(chooserOpts.tableOptions);
        this.tblPicker.setDialogOptions(chooserOpts.dialogOptions);
        this.cache=true;
        this.tblPicker.afterCloseEvent$.subscribe(x => {
            let h ={
                tip_cod:x.tip_cod,
                cod_rel:x.cod_rel
            }
            this.selHierObs$.next(h);
        });
    }

    public returnUser() {
        let h = {
            tip_cod: this.tip_cod,
            cod_rel: this.cod_rel
        }
        this.selHierObs$.next(h);
    }

    public showPicker(f: boolean) {
        if (f) {
            this.tblPicker.setDialogOptions({
                panel: {
                    modal: false
                },
                closeButton: {
                    enabled: true
                }
            });
        }
        this.tblPicker.showDialog();
        if(this.cache){
            this.antInc.getPickerList(this.tip_cod, this.cod_rel).subscribe(x => {
                this.tblPicker.dataSource$.next(x.body.resultado);
                this.cache=false;
            });
        }
        
    }

    public setHeaders1() {
        this.tblPicker.headers=chooserOpts.headers1;
    }

    public setHeaders2() {
        this.tblPicker.headers=chooserOpts.headers2;
    }
}