import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, ReplaySubject, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

import { isNull, isNullOrUndefined } from 'app/core/shared/functions.util';
import { ComercialService } from 'app/modules/reportes/legacy/comercial/comercial.service';
import { com } from 'app/modules/reportes/legacy/comercial/com-map.module';
import { ModRepService } from 'app/modules/reportes/compartido/servicios/mod-rep.service';
import { ReportT } from '../../../../services/report';
import { SelectService } from '../../../../services/select.service';
import { TableMHService } from '../../../../services/table.service';
import { RegularResult, Table2Header, toTable2Headers } from './report-cra-v4.utils';

@Component({
  selector: 'app-report-cra-v4',
  templateUrl: './report-cra-v4.component.html',
  styleUrls: ['./report-cra-v4.component.scss']
})
export class ReportCraV4Component implements OnInit, OnDestroy {
  report: ReportT;
  activeHier = false;
  confHier1: any;
  activeFilters = false;

  config_select: SelectService;
  config_select_multiple: SelectService[] = [];
  config_select_multiple_ajax: SelectService[] = [];
  config_table: TableMHService[] = [];

  detailRows: any[] = [];
  detailHeaders: Table2Header[] = [];
  detailTotal = 0;
  detailPageSize = 30;
  detailLoading = false;
  detailError = false;
  detailAnnotation: any = {};
  detailPageIndex = 0;
  readonly Math = Math;

  readonly detailTableOptions = {
    style: {
      'font-size': '12px'
    },
    header: {
      cellStyle: {
        'min-width': '0',
        'padding': '3px 4px',
        'font-size': '11px',
        'line-height': '13px',
        'white-space': 'normal',
        'text-align': 'center',
        'vertical-align': 'middle'
      }
    },
    body: {
      loading: { enabled: false, rows: 4 },
      hover: { enabled: true },
      cellStyle: {
        'height': '20px',
        'padding': '2px 4px',
        'line-height': '16px',
        'text-align': 'left',
        'vertical-align': 'middle'
      }
    }
  };

  private filter$ = new Subject<{}>();
  private filterAjax$ = new Subject<{}>();
  private level$ = new Subject<any>();
  private page$ = new Subject<{}>();
  private filterF$ = new Subject<{}>();
  private fecCompr$ = new BehaviorSubject({ fcompro: 'TODO' });
  private asesor$ = new BehaviorSubject({ nom: '%%' });
  private destroy$ = new ReplaySubject<boolean>(1);

  txt_asesor = new UntypedFormControl();

  constructor(
    private cdr: ChangeDetectorRef,
    private cs: ComercialService,
    private antRep: ModRepService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe(d => {
      this.report = new ReportT(com(d.report));
      this.mergeParams();
      this.rendererSync();
      this.rendererFilterG();
      this.rendererFilterT('_02');
      this.page$.next({ pagen: 1 });
      this.iniHierarchy();
    });
  }

  private iniHierarchy(): void {
    const cfg = this.antRep.getHierarchyConfig(this.report.getJerar());
    this.antRep.getBaseHierarchy(cfg.code)
      .pipe(takeUntil(this.destroy$))
      .subscribe(x => {
        const bh: any = x.body.base_hierarchy;
        this.confHier1 = {
          roots: bh,
          cod_hier: cfg.code,
          max_lvl: cfg.max_lvl,
          dlg_tlt: 'JERARQUIA UNIDAD'
        };
        if (!isNullOrUndefined(cfg.params)) {
          this.confHier1.params_hier = cfg.params;
        }
        this.activeHier = true;
      });
  }

  loadFilter(filter: {}): void {
    this.filter$.next(filter);
  }

  loadFilterAjax(filter: {}): void {
    this.filterAjax$.next(filter);
  }

  selectHier(evt: any[]): void {
    this.level$.next(evt[0]);
  }

  loadF(filter: {}): void {
    this.filterF$.next(filter);
  }

  addEvent(_type: string, event: MatDatepickerInputEvent<Date>): void {
    const value = event.value
      ? this.datePipe.transform(event.value, 'dd/MM/yyyy')
      : 'TODO';
    this.fecCompr$.next({ fcompro: value });
  }

  loadAsesor(): void {
    if (!isNull(this.txt_asesor.value)) {
      this.asesor$.next({ nom: `%${this.txt_asesor.value}%` });
    }
  }

  changeDetailPage(event: PageEvent): void {
    this.detailPageIndex = event.pageIndex;
    this.page$.next({ pagen: this.detailPageIndex + 1 });
  }

