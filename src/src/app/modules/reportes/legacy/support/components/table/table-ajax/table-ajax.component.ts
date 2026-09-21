import {Component, ViewChild, AfterViewInit, SimpleChanges, ChangeDetectorRef, Input, Output,EventEmitter, OnChanges, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-ajax',
  templateUrl: './table-ajax.component.html',
  styleUrls: ['./table-ajax.component.scss']
})
export class TableAjaxComponent implements AfterViewInit,OnChanges,OnInit {
  @Output() refresh = new EventEmitter<Object>();
  @Input() config_table;
  dataSource=new MatTableDataSource();
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild('table',{static:false}) table;
  displayedColumns=[];
  displayedData=[];
  columns=[];
  isLoadingTable=false;
  isInit=false;
  annotation;
  resultsLength=1000;
  private destroy$:ReplaySubject<boolean>=new ReplaySubject(1);

  constructor(private cdr:ChangeDetectorRef) { }

  ngOnInit() {
 
  }

  ngOnChanges(changes: SimpleChanges){
    if (changes.config_table && !changes.config_table.isFirstChange()){
      //console.log(this.config_table);
      //forced reset
      //this.isLoadingTable=false;
      //this.cdr.detectChanges();
     
      this.dataSource.data=this.config_table.ELEMENT_DATA;
      this.displayedColumns = this.config_table.mat_table.displayedColumns;
      this.displayedData = this.config_table.mat_table.displayedData;
      this.columns = this.config_table.columns;
      this.annotation=this.config_table.annotation;
      this.isInit=this.config_table.conf.isInit;
      this.isLoadingTable=this.config_table.conf.isInit;
      this.resultsLength=this.config_table.Ext.Total;
      //this.dataSource.paginator = this.paginator
      this.cdr.detectChanges();
    }
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    setTimeout(() => {
      this.view();
    }, 5000);
  }

  view(){
    //console.log(this.paginator);
    this.paginator.page
    .pipe(takeUntil(this.destroy$))
    .subscribe(r=>{
      this.refresh.emit({
        pagen:r.pageIndex+1
      })
      
    })
    
  }

  pge(){
    //console.log(this.paginator);
    this.paginator.pageIndex = 5;
    this.cdr.detectChanges();
  }

  public tr(row){
    if(this.config_table.conf_init.edit){
      this.refresh.emit(row);
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
