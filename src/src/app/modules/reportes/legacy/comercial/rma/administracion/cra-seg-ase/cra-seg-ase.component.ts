import { Component,ChangeDetectorRef, OnDestroy, OnInit} from '@angular/core';
import { TableMHService } from '../../../../support/services/table.service';
import { ComercialService } from '../../../comercial.service';
import { ReplaySubject, Subject,combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { cra } from '../../../rda/administracion/cra-map';
import { ReportT } from '../../../../support/services/report';
import { SelectService } from '../../../../support/services/select.service';
import { GraphicService } from '../../../../support/services/graphic.service';
import { ModRepService } from 'app/modules/reportes/compartido/servicios/mod-rep.service';
import { isNullOrUndefined } from 'app/core/shared/functions.util';

@Component({
  selector: 'app-cra-seg-ase',
  templateUrl: './cra-seg-ase.component.html',
  styleUrls: ['./cra-seg-ase.component.scss']
})
export class CraSegAseComponent implements  OnInit,OnDestroy {
  report: ReportT;
  activeHier: boolean;
  confHier1: any;

  activeFilters: boolean;

  configFilters: SelectService[];
  configG:string[];
  config:string[];
  config_table:TableMHService[]=[];
  config_graphic:any=[];
  filter$=new Subject<{}>();
  level$=new Subject<any>();
  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private cdr:ChangeDetectorRef,
              private cs:ComercialService,
              private antRep: ModRepService,
              private route:ActivatedRoute) {
  }

  ngOnInit(){
    this.activeHier = false;
    this.activeFilters = false;
    this.configFilters = [];
    this.route.data.subscribe(d => {
      this.report = new ReportT(cra(d.report));
      this.config = this.report.getCount();
      this.configG = this.report.getCountG();
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

  selectHier(evt: any) {
    let lv: any = evt[0];
    this.level$.next(lv);
  }

  loadFilter(r){
    this.filter$.next(r)
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

  private renderGraficov2(r,add,dni):void{
    const graphic=this.report.getGraphicFind(add.index);
    const report=this.report.getRNameCompleted(add.find);
    const confG= new GraphicService(graphic);
    confG.results(true,true,false);
    this.config_graphic=[confG,confG,confG,confG,confG,confG,confG,confG];
    const params={...confG.getParamsAdd(),...r};
    this.cs.getGraphicData(report, {"numdoc":dni})
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (data)=>{
        let result=data.body['result'];
        let global:GraphicService[]=[];
        result.forEach((gf)=>{
          const confG=new GraphicService(graphic);
          confG.results(true,false,false);
          confG.setSerie(gf.series);
          confG.setTitle(gf.graphName);
          confG.setPlotBands(gf.plotBands);
          confG.setAnnotations(gf.annotations);
          confG.setsubTitle(gf.graphSubName);
          confG.setTitleyAxis(gf.getUnitGraph);
          
          global.push(confG);
        })
        this.config_graphic=global;
        this.cdr.detectChanges();
      },
      ()=>{
        const confG= new GraphicService();
        confG.results(true,false,true);
        this.config_graphic=[confG,confG,confG,confG,confG,confG,confG,confG];
        this.cdr.detectChanges();
      });
  }

  private renderTable(r,add):void{
    const table=this.report.getTableFind(add.index);
    const report=this.report.getRNameCompleted(add.find);
    const confT= new TableMHService(table);
    confT.results(true,true,false);
    this.config_table[add.index]=confT;
    const params={...confT.getParamsAdd(),...r};
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

  
   public loadG(r){
    switch (r.action) {
      case 'check':
        this.configG.forEach((find,index)=>this.renderGraficov2(r,{find:find,index:index},r.row.dni))
        break;
    }
   }
}

