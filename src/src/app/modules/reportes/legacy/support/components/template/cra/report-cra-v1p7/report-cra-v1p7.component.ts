import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';

import { ReplaySubject, Subject, combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { ReportT } from '../../../../services/report';
import { SelectService } from '../../../../services/select.service';
import { GraphicService } from '../../../../services/graphic.service';
import { TableMHService } from '../../../../services/table.service';
import { ComercialService } from '../../../../../comercial/comercial.service';
import { cra } from '../../../../../comercial/rda/administracion/cra-map';
import { ModRepService } from 'app/modules/reportes/compartido/servicios/mod-rep.service';
import { isNullOrUndefined } from 'app/core/shared/functions.util';


@Component({
  selector: 'app-report-cra-v1p7',
  templateUrl: './report-cra-v1p7.component.html',
  styleUrls: ['./report-cra-v1p7.component.scss']
})
export class ReportCraV1p7Component implements OnInit, OnDestroy {
  report: ReportT;
  activeHier: boolean;
  confHier1: any;
  filterAjax$ = new Subject<{}>();
  config_select;
  dynamic_ciiu=[]
  config_select_multiple: SelectService[] = [];
  config_select_multiple_ajax: SelectService[] = [];
  config_select_group: string = '';
  ocultarCombo: boolean=false 
  tipCod :number
  codRel : string 
  activeFilters: boolean; 
  configFilters: SelectService[];
  /*HASESOR:any={
    label:'Seleccione el Asesor:',
    selected:null,
    hidden:true,
    variable:'HASESOR',
    data:[
    ]
  }
  */

  configG: string[];
  configT: string[];
  config_graphic: any;
  config_table: TableMHService[] = [];
  filter$ = new Subject<any>();
  level$ = new Subject<any>();
  filterF$ = new Subject<any>();

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
      this.combineSelections2();
      this.iniHierarchy();
    });   
    //this.renderUltGestion(7,231)

    //this.renderUltGestion();

    /*this.router();
    this.mergeParams();
    */
  }

  private processFilters() {
    const filters: any = this.report.getFilters();
    console.log(filters);
    filters.forEach(f => {
      const confS = new SelectService();
      confS.labelName(f.label);
      confS.getVariable(f.variable);
      confS.selectedVAlue(f.selected);
      confS.adddata(f.data);
      console.log(f.variable);
      console.log(f.selected)
      this.configFilters.push(confS);
      
      
    }); 
    this.activeFilters = true;
    
     
    
    
  }

  private iniHierarchy() {
    console.log(this.report.getJerar());
    let cfg = this.antRep.getHierarchyConfig(this.report.getJerar()); 
    console.log(cfg);
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

  selectHier(evt: any) {
    let lv: any = evt[0];
    this.level$.next(lv);  
  }
  loadF(r) { 
    this.filterF$.next(r);
    //this.combineSelections();
    
  } 
  private combineSelections() {    
     combineLatest([this.filter$, this.level$])
     .pipe(takeUntil(this.destroy$))
    .subscribe(([filter, level]) => {  
      let lp = { tip_cod: level.tip_cod, cod_rel: level.cod_rel  };
      let params = { ...filter, ...lp}; 
      this.tipCod=level.tip_cod
      this.codRel=level.cod_rel
      //console.log(params)
        
      if(params.tip_cod==18)
      { 
        this.ocultarCombo=true   
      }; 
      this.renderUltGestion(params.tip_cod,params.cod_rel); 
      // this.configT.forEach((find, index) => { 
      //   this.renderTable(params, { find: find, index: index });
      // });
      // this.configG.forEach((find, index) => {
      //   this.renderGrafico(params, { find: find, index: index })
      // }); 
    });
    
     
  }
  private combineSelections2() {    
    combineLatest([this.filter$, this.level$,this.filterF$])
    .pipe(takeUntil(this.destroy$))
   .subscribe(([filter, level,filterF]) => {  
     let lp = { tip_cod: level.tip_cod, cod_rel: level.cod_rel  };
     let params = { ...filter, ...lp,...filterF}; 
     this.tipCod=level.tip_cod
     this.codRel=level.cod_rel
     //console.log(params)
       
     if(params.tip_cod==18)
     { 
       this.ocultarCombo=true   
     }; 
     //this.renderUltGestion(params.tip_cod,params.cod_rel); 
     this.configT.forEach((find, index) => { 
       this.renderTable(params, { find: find, index: index });
     });
     this.configG.forEach((find, index) => {
       this.renderGrafico(params, { find: find, index: index })
     }); 
   });
   
    
 }

  loadFilter(r) {    
    this.filter$.next(r)  
    
  }

  private renderTable(r, add): void {
    const table = this.report.getTableFind(add.index);
    const report = this.report.getRNameCompleted(add.find);
    //console.log(this.report);
    const confT = new TableMHService(table);
    confT.results(true, true, false);
    this.config_table[add.index] = confT;
    const params = { ...confT.getParamsAdd(), ...r };//this.filterF$
    console.log(params);
    //this.renderUltGestion(params.tip_cod,params.cod_rel);
    const reportType = this.report.getReportType();
    //console.log(reportType);
    this.cs.getMixData(report, reportType, params)
    .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          let result = data.body['result'];
          console.log(result.body);
          const confT = new TableMHService(table);
          confT.results(true, false, false);
          confT.addColumns(result.headers);
          confT.addELEMENT_DATA(result.body);
          confT.addExt(result.additional);
          //console.log(result.additional);    
          this.config_table[add.index] = confT;
          this.cdr.detectChanges();
          this.route.data.subscribe(d => {
            this.report = new ReportT(cra(d.report));
            this.configT = this.report.getCount();
            this.configG = this.report.getCountG();
            // this.processFilters();
            // this.combineSelections();
            // this.iniHierarchy();
          });
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
    /*const confG= new GraphicService(graphic);
    confG.results(true,true,false);
    this.config_graphic=[confG,confG,confG,confG,confG,confG,confG,confG];*/
    const params = { ...r };
    //console.log(params);
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
  
  private renderUltGestion(tip_cod,cod_rel ): void {  
 
    let report = 'SEL_JER_MENTORING_01'; 
    this.cs.getRegularData(report, {tip_cod: tip_cod,cod_rel:cod_rel})
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (data) => {
        let result = data.body['result']; 
        const confS = new SelectService();
        confS.labelName('Asesor');
        confS.getVariable('resp');
        confS.selectedVAlue('TODO');
        confS.adddata(result.body); 
        this.config_select = confS; 
        this.cdr.detectChanges()
      })
       
      //this.combineSelections2();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}