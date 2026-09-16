import { Injectable } from '@angular/core';
import { isUndefined } from 'app/core/shared/functions.util';
import { confInit } from '../common/components-ui.interface';

@Injectable()
export class TableService {
  private conf={
    width:'100%',
    class:'mat-table-1',
    edit:false,
    paginator:true,
    paginator_size:10,
    sticky:0,
    isLoadingResults:false,
    isErrorResults:false,
    isInit:true,
  }
  private tipoN=[];
  private columns=[];
  private ELEMENT_DATA=[];
  constructor() {
  }

  sizePaginator(paginator_size:number){
    this.conf.paginator_size=paginator_size;
  }

  Paginator(paginator:boolean){
    this.conf.paginator=paginator;
  }

  Width(width:string) {
    this.conf.width=width;
  }

  Class(NameClass:string) {
    this.conf.class=NameClass;
  }

  Edit(edit:boolean){
    this.conf.edit=edit;
  }

  addColumns(columns:any){
    columns.map((e,i)=>{
      columns[i]['cell']= (element: any)=> element[e.columnDef];
    })
    this.columns=columns;
  }

  addELEMENT_DATA(data:any){
    this.ELEMENT_DATA=data;
  }

  hiddenColumn(column){
    this.columns=this.columns.filter((r)=>r.columnDef!=column)
  }

  stickyIndex(sticky:number){
    this.conf.sticky=sticky;
  }

  asignStyleNum(IndexArrayStyleNum){
    this.tipoN=IndexArrayStyleNum;
  }

  results(init:boolean,loading:boolean,error:boolean){
    this.conf.isErrorResults=error;
    this.conf.isLoadingResults=loading;
    this.conf.isInit=init;
  }

  getFinished():boolean{
    return this.conf.isInit && !this.conf.isErrorResults && !this.conf.isLoadingResults
  }




}

export class TableMHService {
  private conf={
    isLoadingResults:false,
    isErrorResults:false,
    isInit:true,
  } 
  private conf_init:confInit;
  private mat_table={
    displayedColumns:[],
    displayedData:[]
  }
  private style={};
  private filterInput=false;
  private annotation={};
  private columns=[];
  private ELEMENT_DATA=[];
  private paramsAdd={};
  private Ext={};
  constructor(conf?:any) {
    if(conf!=undefined)
      this.setConfInitv2(conf)
  }

  private setConfInitv2(conf:any){
    let table=conf
    if(table!=undefined){
      table.content!=undefined?this.annotation=table.content:null;
      table.theme!=undefined?this.conf_init=table.theme:null;
      table.width!=undefined?this.conf_init.width=table.width:null;
      table.params!=undefined?this.paramsAdd=table.params:null;
      table.style!=undefined?this.style=table.style:null;
      if(!isUndefined(table.filter_input))
        this.filterInput=table.filter_input
    }else{
      //console.log('Register Config Table');
    }
  }

  addColumns(columns:any){
    this.columns=columns;
    this.setdisplayedColumns(this.columns);
    this.setcolumns(this.columns);
    this.setdisplayedData();
  }

  addELEMENT_DATA(data:[]){
    this.ELEMENT_DATA=data;
  }

  addExt(obj:{}){
    if(obj!=undefined)
      this.Ext=obj;
    for (let k in this.Ext) {
      //console.log(k,obj[k]);
      //let v = obj[k];
      //console.log(this.annotation['higher']);
      if(this.annotation['higher']!=undefined)
        this.annotation['higher']=this.annotation['higher'].replace(":$"+k,obj[k].toString()).replace("hidden","");
      if(this.annotation['lower']!=undefined)
        this.annotation['lower']=this.annotation['lower'].replace(":$"+k,obj[k].toString()).replace("hidden","");
    }
  }

  results(init:boolean,loading:boolean,error:boolean){
    this.conf.isErrorResults=error;
    this.conf.isLoadingResults=loading;
    this.conf.isInit=init;
  }

  getFinished():boolean{
    return this.conf.isInit && !this.conf.isErrorResults && !this.conf.isLoadingResults
  }

  getParamsAdd():{}{
    return this.paramsAdd
  }

  private setdisplayedColumns(columns){
    let data=columns.map(r=>{
      let columns=r.columns.map(g=>g.columnDef)
      return columns
      return {level:r.level,columns:columns}
    })
    this.mat_table.displayedColumns=data;
  }

  private setcolumns(columns){
    let data2=[];
    columns.map((r)=>{
      r.columns.map((g)=>{
        data2.push(g);
      });
    })
    this.columns=data2;

    this.columns.map((e,i)=>{
      this.columns[i]['cell']= (element: any)=> element[e.columnDef];
    })
  }

  private setdisplayedData(){
    let data3=[];
    this.columns.map((g)=>{
        if(g.isdata){
          data3.push(g);
        }
    })
    data3.sort((a,b)=>{
      if (a.isdata > b.isdata) { return 1; } 
      if (a.isdata < b.isdata) { return -1; } 
      return 0;
    })
    this.mat_table.displayedData=data3.map(r=>r.columnDef);
  }




}
