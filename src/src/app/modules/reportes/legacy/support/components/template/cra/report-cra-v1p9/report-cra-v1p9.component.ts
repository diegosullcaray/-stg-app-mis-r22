import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';

import { BehaviorSubject, ReplaySubject, Subject, combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { ReportT } from '../../../../services/report';
import { SelectService } from '../../../../services/select.service';
import { GraphicService } from '../../../../services/graphic.service';
import { TableMHService } from '../../../../services/table.service';
import { ComercialService } from '../../../../../comercial/comercial.service';
import { cra } from '../../../../../comercial/rda/administracion/cra-map';
import { ModRepService } from 'app/modules/reportes/compartido/servicios/mod-rep.service';
import { isNull, isNullOrUndefined } from 'app/core/shared/functions.util';
import { UntypedFormControl } from '@angular/forms'; 
@Component({
  selector: 'app-report-cra-v1p9',
  templateUrl: './report-cra-v1p9.component.html',
  styleUrls: ['./report-cra-v1p9.component.scss']
})
export class ReportCraV1p9Component implements OnInit, OnDestroy {
  report: ReportT;

  activeHier: boolean;
  confHier1: any;

  activeFilters: boolean;
  config_table_ajax: TableMHService;
  configFilters: SelectService[];

  configG: string[];
  configT: string[];
  config_graphic: any;
  config_table: TableMHService[] = [];
  filter$ = new Subject<any>();
  level$ = new Subject<any>();
  asesor$ = new BehaviorSubject({ nom: '%%' });;
  txt_asesor = new UntypedFormControl();
  filterAjax$ = new Subject<{}>(); 
  page$ = new Subject<{}>();
  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private cdr: ChangeDetectorRef,
    private cs: ComercialService,
    private antRep: ModRepService,
    private route: ActivatedRoute/*,private registro: RegistrarVisitaService*/) {

    //registro.registrar(this.route.snapshot.url.join(''));
  }

  ngOnInit() {
    this.activeHier = false;
    this.activeFilters = false;
    this.configFilters = [];
    this.route.data.subscribe(d => {
      this.report = new ReportT(cra(d.report));
      this.configT = this.report.getCount();
      this.configG = this.report.getCountG();
      this.processFilters();
      this.combineSelections();
      
      //this.rendererSync();
      this.page$.next({ pagen: 1 });
      this.iniHierarchy();
    });
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

  private combineSelections() {
    combineLatest([this.filter$, this.level$]).subscribe(([filter, level]) => {
      let lp = { tip_cod: level.tip_cod, cod_rel: level.cod_rel };
      let params = { ...filter, ...lp };
      this.configT.forEach((find, index) => {
        this.renderTable(params, { find: find, index: index });
      });
      this.renderTable(params, { find: '_01', index: 0 })
      this.renderTable_1(params, { find: '_02', index: 1 })

    });
  }

  loadFilter(r) {
    this.filter$.next(r)
  }
  loadAsesor() {
    if (!isNull(this.txt_asesor.value))
      this.asesor$.next({ nom: '%' + this.txt_asesor.value + '%' });
  }
  /*loadAjax(r) {
    this.page$.next(r);
  }*/
  loadFilterAjax(r) {
    this.filterAjax$.next(r)
  }

  selectHier(evt: any) {
    let lv: any = evt[0];
    this.level$.next(lv);
  }

  private renderTable(r, add): void {
    //combineLatest([this.asesor$])
    const table = this.report.getTableFind(add.index);
    const report = this.report.getRNameCompleted(add.find);
    const confT = new TableMHService(table);
    confT.results(true, true, false);
    this.config_table[add.index] = confT;
    //const params = { ...confT.getParamsAdd(), ...r};
    const params={...confT.getParamsAdd(),...r};
    console.log(params);
    const reportType = this.report.getReportType();
    this.cs.getMixData(report, reportType, params)
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

  private renderTable_1(r, add): void {
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
/*
  private rendererSync(): void {
    combineLatest([this.page$, this.level$, this.filter$, this.filterAjax$, this.asesor$])
      .pipe(
        takeUntil(this.destroy$),
        map(([page, level, filter, filterA, asesor]) => {
          const find = '_03'
          const index = 1
          const table = this.report.getTableFind(index);
          const report: string = this.report.getRNameCompleted(find);
          const confT = new TableMHService(table);
          confT.results(true, true, false);
          this.config_table_ajax = confT;
          const params = { ...confT.getParamsAdd(), ...page, ...level, ...filter, ...filterA, ...asesor };
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
  */

  private renderGrafico(r, add): void {
    const graphic = this.report.getGraphicFind(add.index);
    const report = this.report.getRNameCompleted(add.find);
    /*const confG= new GraphicService(graphic);
    confG.results(true,true,false);
    this.config_graphic=[confG,confG,confG,confG,confG,confG,confG,confG];*/
    const params = { ...r };
    this.cs.getGraphicData(report, params)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          let result = data.body['result'];
          let global: GraphicService[] = [];
          this.config_graphic = [];
          result.forEach((gf) => {
            const confG = new GraphicService(graphic);
            confG.results(true, false, false);
            confG.setSerie(gf.series);
            confG.setCategorie(gf.categories[0].columnDef);
            confG.setTitle(gf.graphName);
            confG.setsubTitle(gf.graphSubName);
            confG.setTitleyAxis(gf.getUnitGraph);
            global.push(confG);
          })
          this.config_graphic = global;
          this.cdr.detectChanges();
        },
        () => {
          /*const confG= new GraphicService();
          confG.results(true,false,true);
          this.config_graphic=[confG,confG,confG,confG,confG,confG,confG,confG];*/
          this.cdr.detectChanges();
        });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}