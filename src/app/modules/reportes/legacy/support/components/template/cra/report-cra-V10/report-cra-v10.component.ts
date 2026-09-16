import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';

import { ReplaySubject, Subject, combineLatest, merge, BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, startWith, switchMap, map, tap } from 'rxjs/operators';

import { FormControl } from '@angular/forms';
import { ReportT } from '../../../../services/report';
import { SelectService } from '../../../../services/select.service';
import { TableMHService } from '../../../../services/table.service';
import { ComercialService } from 'app/modules/reportes/legacy/comercial/comercial.service';
import { UserService } from 'app/system/admin/services/user.service';
import { cra } from 'app/modules/reportes/legacy/comercial/rda/administracion/cra-map';
import { isNull, isNullOrUndefined } from 'app/core/shared/functions.util';
import { ModRepService } from 'app/modules/reportes/compartido/servicios/mod-rep.service';


@Component({
  selector: 'app-report-cra-v10',
  templateUrl: './report-cra-v10.component.html',
  styleUrls: ['./report-cra-v10.component.scss']
})
export class ReportCraV10Component implements OnInit, OnDestroy {
  report: ReportT;

  activeHier: boolean;
  confHier1: any;

  activeFilters: boolean;

  configFilters: SelectService[];

  config_table_ajax: TableMHService;

  filter$ = new Subject<any>();
  level$ = new Subject<any>();
  page$ = new Subject<any>();
 
  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private cdr: ChangeDetectorRef,
    private cs: ComercialService,
    private us: UserService,
    private antRep: ModRepService,
    private route: ActivatedRoute) {
     
  }

  ngOnInit() {
    this.activeHier = false;
    this.activeFilters = false;
    this.configFilters = [];
    this.route.data.subscribe(d => {
      this.report = new ReportT(cra(d.report));
      this.processFilters();
      this.combineSelections();
      this.page$.next({ pagen: 1 });
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

  loadFilter(r) {
    this.filter$.next(r)
  }

  selectHier(evt: any) {
    let lv: any = evt[0];
    this.level$.next(lv);
  }

  loadAjax(r) {
    this.page$.next(r);
  }

  private combineSelections() {
    combineLatest([this.page$,this.filter$, this.level$]).subscribe(([page,filter, level]) => {
      let lp = { tip_cod: level.tip_cod, cod_rel: level.cod_rel };
      let params={...page,...filter,...level}
      console.log(params)
      this.renderTable(params,{find:'_01',index:0})
    });
  }

  private renderTable(r,add):void{
    const table=this.report.getTableFind(add.index);
    const report=this.report.getRNameCompleted(add.find);
    const confT= new TableMHService(table);
    confT.results(true,true,false);
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
      this.config_table_ajax=confT;
      this.cdr.detectChanges();
    });
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  





}