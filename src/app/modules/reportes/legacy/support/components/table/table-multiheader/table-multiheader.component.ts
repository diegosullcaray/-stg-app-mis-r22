import { Component, OnInit, Input, SimpleChanges,OnChanges, ViewChild, ChangeDetectorRef, Output,EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { isNullOrUndefined, isUndefined } from 'app/core/shared/functions.util';
import { LayoutService } from 'app/system/admin/services/layout.service';
import { ReplaySubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-table-multiheader',
  templateUrl: './table-multiheader.component.html',
  styleUrls: ['./table-multiheader.component.scss']
})


export class TableMultiheaderComponent implements OnInit,OnChanges {
  @Output() refresh = new EventEmitter<Object>();
  @Input() config_table;
  dataSource=new MatTableDataSource();
  private paginator: MatPaginator;
  @ViewChild(MatPaginator, {static: false}) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }
  @ViewChild('table',{static:false}) table;
  displayedColumns=[];
  displayedData=[];
  columns=[];
  isLoadingTable=false;
  isInit=false;
  filterInput:Boolean=false;
  annotation;
  style;
  noData = this.dataSource.connect().pipe(map(data => data.length === 0));
  isMovil:boolean=true;
  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);
  constructor(private cdr:ChangeDetectorRef,
              private layout:LayoutService) {}

  ngOnChanges(changes: SimpleChanges){
    if (changes.config_table && !changes.config_table.isFirstChange()){
      if(!this.config_table.conf.isLoadingResults){
        //forced reset
        this.isLoadingTable=false;
        this.cdr.detectChanges();
  
        this.dataSource.data=this.config_table.ELEMENT_DATA;
        this.displayedColumns = this.config_table.mat_table.displayedColumns;
        this.displayedData = this.config_table.mat_table.displayedData;
        this.columns = this.config_table.columns;
      }
        this.annotation=this.config_table.annotation;
        this.style=this.config_table.style;
        this.isInit=this.config_table.conf.isInit;
        this.isLoadingTable=this.config_table.conf.isInit;
        this.filterInput=this.config_table.filterInput;
        this.cdr.detectChanges();
        if(this.table!=undefined && !this.config_table.conf.isErrorResults)
          setTimeout(() => {
            this.table.updateStickyColumnStyles();
            this.table.updateStickyHeaderRowStyles();
            this.table.updateStickyFooterRowStyles()}, 500);
    }
  }

  ngOnInit() {
    this.renderGraphicLayout();
  }

  private  renderGraphicLayout():void{
    let state$=this.layout.layoutConf$.pipe(map((r)=>r.sidebarStyle))
    state$.pipe(takeUntil(this.destroy$))
    .subscribe(()=>{
      if(this.table!=undefined)
        setTimeout(() => {this.table.updateStickyColumnStyles();this.table.updateStickyHeaderRowStyles();this.table.updateStickyFooterRowStyles()}, 500);
      if(window.innerWidth<370 && this.isMovil)
        this.isMovil=false;
      if(window.innerWidth>=370 && !this.isMovil)
        this.isMovil=true;      
    })
  }

  public tr(row){
    if(this.config_table.conf_init.edit){
      this.refresh.emit(row);
    }
  }

  public loadButton(row,c:any){
    let vars=c.format.action.var;
    let action=c.columnDef;
    if(!isNullOrUndefined(vars)){
      let vars2=vars.split("-"),row_e={};
      vars2.forEach((v:string)=>{
        row_e[v]=row[v]
        if(isUndefined(row[v]))
          row_e[v]=null
      });
      this.refresh.emit({action:action,row:row_e});
    }else {
      this.refresh.emit({action:action,row:row});
    }
  }

  public applyFilter(evt: any) {
    let filterValue = (evt as HTMLTextAreaElement).value
    if(!isUndefined(this.dataSource)){
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  public variation(row,c){
    //row['vari_1_act_prod_222']
    let vars=c.format.action.var;
    if(!isNullOrUndefined(vars)){
      let vars2=vars.split("-");
      var variation:number=0;
      vars2.forEach((v:string,i:number)=>{
        var num
        if(isUndefined(row[v])){
           num=0;
        }else {
           num=row[v]
        }
          if(i==0)
            variation=variation+num;
          else if(i==1)
            variation=variation-num;
     
       
          
      });
    }
    
    return variation
  }

  public ratio(row,c){
    //row['vari_1_act_prod_222']
    let vars=c.format.action.var;
    if(!isNullOrUndefined(vars)){
      let vars2=vars.split("-");
      var variation:number=0;
      vars2.forEach((v:string,i:number)=>{
        var num
        if(isUndefined(row[v])){
           num=0;
        }else {
           num=row[v]
        }
          if(i==0)
            variation=variation+num;
          else if(i==1)
            variation=variation/num;
     
       
          
      });
    }
    
    return variation
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
