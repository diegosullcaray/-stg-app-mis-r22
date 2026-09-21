import { Component,ChangeDetectorRef, OnInit, OnDestroy} from '@angular/core';
import { ReportT } from 'app/modules/reportes/legacy/support/services/report';
import { SelectService } from 'app/modules/reportes/legacy/support/services/select.service';
import { TableMHService } from 'app/modules/reportes/legacy/support/services/table.service';

import { combineLatest, Subject, Subscription, ReplaySubject } from 'rxjs';

import { takeUntil } from 'rxjs/operators';
import { ComercialService } from '../../../comercial.service';
import { cra } from '../cra-map';

@Component({
  selector: 'app-cra-cam-imp',
  templateUrl: './cra-cam-imp.component.html',
  styleUrls: ['./cra-cam-imp.component.scss']
})
export class CraCamImpComponent implements OnInit {
  report=new ReportT(cra('GRESCAMIMP'));
  config_select_group:string=this.report.getJerar();
  config_select_multiple:SelectService[]=[];
  config=this.report.getCount();
  config_table=new TableMHService();
  config_tableT=new TableMHService();
  filter_1$=new Subject<{}>();
  level$=new Subject<{}>();
  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private cs:ComercialService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  load(r){
    this.renderTable(r,{find:'_01',index:0});
    //this.renderTableTop(r,{find:'_02',index:1});
  }

  private renderTable(r,add):void{
    const table=this.report.getTableFind(add.index);
    const report=this.report.getRNameCompleted(add.find);
    const confT= new TableMHService(table);
    confT.results(true,true,false);
    this.config_table=confT;
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
      this.config_table=confT;
      this.cdr.detectChanges();
    },
    ()=>{
      const confT= new TableMHService(table);
      confT.results(true,false,true);
      this.config_table=confT;
      this.cdr.detectChanges();
    });
  }

  private renderTableTop(r,add):void{
    const table=this.report.getTableFind(add.index);
    const report=this.report.getRNameCompleted(add.find);
    const confT= new TableMHService(table);
    confT.results(true,true,false);
    this.config_tableT=confT;
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
      this.config_tableT=confT;
      this.cdr.detectChanges();
    },
    ()=>{
      const confT= new TableMHService(table);
      confT.results(true,false,true);
      this.config_tableT=confT;
      this.cdr.detectChanges();
    });
  }

}
