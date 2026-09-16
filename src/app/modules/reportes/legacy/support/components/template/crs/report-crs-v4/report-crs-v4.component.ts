import { Component,ChangeDetectorRef, OnDestroy, OnInit} from '@angular/core';
import { TableMHService} from '../../../../services/table.service';
import { ComercialService } from '../../../../../comercial/comercial.service';
import { ReplaySubject, Subject,combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ReportT } from '../../../../services/report';
import { crs } from '../../../../../../legacy/comercial/rda/sectorista/crs-map';
import { SelectService } from '../../../../../support/services/select.service';
//import { RegistrarVisitaService } from '../../../../../services/registrar-visita.service';

@Component({
  selector: 'app-report-crs-v4',
  templateUrl: './report-crs-v4.component.html',
  styleUrls: ['./report-crs-v4.component.scss']
})
export class ReportCrsV4Component implements OnDestroy,OnInit {
  title_module:string;
  report:ReportT;
  config:string[];
  config_table:TableMHService[]=[];
  filter$=new Subject<{}>();
  level$=new Subject<{}>();
  config_select_multiple:SelectService[]=[];
  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private cdr:ChangeDetectorRef,
              private cs:ComercialService,
              private route:ActivatedRoute/*,private registro: RegistrarVisitaService*/) {
                this.router();
                
              }

  load(r){
    
    this.level$.next(r)
    //this.config.forEach((find,index)=>this.renderTable(r,{find:find,index:index}))
  }

  loadFilter(r){
    this.filter$.next(r)
  }

  ngOnInit(){
    this.mergeParams();
    const filters:any=this.report.getFilters();
    filters.forEach(f=>{
      const confS=new SelectService();
      confS.labelName(f.label);
      confS.getVariable(f.variable);
      //confS.disabledVAlue(f.disabled);
      confS.selectedVAlue(f.selected);
      confS.adddata(f.data);
      
      this.config_select_multiple.push(confS);
    })
  }

  mergeParams(){
    combineLatest(this.filter$,this.level$)
    .subscribe(([filter,level])=>{
      this.router();
      this.config.forEach((find,index)=>{
        let params={...filter,...level}
        this.renderTable(params,{find:find,index:index})
      })
    })
  }

  private router():void{
    this.route.data.subscribe(d =>{
      this.report=new ReportT(crs(d.report));
      this.title_module=d.title;
      this.config=this.report.getCount();
    }); 
  }

  private renderTable(r,add):void{
    const table=this.report.getTableFind(add.index);
    const report=this.report.getRNameCompleted(add.find);
    const confT= new TableMHService(table);
    confT.results(true,true,false);
    this.config_table[add.index]=confT;
    const params={...confT.getParamsAdd(),...r}
    console.log(params);
    const reportType=this.report.getReportType();
    this.cs.getMixData(report,reportType,params)
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