  private mergeParams(): void {
    combineLatest([this.filter$, this.level$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([filter, level]) => {
        const params = { ...filter, tip_cod: level.tip_cod, cod_rel: level.cod_rel };
        this.renderTable(params, { find: '_01', index: 0 });
        this.renderTableWithAdditional(params, { find: '_03', index: 2 });
        this.renderTableWithAdditional(params, { find: '_03', index: 3 });
      });
  }

  private renderTable(paramsValue: {}, add: { find: string; index: number }): void {
    const table = this.report.getTableFind(add.index);
    const report = this.report.getRNameCompleted(add.find);
    const loading = new TableMHService(table);
    loading.results(true, true, false);
    this.config_table[add.index] = loading;
    const params = { ...loading.getParamsAdd(), ...paramsValue };

    this.cs.getRegularData(report, params).pipe(takeUntil(this.destroy$)).subscribe(
      data => {
        const result = data.body.result;
        const config = new TableMHService(table);
        config.results(true, false, false);
        config.addColumns(result.headers);
        config.addELEMENT_DATA(result.body);
        this.config_table[add.index] = config;
        this.cdr.detectChanges();
      },
      () => this.setLegacyTableError(table, add.index)
    );
  }

  private renderTableWithAdditional(paramsValue: {}, add: { find: string; index: number }): void {
    const table = this.report.getTableFind(add.index);
    const report = this.report.getRNameCompleted(add.find);
    const loading = new TableMHService(table);
    loading.results(true, true, false);
    this.config_table[add.index] = loading;
    const params = { ...loading.getParamsAdd(), ...paramsValue };

    this.cs.getRegularData(report, params).pipe(takeUntil(this.destroy$)).subscribe(
      data => {
        const result = data.body.result;
        const config = new TableMHService(table);
        config.results(true, false, false);
        config.addColumns(result.headers);
        config.addELEMENT_DATA(result.body);
        config.addExt(result.additional);
        this.config_table[add.index] = config;
        this.cdr.detectChanges();
      },
      () => this.setLegacyTableError(table, add.index)
    );
  }

  private setLegacyTableError(table: any, index: number): void {
    const config = new TableMHService(table);
    config.results(true, false, true);
    this.config_table[index] = config;
    this.cdr.detectChanges();
  }

  private rendererSync(): void {
    combineLatest([
      this.page$,
      this.level$,
      this.filter$,
      this.filterAjax$,
      this.asesor$,
      this.filterF$,
      this.fecCompr$
    ]).pipe(
      takeUntil(this.destroy$),
      map(([page, level, filter, filterAjax, asesor, filterF, fecCompr]) => {
        const table = this.report.getTableFind(1);
        const tableConfig = new TableMHService(table);
        this.detailLoading = true;
        this.detailError = false;
        this.detailRows = [];
        this.detailAnnotation = table.content || {};
        this.detailPageSize = table.theme && table.theme.paginator_size
          ? table.theme.paginator_size
          : 30;
        const params = {
          ...tableConfig.getParamsAdd(),
          ...level,
          ...filter,
          ...filterAjax,
          ...asesor,
          ...filterF,
          ...fecCompr,
          ...page
        };
        return { params, report: this.report.getRNameCompleted('_02') };
      }),
      switchMap(request => this.cs.getRegularData(request.report, request.params))
    ).subscribe(
      data => this.setDetailResult(data.body.result as RegularResult),
      () => {
        this.detailLoading = false;
        this.detailError = true;
        this.detailRows = [];
        this.cdr.detectChanges();
      }
    );
  }

  private setDetailResult(result: RegularResult): void {
    this.detailRows = Array.isArray(result.body) ? result.body : [];
    this.detailHeaders = toTable2Headers(result.headers || [], this.detailRows);
    this.detailTotal = result.additional && result.additional.Total
      ? result.additional.Total
      : this.detailRows.length;
    this.detailLoading = false;
    this.detailError = false;
    this.cdr.detectChanges();
  }

  private rendererFilterG(): void {
    const filters: any[] = this.report.getFilters();
    filters.forEach(filter => {
      const config = new SelectService();
      config.labelName(filter.label);
      config.getVariable(filter.variable);
      config.selectedVAlue(filter.selected);
      config.adddata(filter.data);
      this.config_select_multiple.push(config);
      this.activeFilters = true;
    });
  }

  private rendererFilterT(findTable: string): void {
    const filters: any[] = this.report.getFiltersTableFind(findTable);
    filters.forEach(filter => {
      const config = new SelectService();
      config.labelName(filter.label);
      config.getVariable(filter.variable);
      config.selectedVAlue(filter.selected);
      config.adddata(filter.data);
      this.config_select_multiple_ajax.push(config);
    });
    this.renderUltGestion();
  }

  private renderUltGestion(): void {
    this.cs.getRegularData('SEL_EFEC_01', {})
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        const config = new SelectService();
        config.labelName('Última Gestión');
        config.getVariable('resp');
        config.selectedVAlue('TODO');
        config.adddata(data.body.result.body);
        this.config_select = config;
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
