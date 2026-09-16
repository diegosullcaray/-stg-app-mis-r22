import { Component,ChangeDetectorRef, OnDestroy, OnInit} from '@angular/core';
import { TableMHService} from '../../../../services/table.service';
import { ComercialService } from '../../../../../comercial/comercial.service';
import { ReplaySubject, Subject,combineLatest,merge, BehaviorSubject  } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, startWith, switchMap, map, tap } from 'rxjs/operators';
import { ReportT } from '../../../../services/report';
import { crs } from '../../../../../comercial/rda/sectorista/crs-map';
import { SelectService } from '../../../../services/select.service';
//import { RegistrarVisitaService } from '../../../../../services/registrar-visita.service';

/*import { com } from 'app/modules/comercial/com-map.module';
import { FormControl } from '@angular/forms';
import { isNull, isNullOrUndefined } from 'util';
import { FileService } from 'app/core/services/file.service';
import { UserService } from 'app/core/services/user.service';*/
@Component({
  selector: 'app-report-crs-v3',
  templateUrl: './report-crs-v3.component.html',
  styleUrls: ['./report-crs-v3.component.scss']
})
export class ReportCrsV3Component implements OnDestroy,OnInit {
  title_module:string;
  report:ReportT;
  config:string[];
  config_select;
  config_table:TableMHService[]=[];
  config_select_multiple_ajax: SelectService[] = [];
  config_table_ajax: TableMHService;
  page$ = new Subject<{}>();
  filter$=new Subject<{}>();
  filterAjax$ = new Subject<{}>();
  filterF$ = new Subject<{}>();
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

  loadAjax(r) {
    this.page$.next(r);
  }
  
  ngOnInit(){
    
    this.mergeParams();
    this.page$.next({ pagen: 1 });
    //this.rendererFilterT('_02');
    const filters:any=this.report.getFilters();
    filters.forEach(f=>{
      const confS=new SelectService();
      confS.labelName(f.label);
      confS.getVariable(f.variable);
      confS.selectedVAlue(f.selected);
      confS.adddata(f.data);
      this.config_select_multiple.push(confS);
    })
  }

  private rendererFilterT(findT: string) {
    const filters: any = this.report.getFiltersTableFind(findT);
    filters.forEach(f => {
      const confS = new SelectService();
      confS.labelName(f.label);
      confS.getVariable(f.variable);
      confS.selectedVAlue(f.selected);
      confS.adddata(f.data);
      this.config_select_multiple_ajax.push(confS);
    })
    this.renderUltGestion();
  }
  private renderUltGestion(): void {
    let report = 'SEL_EFEC_01';
    this.cs.getRegularData(report, {}).subscribe(
      (data) => {
        let result = data.body['result'];
        const confS = new SelectService();
        confS.labelName('Última Gestión');
        confS.getVariable('resp');
        confS.selectedVAlue('TODO');
        confS.adddata(result.body);
        this.config_select = confS;
        this.cdr.detectChanges()
      })
  }

  mergeParams(){
    combineLatest(this.page$,this.filter$,this.level$)
    .subscribe(([page,filter,level])=>{
      this.router();
      this.config.forEach((find,index)=>{
        let params={...page,...filter,...level}
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
    //this.config_table[add.index]=confT;
    this.config_table_ajax=confT;
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
      //this.config_table[add.index]=confT;
      this.config_table_ajax = confT;
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
