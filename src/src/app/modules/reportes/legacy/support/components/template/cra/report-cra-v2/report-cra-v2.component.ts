import { Component,ChangeDetectorRef, OnDestroy, OnInit} from '@angular/core';
import { TableMHService} from '../../../../services/table.service';
import { ComercialService } from '../../../../../comercial/comercial.service';
import { ReplaySubject, Subject,combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { cra } from '../../../../../comercial/rma/administracion/cra-map';
import { ReportT } from '../../../../services/report';
import { SelectService } from '../../../../services/select.service';
import { ModRepService } from 'app/modules/reportes/compartido/servicios/mod-rep.service';
import { isNullOrUndefined } from 'app/core/shared/functions.util';
//import { RegistrarVisitaService } from '../../../../../services/registrar-visita.service';

@Component({
  selector: 'app-report-cra-v2',
  templateUrl: './report-cra-v2.component.html',
  styleUrls: ['./report-cra-v2.component.scss']
})
export class ReportCraV2Component implements  OnInit,OnDestroy {
  report: ReportT;
  activeHier: boolean;
  confHier1: any;

  activeFilters: boolean;

  configFilters: SelectService[];

  config:string[];
  config_table:TableMHService[]=[];
  filter$=new Subject<{}>();
  level$=new Subject<any>();
  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private cdr:ChangeDetectorRef,
              private cs:ComercialService,
              private antRep: ModRepService,
              private route:ActivatedRoute/*,private registro: RegistrarVisitaService*/) {
    
  }

  ngOnInit(){
    this.activeHier = false;
    this.activeFilters = false;
    this.configFilters = [];
    this.route.data.subscribe(d => {
      this.report = new ReportT(cra(d.report));
      this.config = this.report.getCount();
      this.processFilters();
      this.combineSelections();
      this.iniHierarchy();
    });
  }

  private processFilters() {
    const filters: any = this.report.getFilters();
    filters.forEach(f => {
      const confS = new SelectService();
      confS.labelName(f.label);
      confS.getVariable(f.variable);
      confS.selectedVAlue(f.selected);
      confS.adddata(f.data);
      this.configFilters.push(confS);
    });
    this.activeFilters = true;
  }

  private iniHierarchy() {
    let cfg = this.antRep.getHierarchyConfig(this.report.getJerar());
    this.antRep.getBaseHierarchy(cfg.code).subscribe(
      x => {
        let bh: any = x.body.base_hierarchy;
        this.confHier1 = {
          roots: bh,
          /*r_tip_cod: bh.tip_cod,
          r_cod_rel: bh.cod_rel,
          r_lvl_hier: bh.lvl,*/
          cod_hier: cfg.code,
          //params_hier:{key:"fec",val:currentDate},
          max_lvl: cfg.max_lvl,
          dlg_tlt: "JERARQUIA UNIDAD"
        }
        if (!isNullOrUndefined(cfg.params)) {
          this.confHier1["params_hier"] = cfg.params;
        }
        this.activeHier = true;
      }
    );
  }

  loadFilter(r){
    this.filter$.next(r)
  }

  selectHier(evt: any) {
    let lv: any = evt[0];
    this.level$.next(lv);
  }

  private combineSelections() {
    combineLatest([this.filter$,this.level$])
    .subscribe(([filter,level])=>{
      let lp = { tip_cod: level.tip_cod, cod_rel: level.cod_rel };
      this.config.forEach((find,index)=>{
        let params={...filter,...lp}
        this.renderTable(params,{find:find,index:index})
      })
    })
  }

  private renderTable(r,add):void{
    const table=this.report.getTableFind(add.index);
    const report=this.report.getRNameCompleted(add.find);
    const confT= new TableMHService(table);
    confT.results(true,true,false);
    this.config_table[add.index]=confT;
    const params={...confT.getParamsAdd(),...r};
    console.log(params)
    this.cs.getReportData(report,params)
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
