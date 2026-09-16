import { Component,ChangeDetectorRef, OnInit, OnDestroy} from '@angular/core';
import { ReportT } from 'app/modules/reportes/legacy/support/services/report';
import { SelectService } from 'app/modules/reportes/legacy/support/services/select.service';
import { TableMHService } from 'app/modules/reportes/legacy/support/services/table.service';

import { combineLatest, Subject, Subscription, ReplaySubject } from 'rxjs';

import { takeUntil } from 'rxjs/operators';
import { ComercialService } from '../../../comercial.service';
import { cra } from '../cra-map';

@Component({
  selector: 'app-cra-agenda',
  templateUrl: './cra-agenda.component.html',
  styleUrls: ['./cra-agenda.component.scss']
})
export class CraAgendaComponent implements OnInit {
  report=new ReportT(cra('GSMODAGEN'));
  config_select_group:string=this.report.getJerar();
  config_select_multiple:SelectService[]=[];
  config_select_multiple_2:SelectService[]=[];
  config_select_multiple_3:SelectService[]=[];
  config_select_multiple_4:SelectService[]=[];
  config_select_multiple_5:SelectService[]=[];

  config=this.report.getCount();
  config_table:TableMHService[]=[];
  filter_1$=new Subject<{}>();
  filter_2$=new Subject<{}>();
  filter_3$=new Subject<{}>();
  filter_4$=new Subject<{}>();
  filter_5$=new Subject<{}>();
  level$=new Subject<{}>();
  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private cdr:ChangeDetectorRef,
              private cs:ComercialService) { }

  ngOnInit(){
    this.mergeParams();
    const confS=new SelectService();
    confS.labelName('Cargo');
    confS.getVariable('carg');
    confS.selectedVAlue(0);
    confS.adddata([
      {desc:"TODO",id:0},
      {desc:"Nivel de fuga alto",id:1},
      {desc:"Nivel de fuga medio",id:2},
      {desc:"Nivel de fuga bajo",id:3}
    ]);

    this.config_select_multiple.push(confS);

    const confS_2=new SelectService();
    confS_2.labelName('Cargo');
    confS_2.getVariable('carg');
    confS_2.selectedVAlue('GERENTE REGIONAL');
    confS_2.adddata([
      {desc:"GERENTE REGIONAL",id:"GERENTE REGIONAL"},
      {desc:"JEFE AGROPECUARIO",id:"JEFE AGROPECUARIO"},
      {desc:"JEFE INCLUSION",id:"JEFE INCLUSION"},
      {desc:"COORDINADOR PDM",id:"COORDINADOR PDM"}]);
    this.config_select_multiple_2.push(confS_2);

    const confS_3=new SelectService();
    confS_3.labelName('Estado');
    confS_3.getVariable('state');
    confS_3.selectedVAlue('REVISTE GRAVEDAD');
    confS_3.adddata([
      {desc:"REVISTE GRAVEDAD",id:"REVISTE GRAVEDAD"},
      {desc:"CON SEÑALES DE ALERTA",id:"CON SEÑALES DE ALERTA"}]);
    this.config_select_multiple_3.push(confS_3);

    const confS_4=new SelectService();
    confS_4.labelName('MONTO DESEMBOLSADO');
    confS_4.getVariable('cant');
    confS_4.selectedVAlue('1');
    confS_4.adddata([
      {desc:">=50000",id:"1"},
      {desc:">=30000",id:"2"}]);
    this.config_select_multiple_4.push(confS_4);

    
    const confS_5=new SelectService();
    confS_5.labelName('MONTO DESEMBOLSADO');
    confS_5.getVariable('cant');
    confS_5.selectedVAlue('1');
    confS_5.adddata([
      {desc:">=50000",id:"1"},
      {desc:">=30000",id:"2"}]);
    this.config_select_multiple_5.push(confS_5);


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

  loadFilter_4(r){
    this.filter_4$.next(r)
  }

  loadFilter_5(r){
    this.filter_5$.next(r)
  }
  
  mergeParams(){
    combineLatest(this.filter_1$,this.level$)
    .subscribe(([filter,level])=>{
      //this.config.forEach((find,index)=>{
        let params={...filter,...level}
        this.renderTable(params,{find:'_01',index:0})
        //this.renderTable(params,{find:'_02',index:2})
      //})
    })

    combineLatest(this.filter_1$,this.level$,this.filter_3$)
    .subscribe(([filter,level,state])=>{
        let params={...filter,...level,...state}
        this.renderTable(params,{find:'_02',index:2})
    })

    /*combineLatest(this.filter_2$,this.level$)
    .subscribe(([filter,level])=>{
        let params={...filter,...level}
        this.renderTable(params,{find:'_03',index:1})
    })*/

    combineLatest(this.filter_4$,this.level$)
    .subscribe(([filter,level])=>{
        let params={...filter,...level}
        this.renderTable(params,{find:'_04',index:4})
    })
     combineLatest(this.filter_4$,this.level$,this.filter_5$)
    .subscribe(([filter,level,cant])=>{
        let params={...filter,...level,...cant}
        this.renderTable(params,{find:'_05',index:5})
    }) /* 
    combineLatest(this.filter_5$,this.level$)
    .subscribe(([filter,level])=>{
        let params={...filter,...level}
        this.renderTable(params,{find:'_05',index:5})
    })  */
  }

  load(r){
    this.level$.next(r)
  }

  
  private renderTable(r,add):void{
    const table=this.report.getTableFind(add.index);
    const report=this.report.getRNameCompleted(add.find);
    const confT= new TableMHService(table);
    confT.results(true,true,false);
    this.config_table[add.index]=confT;
    const params={...confT.getParamsAdd(),...r};
    this.cs.getRegularData(report,params)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
    (data)=>{
      let result=data.body['result'];
      const confT=new TableMHService(table);
      confT.results(true,false,false);
      confT.addColumns(result.headers);
      confT.addELEMENT_DATA(result.body);
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
