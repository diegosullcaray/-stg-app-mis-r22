import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';

import { ReplaySubject, Subject, combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil} from 'rxjs/operators';

import { ReportT } from '../../../../services/report';
import { SelectService } from '../../../../services/select.service';
import { TableMHService } from '../../../../services/table.service';
import { ComercialService } from 'app/modules/reportes/legacy/comercial/comercial.service';
import { UserService } from 'app/system/admin/services/user.service';
import { com } from 'app/modules/reportes/legacy/comercial/com-map.module';
import { isNullOrUndefined } from 'app/core/shared/functions.util';
import { ModRepService } from 'app/modules/reportes/compartido/servicios/mod-rep.service';


@Component({
  selector: 'app-report-cra-v7',
  templateUrl: './report-cra-v7.component.html',
  styleUrls: ['./report-cra-v7.component.scss']
})
export class ReportCraV7Component implements OnInit, OnDestroy {
  report: ReportT;
  activeHier: boolean;
  confHier1: any;

  activeFilters: boolean;

  configFilters: SelectService[];

  config_select_group: string = '';
 
  config_table: TableMHService[] = [];
 
  filter$ = new Subject<any>();
  level$ = new Subject<any>();

  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private cdr: ChangeDetectorRef,
    private cs: ComercialService,
    private us: UserService,
    private antRep: ModRepService,
    private route: ActivatedRoute) {
    this.route.data.subscribe(d => {
      this.report = new ReportT(com(d.report));
      this.config_select_group = this.report.getJerar();
    });
  }

  ngOnInit() {
    this.activeHier = false;
    this.activeFilters = false;
    this.configFilters = [];
    this.route.data.subscribe(d => {
      this.report = new ReportT(com(d.report));
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

  loadFilter(r) {
    this.filter$.next(r)
  }

  selectHier(evt: any) {
    let lv: any = evt[0];
    this.level$.next(lv);
  }

  private combineSelections() {
    combineLatest([this.filter$,this.level$])
    .subscribe(([filter,level])=>{
        let params={...filter,...level}
        this.renderTable(params,{find:'_01',index:0})
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

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}