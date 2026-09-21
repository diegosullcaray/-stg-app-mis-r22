import { isUndefined } from "app/core/shared/functions.util";
import { ReportType } from "../data/ant-mod-rep.service";

export class ReportT {
  private name:string;
  private count:[]=[];
  private countG:[]=[];
  private jerar:string;
  private reportType:ReportType=ReportType.DEPRECATED;
  private tables;
  private filters:[]=[];
  private graphic; 
  constructor(report:any) {
    this.setRender(report);
  }


  private setRender(report:any){
    this.setReport(report);
    this.setJerar(report);
    this.setFilters(report);
    this.setReportType(report);

    if(!isUndefined(report.table)){
      this.setCount(report);
      this.setTables(report);
    }
    if(!isUndefined(report.graphic)){
      this.setCountG(report);
      this.setGraphic(report);
    }
  }

  private setJerar(report:any){
    this.jerar=report.jerar;
  }

  private setReportType(report:any){
    if(!isUndefined(report.reportType))
      this.reportType=report.reportType;
  }

  private setCount(report:any){
    this.count=report.table.map(r=>r.id)
  }

  private setCountG(report:any){
    this.countG=report.graphic.map(r=>r.id)
  }

  private setTables(report:any){
    this.tables=report.table;
  }

  private setGraphic(report:any){
    this.graphic=report.graphic;
  }

  private setFilters(report:any){
    if(report.filter!=undefined)
      this.filters=report.filter;
  }

  private setReport(report:any){
    this.name=report.module
  }

  public getrName():string{
    return this.name
  }


  public getJerar():string{
    return this.jerar
  }

  public getCount():[]{
    return this.count
  }

  public getCountG():[]{
    return this.countG
  }

  public getTableFind(index:number){
    let table=this.tables[index];
    return table
  }

  public getGraphicFind(index:number){
    let table=this.graphic[index];
    return table
  }

  public getRNameCompleted(find:string){
    let name=this.name+find;
    return name
  }

  public getReportType(){
    return this.reportType;
  }

  public getFilters():[]{
    return this.filters
  }

  public getFiltersTableFind(find:string){
    return this.tables.find(r=>r.id==find).filter
  }



}
