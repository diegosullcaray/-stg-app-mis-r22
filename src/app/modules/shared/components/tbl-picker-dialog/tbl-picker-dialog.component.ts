import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StgPaginatorComponent } from 'app/core/screen/components/stg-paginator/stg-paginator.component';
import { prepareDataForPagination } from 'app/core/screen/components/stg-paginator/stg-paginator.util';
import { printLog } from 'app/core/shared/debug.util';
import { Subscription } from 'rxjs';
import { TblPickerDialogService } from './tbl-picker-dialog.service';

@Component({
  selector: 'tbl-picker-dialog',
  templateUrl: './tbl-picker-dialog.component.html',
  styleUrls: ['./tbl-picker-dialog.component.scss']
})
export class TblPickerDialogComponent implements OnInit,OnDestroy {
  private matData: any;
  private selectedRow: any;
  private oriDataSource: any;
  private currDataSource: any;
  private first: boolean;

  private subsDataSource:Subscription;
  //private subsHeaders:Subscription;

  dialog: any;
  table: any;
  headers: any;
  dataSource: any;

  @ViewChild('paginator', { static: false }) paginatorComp: StgPaginatorComponent;
  showPaginator: boolean;
  dataSourceLenght: number;

  constructor(
    public service: TblPickerDialogService,
    private changeDetectorRef: ChangeDetectorRef,
    private dialogRef: MatDialogRef<TblPickerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.matData = data;
  }

  ngOnInit(): void {
    
    this.dialog = this.matData.dialog;
    this.table = this.matData.table;
    this.first = true;
    this.showPaginator=false;
    this.subsDataSource= this.service.dataSource$.subscribe((x: any) => {

      if (this.first && x && x.length > 0) {
        this.oriDataSource = x;
        this.currDataSource = x;
        this.first = false;
      }
      if (this.dialog.paginator.enabled && x && x.length > 0) {
        this.runPagination();
      }else{
        this.dataSource=x;
      }
    });
    this.headers=this.service.headers;
    //this.headers=[];
    /*this.subsHeaders= this.service.headers$.subscribe(x => {
      this.headers = x;
    });*/
  }

  ngOnDestroy():void{
    this.service.dataSource$.next([]);
    this.subsDataSource.unsubscribe();

    
    //this.subsHeaders.unsubscribe();
  }

  filter(evt: any) {
    let v = evt.target.value.toLowerCase();
    if (v === "") {
      this.currDataSource = this.oriDataSource;
    } else {
      let f = this.oriDataSource.filter((x: any) => {
        let r = false;
        this.dialog.searchBox.keys.forEach((y: any) => {
          r = r || x[y].toLowerCase().includes(v);
        });
        return r;
      });
      this.currDataSource = f;
    }
    if (this.dialog.paginator.enabled) {
      this.runPagination();
    } else {
      this.service.dataSource$.next(this.currDataSource);
    }

  }

  selectRow(row: any) {
    printLog("Fila Seleccionada: ", row);
    this.selectedRow = row;
    this.dialog.selectButton.enabled = true;
  }

  selectAndClose() {
    this.dialogRef.close(this.selectedRow);
  }

  changePage(evt: any) {
    this.page(evt.page);
  }

  page(p: number) {
    this.dataSource= this.currDataSource.filter(x => x.pk === p);
  }

  private runPagination() {
    let l = this.currDataSource.length;
    let pl = this.dialog.paginator.pageLenght;
    if (l > pl) {
      this.showPaginator = true;
      prepareDataForPagination(pl, this.currDataSource, 'pk');
      this.dataSourceLenght = l;
      this.changeDetectorRef.detectChanges();
      this.paginatorComp.toFirstPage();
      this.page(1);
    } else {
      this.showPaginator = false;
      this.dataSource= this.currDataSource;
    }
  }

}
