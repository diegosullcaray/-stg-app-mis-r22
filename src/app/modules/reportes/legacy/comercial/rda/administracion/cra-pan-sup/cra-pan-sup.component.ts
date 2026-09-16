import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { isNullOrUndefined } from 'app/core/shared/functions.util';
import { ModRepService } from 'app/modules/reportes/compartido/servicios/mod-rep.service';
import { ReportT } from 'app/modules/reportes/legacy/support/services/report';
import { SelectService } from 'app/modules/reportes/legacy/support/services/select.service';
import { TableMHService } from 'app/modules/reportes/legacy/support/services/table.service';

import { combineLatest, Subject, Subscription, ReplaySubject } from 'rxjs';

import { takeUntil } from 'rxjs/operators';
import { ComercialService } from '../../../comercial.service';
import { cra } from '../cra-map';

@Component({
  selector: 'app-cra-pan-sup',
  templateUrl: './cra-pan-sup.component.html',
  styleUrls: ['./cra-pan-sup.component.scss']
})
export class CraPanSupComponent implements OnInit {
  report: ReportT;
  activeHier: boolean;
  confHier1: any;

  config_select_multiple: SelectService[] = [];
  config_select_multiple_2: SelectService[] = [];
  config_select_multiple_3: SelectService[] = [];
  config_select_multiple_4: SelectService[] = [];
  config_select_multiple_5: SelectService[] = [];
  
  config_table: TableMHService[] = [];
  filter_1$ = new Subject<{}>();
  filter_2$ = new Subject<{}>();
  filter_3$ = new Subject<{}>();
  filter_4$ = new Subject<{}>();
  filter_5$ = new Subject<{}>();
  level$ = new Subject<any>();
  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private cdr: ChangeDetectorRef,
    private antRep: ModRepService,
    private cs: ComercialService) { }

  ngOnInit() {
    this.report = new ReportT(cra('PANEL_SUP'));
    this.mergeParams();
    const confS = new SelectService();
    confS.labelName('Cargo');
    confS.getVariable('carg');
    confS.selectedVAlue(0);
    confS.adddata([
      { desc: "TODO", id: 0 },
      { desc: "ADMINISTRADOR", id: 1 },
      //{desc:"COORDINADOR DE CRÉDITOS",id:2},
      { desc: "GERENTE CORREDOR", id: 3 },
      //{desc:"GERENTE REGIONAL",id:4},
      { desc: "RESPONSABLE DE NEGOCIOS AGRO", id: 5 },
      //{desc:"JEFE INCLUSION",id:6}
    ]);

    this.config_select_multiple.push(confS);

    const confS_2 = new SelectService();
    confS_2.labelName('Cargo');
    confS_2.getVariable('carg');
    confS_2.selectedVAlue('GERENTE REGIONAL');
    confS_2.adddata([
      { desc: "GERENTE REGIONAL", id: "GERENTE REGIONAL" },
      { desc: "JEFE AGROPECUARIO", id: "JEFE AGROPECUARIO" },
      { desc: "JEFE INCLUSION", id: "JEFE INCLUSION" },
      { desc: "COORDINADOR PDM", id: "COORDINADOR PDM" }]);
    this.config_select_multiple_2.push(confS_2);

    const confS_3 = new SelectService();
    confS_3.labelName('Estado');
    confS_3.getVariable('state');
    confS_3.selectedVAlue('REVISTE GRAVEDAD');
    confS_3.adddata([
      { desc: "REVISTE GRAVEDAD", id: "REVISTE GRAVEDAD" },
      { desc: "CON SEÑALES DE ALERTA", id: "CON SEÑALES DE ALERTA" }]);
    this.config_select_multiple_3.push(confS_3);

    const confS_4 = new SelectService();
    confS_4.labelName('MONTO DESEMBOLSADO');
    confS_4.getVariable('cant');
    confS_4.selectedVAlue('1');
    confS_4.adddata([
      { desc: ">=50000", id: "1" },
      { desc: ">=30000", id: "2" }]);
    this.config_select_multiple_4.push(confS_4);


    const confS_5 = new SelectService();
    confS_5.labelName('MONTO DESEMBOLSADO');
    confS_5.getVariable('cant');
    confS_5.selectedVAlue('1');
    confS_5.adddata([
      { desc: ">=50000", id: "1" },
      { desc: ">=30000", id: "2" }]);
    this.config_select_multiple_5.push(confS_5);

    this.iniHierarchy();
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
    this.filter_1$.next(r)
  }

  loadFilter_2(r) {
    this.filter_2$.next(r)
  }

  loadFilter_3(r) {
    this.filter_3$.next(r)
  }

  loadFilter_4(r) {
    this.filter_4$.next(r)
  }

  loadFilter_5(r) {
    this.filter_5$.next(r)
  }

  mergeParams() {
    combineLatest([this.filter_1$, this.level$])
      .subscribe(([filter, level]) => {
        //this.config.forEach((find,index)=>{
        let params = { ...filter, ...level }
        this.renderTable(params, { find: '_01', index: 0 })
        //this.renderTable(params,{find:'_02',index:2})
        //})
      })

    combineLatest([this.filter_1$, this.level$, this.filter_3$])
      .subscribe(([filter, level, state]) => {
        let params = { ...filter, ...level, ...state }
        this.renderTable(params, { find: '_02', index: 2 })
      })

    /*combineLatest(this.filter_2$,this.level$)
    .subscribe(([filter,level])=>{
        let params={...filter,...level}
        this.renderTable(params,{find:'_03',index:1})
    })*/

    combineLatest([this.filter_4$, this.level$])
      .subscribe(([filter, level]) => {
        let params = { ...filter, ...level }
        this.renderTable(params, { find: '_04', index: 4 })
      })
    combineLatest([this.filter_4$, this.level$, this.filter_5$])
      .subscribe(([filter, level, cant]) => {
        let params = { ...filter, ...level, ...cant }
        this.renderTable(params, { find: '_05', index: 5 })
      }) /* 
    combineLatest(this.filter_5$,this.level$)
    .subscribe(([filter,level])=>{
        let params={...filter,...level}
        this.renderTable(params,{find:'_05',index:5})
    })  */
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
          console.log(this.config_table)
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
