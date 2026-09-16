import { AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ModSysAdminService } from "app/core/data/remote/instances/mod-sys-admin.service";
import { StgPaginatorComponent } from "app/core/screen/components/stg-paginator/stg-paginator.component";
import { prepareDataForPagination, STG_GRID_STYLE } from "app/core/screen/components/stg-table/stg-table.util";
import { printLog } from "app/core/shared/debug.util";
import { tableHeaders } from "./sec-picker-dialog.util";


//@Deprecated
//Componente depreciado, se debe usar TablePickerDialogComponent
@Component({
    selector: 'sec-picker-dialog',
    templateUrl: './sec-picker-dialog.component.html',
    styleUrls: ['./sec-picker-dialog.component.scss']
})
export class SecPickerDialogComponent implements OnInit, AfterViewInit {
    title: string = "Selecciona Analista";

    dataSource: any[];
    headerDefs: any;
    tableConf: any;
    dataLoadObs: boolean;
    dataSourceLenght: number;
    showPaginator:boolean;
    enableSelectBtn:boolean;
    showCloseBtn:boolean;

    private selectedItem: any;
    private tip_cod: number;
    private cod_rel: string;
    private originalDataSource: any[];
    private currentDataSource: any[];
    private pageSize = 10;
    
    @ViewChild('paginator',{ static: false }) paginator: StgPaginatorComponent;

    constructor(
        private dialogRef: MatDialogRef<SecPickerDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data,
        private antAdmin: ModSysAdminService,
        private changeDetectorRef: ChangeDetectorRef
    ) {
        this.dataLoadObs = true;
        this.tip_cod = data.tip_cod;
        this.cod_rel = data.cod_rel;
        this.showPaginator=false;
        this.enableSelectBtn=false;
        this.showCloseBtn=data.showCloseBtn;
    }

    ngAfterViewInit(): void {
        this.antAdmin.getListPick01(this.tip_cod, this.cod_rel).subscribe(x => {
            let r: any = x.body;
            let ds = r.list_res;
            this.dataSourceLenght=ds.length;
            this.originalDataSource = ds;
            this.currentDataSource = ds;
            this.prepPagination();
            this.dataLoadObs = false;
        });
    }

    ngOnInit(): void {
        this.headerDefs = tableHeaders;
        this.tableConf = {
            table:{
                grid: STG_GRID_STYLE
            }
        }
    }

    private prepPagination() {
        let l = this.currentDataSource.length;
        if (l > this.pageSize) {
            this.showPaginator=true;
            this.changeDetectorRef.detectChanges();
            prepareDataForPagination(this.pageSize, this.currentDataSource, 'pk');
            this.dataSourceLenght = l;
            this.paginator.toFirstPage();
            this.page(1);
        } else {
            this.showPaginator=false;
            this.dataSource = this.currentDataSource;
        }
    }

    filter(evt: any) {
        let v = evt.target.value.toLowerCase();
        if (v === "") {
            this.currentDataSource = this.originalDataSource;
        } else {
            this.currentDataSource = this.originalDataSource.filter(x => x.des_sec.toLowerCase().includes(v));
        }
        this.prepPagination();
    }

    changePage(evt: any) {
        this.page(evt.page);
    }

    page(p: number) {
        this.dataSource = this.currentDataSource.filter(x => x.pk === p);
    }

    selectSec(r: any) {
        printLog("Sec Seleccionado",r);
        this.selectedItem = r;
        this.enableSelectBtn=true;
    }

    selectAndClose() {
        this.dialogRef.close(this.selectedItem);
    }

}