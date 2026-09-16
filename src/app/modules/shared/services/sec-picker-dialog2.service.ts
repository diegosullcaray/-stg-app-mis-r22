import { Injectable } from "@angular/core";
import { ModSysAdminService } from "app/core/data/remote/instances/mod-sys-admin.service";
import { ReplaySubject } from "rxjs";
import { TblPickerDialogService } from "../components/tbl-picker-dialog/tbl-picker-dialog.service";

const tableOptions={
    body:{
        loading:{
            rows:8
        }
    }
};

const dialogOptions={
    panel: {
        modal: true,
        width:'650px',
        //clearDataSourceOnClose:true
    },
    paginator:{
        enabled: true
    },
    searchBox: {
        enabled: true,
        keys:['des_sec']
    },
    /*refreshButton:{
        enabled:true
    },*/
    title: {
        text: "Asesor de Negocios",
        enabled: true
    },
    closeButton: {
        enabled: false
    }
};

const headers=[
    {
        label: 'Asesor',
        key: 'des_sec',
        style:{
            'min-width':'200px'
        }
    },
    {
        label: 'Unidad',
        key: 'des_uni',
        style:{
            'min-width':'200px'
        }
    },
    {
        label: 'Corredor',
        key: 'des_cor',
        style:{
            'min-width':'200px'
        }
    },
    {
        label: 'Territorio',
        key: 'des_ter',
        style:{
            'min-width':'200px'
        }
    }
];

@Injectable()
export class SecPickerDialog2Service {
    tip_cod:number;
    cod_rel:string;
    selectedSec$ = new ReplaySubject(1);
    private cache:boolean;

    constructor(
        private tblPicker: TblPickerDialogService,
        private antAdmin: ModSysAdminService
    ){
        this.cache=false;
        this.tblPicker.afterCloseEvent$.subscribe(x => {
            this.selectedSec$.next(x);
        });

        //this.tblPicker.onRefresh$.subscribe()
    }

    showDialog(f: boolean){
        this.tblPicker.headers=headers;
        this.tblPicker.setTableOptions(tableOptions);
        this.tblPicker.setDialogOptions(dialogOptions);
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
        // this.antInc.getPickerList(this.tip_cod, this.cod_rel).subscribe(x => {
        //     this.tblPicker.dataSource$.next(x.body.resultado);
        // });
        //if(!this.cache){
            this.antAdmin.getListPick01(this.tip_cod, this.cod_rel).subscribe(x => {
                //this.tblPicker.dataSource$.next([]);
                let r: any = x.body;
                let ds = r.list_res;
                //this.cache=true;
                this.tblPicker.dataSource$.next(ds);
                //this.dataSourceLenght=ds.length;
                //this.originalDataSource = ds;
                //this.currentDataSource = ds;
                //this.prepPagination();
                //this.dataLoadObs = false;
            });
        //}
        
    }

}