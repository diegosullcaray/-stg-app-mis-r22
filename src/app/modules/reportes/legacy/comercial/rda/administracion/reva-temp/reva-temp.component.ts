import { Component, OnInit,ChangeDetectorRef } from '@angular/core';

import { Subject, ReplaySubject, combineLatest } from 'rxjs';

import { takeUntil } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';
import { ReportT } from 'app/modules/reportes/legacy/support/services/report';
import { TableMHService } from 'app/modules/reportes/legacy/support/services/table.service';
import { ComercialService } from '../../../comercial.service';
import { UserService } from 'app/system/admin/services/user.service';
import { cra } from '../cra-map';
import { SelectService } from 'app/modules/reportes/legacy/support/services/select.service';

@Component({
  selector: 'app-reva-temp',
  templateUrl: './reva-temp.component.html',
  styleUrls: ['./reva-temp.component.scss']
})
export class RevaTempComponent implements OnInit {
  //isTipo:Number=this.us.get("tip_use");
  isTipo:number;
  report:ReportT;
  config_select;
  config;
  config_table:TableMHService[]=[];
  filter_1$=new Subject<{}>();
  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private cs:ComercialService,
              private us:UserService,
              private cdr:ChangeDetectorRef,
              private route:ActivatedRoute) {
                this.route.data.subscribe(d =>{
                  this.report=new ReportT(cra(d.report));
                  this.config=this.report.getCount();
                }); 
              }

  ngOnInit() {
    this.isTipo=this.us.get("tip_use");
    this.cdr.detectChanges();
    this.mergeParams();
    if(this.isTipo==0 || this.isTipo==2 || this.isTipo==3){
      var name=0;
      if(this.report.getrName()=='GSREVA'){name=11}
      if(this.report.getrName()=='GSREVA1'){name=12}
      if(this.report.getrName()=='GSREVA2'){name=9}
      this.renderJefes(name);
    }else{
      this.load({codrel:this.us.get('cod_bt')});
    }
  }

  private renderJefes(name):void{
    let report='SEL_JEFE_01';
    this.cs.getRegularData(report,{codmod:name}).subscribe(
      (data)=>{
        let result=data.body['result'];
        const confS=new SelectService();
        confS.labelName('Colaborador');
        confS.getVariable('codrel');
        confS.adddata(result.body);
        this.config_select=confS;
        this.cdr.detectChanges()
      })
  }

  private mergeParams(){
    combineLatest(this.filter_1$)
    .subscribe((params)=>{
      this.renderTable(params[0],{find:'01',index:0});
    })
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

  public load(r){
    this.filter_1$.next(r);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  

}
