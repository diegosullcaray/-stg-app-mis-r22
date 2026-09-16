import { AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StgPaginatorComponent } from 'app/core/screen/components/stg-paginator/stg-paginator.component';
import { prepareDataForPagination, STG_GRID_STYLE } from 'app/core/screen/components/stg-table/stg-table.util';
import { printLog } from 'app/core/shared/debug.util';
import { SecPickerDialogComponent } from 'app/modules/shared/components/sec-picker-dialog/sec-picker-dialog.component';
import { ModKaypachaService } from '../compartido/servicio/mod-kaypacha.service';

export interface DialogData {
  filtro: string;
}

@Component({
  selector: 'app-buscador-kaypacha',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorKaypachaComponent implements OnInit, AfterViewInit {
  title: string = "Selecciona Colaborador";

  dataSource: any[];
  headerDefs: any;
  tableConf: any;
  dataLoadObs: boolean;
  dataSourceLenght: number;
  showPaginator: boolean;
  enableSelectBtn: boolean;
  showCloseBtn: boolean;

  private selectedItem: any;
  private originalDataSource: any[];
  private currentDataSource: any[];
  private pageSize = 10;

  @ViewChild('paginator', { static: false }) paginator: StgPaginatorComponent;

  constructor(
    private dialogRef: MatDialogRef<SecPickerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private ant: ModKaypachaService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.dataLoadObs = true;
    this.showPaginator = false;
    this.enableSelectBtn = false;
    this.showCloseBtn = data.showCloseBtn;
  }

  ngAfterViewInit(): void {
    this.ant.getUserLists().subscribe(x => {
      let r: any = x.body;
      let ds = r.resultado;
      this.dataSourceLenght=ds.length;
      this.originalDataSource = ds;
      this.currentDataSource = ds;
      this.prepPagination();
      this.dataLoadObs = false;
  });
  }

  ngOnInit(): void {
    this.headerDefs = [
      {
        label: 'Codigo BT',
        key: 'cod_bt',
        style: {
          'min-width': '200px'
        }
      },
      {
        label: 'N. Documento',
        key: 'num_doc',
        style: {
          'min-width': '200px'
        }
      },
      {
        label: 'Nombre',
        key: 'des_col',
        style: {
          'min-width': '200px'
        }
      }
    ];;
    this.tableConf = {
      table: {
        grid: STG_GRID_STYLE
      }
    }
  }

  private prepPagination() {
    let l = this.currentDataSource.length;
    if (l > this.pageSize) {
      this.showPaginator = true;
      this.changeDetectorRef.detectChanges();
      prepareDataForPagination(this.pageSize, this.currentDataSource, 'pk');
      this.dataSourceLenght = l;
      this.paginator.toFirstPage();
      this.page(1);
    } else {
      this.showPaginator = false;
      this.dataSource = this.currentDataSource;
    }
  }

  filter(evt: any) {
    let v = evt.target.value.toLowerCase();
    if (v === "") {
      this.currentDataSource = this.originalDataSource;
    } else {
      this.currentDataSource = this.originalDataSource.filter(x => x.des_col.toLowerCase().includes(v));
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
    printLog("Seleccionado", r);
    this.selectedItem = r;
    this.enableSelectBtn = true;
  }

  selectAndClose() {
    this.dialogRef.close(this.selectedItem);
  }
}
