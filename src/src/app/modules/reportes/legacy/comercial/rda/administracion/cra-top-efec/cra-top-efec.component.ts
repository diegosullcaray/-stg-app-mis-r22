import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { ReportT } from 'app/modules/reportes/legacy/support/services/report';
import { TableMHService } from 'app/modules/reportes/legacy/support/services/table.service';
import { ReplaySubject, Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ComercialService } from '../../../comercial.service';
import { cra } from '../cra-map';
import { SelectService } from 'app/modules/reportes/legacy/support/services/select.service';

@Component({
  selector: 'app-cra-top-efec',
  templateUrl: './cra-top-efec.component.html',
  styleUrls: ['./cra-top-efec.component.scss']
})
export class CraTopEfecComponent implements OnInit {
  report=new ReportT(cra('RSRTOPV'));
  config_select_group:string=this.report.getJerar();
  config=this.report.getCount();
  config_table:TableMHService[]=[];
  level$=new Subject<{}>();
  filter_1$=new Subject<{}>();
  filter_2$=new Subject<{}>();
  filter_3$=new Subject<{}>();
  config_select_multiple:SelectService[]=[];
  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private cdr:ChangeDetectorRef,
              private cs:ComercialService) { }

  ngOnInit() {
    this.mergeParams();
    this.config.forEach((find,index)=>{
      this.cdr.detectChanges();
      this.renderTable({},{find:find,index:index})
    })
  }

  load(r){
    this.level$.next(r)
  }

  loadFilter(r){
    this.filter_1$.next(r)
  }
  loadFilter_2(r){
    this.filter_2$.next(r)
  }

  loadFilter_3(r){
    this.filter_3$.next(r)
  }

  mergeParams(){
    combineLatest(this.filter_1$,this.level$)
    .subscribe(([filter,level])=>{
      //this.config.forEach((find,index)=>{
        let params={...filter,...level}
        //console.log(params);
        this.renderTable(params,{find:'01',index:0})
        //this.renderTable(params,{find:'_02',index:2})
      //})
    })

    combineLatest(this.filter_1$,this.level$)
    .subscribe(([filter,level])=>{
        let params={...filter,...level}
        this.renderTable(params,{find:'01',index:1})
    })
 
    combineLatest(this.filter_1$,this.level$)
    .subscribe(([filter,level])=>{
        let params={...filter,...level}
        this.renderTable(params,{find:'01',index:2})
    })
  }

  private renderTable(r,add):void{
    const table=this.report.getTableFind(add.index);
    const report=this.report.getRNameCompleted(add.find);
    const confT= new TableMHService(table);
    confT.results(true,true,false);
    this.config_table[add.index]=confT;
    const params={...confT.getParamsAdd(),...r};
    console.log(params);
    this.cs.getRegularData(report,params)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
    (data)=>{
      let result=data.body['result'];
      const confT=new TableMHService(table);
      confT.results(true,false,false);
      confT.addColumns(result.headers);
      confT.addELEMENT_DATA(result.body);
      confT.addExt(result.additional);
      this.config_table[add.index]=confT;
      this.cdr.detectChanges();
    },
    ()=>{
      const confT= new TableMHService(table);
      confT.results(true,false,true);
      this.config_table[add.index]=confT;
      this.cdr.detectChanges();
    });
  }

  
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
