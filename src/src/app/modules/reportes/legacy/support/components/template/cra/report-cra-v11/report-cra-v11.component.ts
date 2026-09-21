import { Component, ChangeDetectorRef, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';

import { ReplaySubject, Subject, combineLatest, merge, BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, startWith, switchMap, map, tap } from 'rxjs/operators';

import { UntypedFormControl } from '@angular/forms';
import { ReportT } from '../../../../services/report';
import { SelectService } from '../../../../services/select.service';
import { TableMHService } from '../../../../services/table.service';
import { ComercialService } from 'app/modules/reportes/legacy/comercial/comercial.service';
import { UserService } from 'app/system/admin/services/user.service';
import { com } from 'app/modules/reportes/legacy/comercial/com-map.module';
import { isNull, isNullOrUndefined } from 'app/core/shared/functions.util';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { ModRepService } from 'app/modules/reportes/compartido/servicios/mod-rep.service';

@Component({
  selector: 'app-report-cra-v11',
  templateUrl: './report-cra-v11.component.html',
  styleUrls: ['./report-cra-v11.component.scss']
})
export class ReportCraV11Component implements OnInit, OnDestroy {
  report: ReportT;
  activeHier: boolean;
  confHier1: any;

  activeFilters: boolean;

  config_select;
  config_select_multiple: SelectService[] = [];
  config_select_multiple_ajax: SelectService[] = [];
  config_select_group: string = '';
  //config:string[];
  current_hierarchy;
  active_db = false;
  db_values = [7, 6, 5];
  config_table: TableMHService[] = [];
  config_table_ajax: TableMHService;
  filter$ = new Subject<{}>();
  filterFecha$ = new Subject<{}>();
  filterF$ = new Subject<{}>();
  filterAjax$ = new Subject<{}>();
  level$ = new Subject<any>();
  page$ = new Subject<{}>();
  fecCompr$ = new BehaviorSubject({ fcompro: 'TODO' });; //new Subject<{}>();
  //fecCompromiso = String();
  asesor$ = new BehaviorSubject({ nom: '%%' });;
  txt_asesor = new UntypedFormControl();
  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

  //@Output()dateChange:EventEmitter< MatDatepickerInputEvent< any>>;
  events: string[] = [];
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if (event.value === null) {
      this.fecCompr$.next({ fcompro: 'TODO' })
    }
    else {
      this.fecCompr$.next({ fcompro: this.datePipe.transform(`${event.value}`, 'dd/MM/yyyy') });
    }
    //console.log(this.fecCompr$);
  }


  constructor(private cdr: ChangeDetectorRef,
    private cs: ComercialService,
    private us: UserService,
    private antRep: ModRepService,
    //private fs: FileService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,) {
  }

  ngOnInit() {
    this.activeHier = false;
    this.activeFilters = false;

    this.route.data.subscribe(d => {
     
      this.report = new ReportT(com(d.report));
      console.log(this.report)
      this.iniHierarchy();
      this.mergeParams();
      this.rendererSync(); 
      this.rendererFilterG(); 
      this.page$.next({ pagen: 1 });
     
    });


  }

  private iniHierarchy() {
    let cfg = this.antRep.getHierarchyConfig(this.report.getJerar());
    console.log(cfg)
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

  loadFilterAjax(r) {
    this.filterAjax$.next(r)
  }

  private activateDB() {
    /*this.us.getAppPreference("btn_efec").then(x => {
      if (this.db_values.includes(this.current_hierarchy.tip_cod)) {
        this.active_db = true && (x=="true");
        //this.active_db = true && x;
      } else {
        this.active_db = false;
      }
    });*/
    return false;
  }

  selectHier(evt: any) {
    //this.current_hierarchy = r;
    //this.activateDB();
    let lv: any = evt[0];
    this.level$.next(lv);
  }

  loadAjax(r) {
    this.page$.next(r);
  }

  loadF(r) {
    this.filterF$.next(r);
  }
 

  downloadDetail() {
    /*let tc = this.current_hierarchy.tip_cod;
    let cr = this.current_hierarchy.cod_rel;
    this.cs.downloadSimpleStoredReportData({ tip_cod: tc, cod_rel: cr, a_grup: "MONI_EFEC" }).subscribe(data => {
      this.fs.saveAs(data);
    });*/
  }

  mergeParams() {
    combineLatest([this.filter$, this.level$])
      .subscribe(([filter, level]) => {
        let lp = { tip_cod: level.tip_cod, cod_rel: level.cod_rel };
        let params = { ...filter, ...lp } 
        this.renderTable(params, { find: '_01', index: 0 })
        // this.renderTable_1(params, { find: '_03', index: 1 })  
      })
  }

  private renderTable(r, add): void {
    const table = this.report.getTableFind(add.index);
    const report = this.report.getRNameCompleted(add.find);
    const confT = new TableMHService(table);
    confT.results(true, true, false);
    this.config_table[add.index] = confT;
    const params = { ...confT.getParamsAdd(), ...r };
    this.cs.getRegularData(report, params)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          let result = data.body['result'];
          const confT = new TableMHService(table);
          confT.results(true, false, false);
          confT.addColumns(result.headers);
          confT.addELEMENT_DATA(result.body);
          this.config_table[add.index] = confT;
          this.cdr.detectChanges();
        },
        () => {
          const confT = new TableMHService(table);
          confT.results(true, false, true);
          this.config_table[add.index] = confT;
          this.cdr.detectChanges();
        });
  }

  private renderTable_1(r, add): void {
    const table = this.report.getTableFind(add.index);
    const report = this.report.getRNameCompleted(add.find);
    const confT = new TableMHService(table);
    confT.results(true, true, false);
    this.config_table[add.index] = confT;
    const params = { ...confT.getParamsAdd(), ...r };
    console.log(params)
    this.cs.getRegularData(report, params)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          let result = data.body['result'];
          const confT = new TableMHService(table);
          confT.results(true, false, false);
          confT.addColumns(result.headers);
          confT.addELEMENT_DATA(result.body);
          confT.addExt(result.additional);
          this.config_table[add.index] = confT;
          this.cdr.detectChanges();
        },
        () => {
          const confT = new TableMHService(table);
          confT.results(true, false, true);
          this.config_table[add.index] = confT;
          this.cdr.detectChanges();
        });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private rendererSync(): void {
    combineLatest([this.page$, this.level$, this.filter$, this.filterAjax$])
      .pipe(
        takeUntil(this.destroy$),
        map(([page, level, filter, filterA]) => {
          const find = '_03'
          const index = 1
          console.log(find)
          const table = this.report.getTableFind(index);
          const report: string = this.report.getRNameCompleted(find);
          const confT = new TableMHService(table);
          confT.results(true, true, false);
          this.config_table_ajax = confT;
          const params = { ...confT.getParamsAdd(), ...page, ...level, ...filter, ...filterA};
          console.log(params)
          return { params: params, report: report }
        }),
        switchMap((r) => this.cs.getRegularData(r.report, r.params)),
      ).subscribe(data => {
        const table = this.report.getTableFind(1);
        let result = data.body['result'];
        const confT = new TableMHService(table);
        confT.results(true, false, false);
        confT.addColumns(result.headers);
        confT.addELEMENT_DATA(result.body);
        confT.addExt(result.additional)
        this.config_table_ajax = confT;
        this.cdr.detectChanges();
      });

  }
 
  private rendererFilterT(findT: string) {
    console.log(findT)
    const filters: any = this.report.getFiltersTableFind(findT);
   // console.log(filters)
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

  private rendererFilterG() {
    const filters: any = this.report.getFilters();
    filters.forEach(f => {
      const confS = new SelectService();
      confS.labelName(f.label);
      confS.getVariable(f.variable);
      confS.selectedVAlue(f.selected);
      confS.adddata(f.data);
      this.config_select_multiple.push(confS);
      this.activeFilters=true;
    })
  }

}