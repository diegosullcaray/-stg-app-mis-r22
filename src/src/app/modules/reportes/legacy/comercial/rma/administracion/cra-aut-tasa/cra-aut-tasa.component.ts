import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { TableMHService } from '../../../../support/services/table.service';
import { ComercialService } from '../../../../comercial/comercial.service';
import { SelectService } from '../../../../support/services/select.service';
import { combineLatest, Subject, Subscription, ReplaySubject } from 'rxjs';
import { ReportT } from '../../../../support/services/report';
import { cra } from '../cra-map';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ModRepService } from 'app/modules/reportes/compartido/servicios/mod-rep.service';
import { isNullOrUndefined } from 'app/core/shared/functions.util';

@Component({
  selector: 'app-cra-aut-tasa',
  templateUrl: './cra-aut-tasa.component.html',
  styleUrls: ['./cra-aut-tasa.component.scss']
})
export class CraAutTasaComponent implements OnInit, OnDestroy {
  report: ReportT;
  activeHier: boolean;
  confHier1: any;

  activeFilters: boolean;

  configFilters: SelectService[];
  config: string[];
  config_table: any = [];
  filter_1$ = new Subject<{}>();
  level$ = new Subject<any>();
  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private cdr: ChangeDetectorRef,
    private cs: ComercialService,
    private antRep: ModRepService,
    private route: ActivatedRoute) { }

  ngOnInit() {
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
          dlg_tlt: "JERARQUIA"
        }
        if (!isNullOrUndefined(cfg.params)) {
          this.confHier1["params_hier"] = cfg.params;
        }
        this.activeHier = true;
      }
    );
  }

  loadFilter(r) {
    this.filter_1$.next(r)
  }

  private combineSelections() {
    combineLatest([this.filter_1$, this.level$])
      .subscribe(([filter, level]) => {
        let lp = { tip_cod: level.tip_cod, cod_rel: level.cod_rel };
        this.config.forEach((find, index) => {
          let params = { ...filter, ...lp }
          this.renderTable(params, { find: find, index: index })
        })
      })
  }

  selectHier(evt: any) {
    let lv: any = evt[0];
    this.level$.next(lv);
  }


  private renderTable(r, add): void {
    const table = this.report.getTableFind(add.index);
    const report = this.report.getRNameCompleted(add.find);
    const confT = new TableMHService(table);
    confT.results(true, true, false);
    this.config_table[add.index] = confT;
    const params = { ...confT.getParamsAdd(), ...r };
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
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}