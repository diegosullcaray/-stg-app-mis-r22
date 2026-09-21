import { Component, ChangeDetectorRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { ReplaySubject, Subject, combineLatest, BehaviorSubject } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { takeUntil, map, switchMap } from 'rxjs/operators';
import { ReportT } from '../../../../services/report';
import { SelectService } from '../../../../services/select.service';
import { GraphicService } from '../../../../services/graphic.service';
import { TableMHService } from '../../../../services/table.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ComercialService } from 'app/modules/reportes/legacy/comercial/comercial.service';
import { cra } from 'app/modules/reportes/legacy/comercial/rda/administracion/cra-map';
import { isNull, isNullOrUndefined } from 'app/core/shared/functions.util';
import { ModRepService } from 'app/modules/reportes/compartido/servicios/mod-rep.service';

@Component({
  selector: 'app-report-cra-v5',
  templateUrl: './report-cra-v5.component.html',
  styleUrls: ['./report-cra-v5.component.scss']
})
export class ReportCraV5Component implements OnInit, OnDestroy {
  report: ReportT;
  activeHier: boolean;
  confHier1: any;

  activeFilters: boolean;

  configFilters: SelectService[];

  configG: string[];
  configT: string[];
  datasource = new MatTableDataSource();
  config_graphic: any;
  config_table: TableMHService[] = [];

  filter$ = new Subject<{}>();
  level$ = new Subject<any>();

  config: any;
  value3: string;
  cliente$ = new BehaviorSubject({ nom: '%%' });;
  collection = [];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  resultCount: string[];
  numberPagination: Number;
  page$ = new Subject<{}>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  vx: number;
  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private cdr: ChangeDetectorRef,
    private cs: ComercialService,
    private antRep: ModRepService,
    private route: ActivatedRoute) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 2,
      totalItems: 0
    };
    route.queryParams.subscribe(
      params => this.config.currentPage = params['page'] ? params['page'] : 1);
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

  paginate(event) {
    //  event.first = Index of the first record
    //  event.rows = Number of rows to display in new page
    //  event.page = Index of the new page
    //  event.pageCount = Total number of pages
    this.numberPagination = event.first / event.rows + 1
    // console.log(event.first/event.rows + 1)

    const filters: any = this.report.getFilters();

    this.page$.next({ pagen: this.numberPagination });
  }

  ngAfterViewInit() {
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
    /*this.render();*/
  }

  selectHier(evt: any) {
    let lv: any = evt[0];
    this.level$.next(lv);
  }

  loadAsesor() {
    if (!isNull(this.value3))
      this.cliente$.next({ nom: '%' + this.value3 + '%' });
  }

  private combineSelections() {
    combineLatest([this.page$, this.filter$, this.level$, this.cliente$])
      .subscribe(([page, filter, level, cliente]) => {
        this.configG.forEach((find, index) => {
          let lp = { tip_cod: level.tip_cod, cod_rel: level.cod_rel };
          let params = { ...filter, ...lp };
          this.renderGrafico(params, { find: find, index: index })
        })
        this.configT.forEach((find, index) => {
          let lp = { tip_cod: level.tip_cod, cod_rel: level.cod_rel };
          let params = { ...page, ...filter, ...lp, ...cliente }
          this.renderTable(params, { find: find, index: index })
        })
      })
  }

  private renderTable(r, add): void {
    const table = this.report.getTableFind(add.index);
    const report = this.report.getRNameCompleted(add.find);
    //console.log(this.report);
    const confT = new TableMHService(table);
    confT.results(true, true, false);
    this.config_table[add.index] = confT;
    const params = { ...confT.getParamsAdd(), ...r };
    const reportType = this.report.getReportType();
    this.cs.getMixData(report, reportType, params)
      .pipe(takeUntil(this.destroy$)
      )
      .subscribe(
        (data) => {
          let result = data.body['result'];

          this.resultCount = result.body;
          this.collection.push(data.body['result'][0])
          //result.additional['body'];//result.body//[].concat.apply([],result.body).length
          //console.log(result.additional['Total'])
          const confT = new TableMHService(table);
          confT.results(true, false, false);
          confT.addColumns(result.headers);
          confT.addELEMENT_DATA(result.body);
          confT.addExt(result.additional);
          this.config_table[add.index] = confT;
          this.vx = result.additional.Total;
          this.cdr.detectChanges();
        },
        () => {
          const confT = new TableMHService(table);
          confT.results(true, false, true);
          this.config_table[add.index] = confT;

          this.cdr.detectChanges();
        });
  }

  private renderGrafico(r, add): void {
    const graphic = this.report.getGraphicFind(add.index);
    const report = this.report.getRNameCompleted(add.find);
    const params = { ...r };
    this.cs.getGraphicData(report, params)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          let result = data.body['result'];
          let global: GraphicService[] = [];
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
          this.cdr.detectChanges();
        });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}