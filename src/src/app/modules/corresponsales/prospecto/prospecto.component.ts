import { Component, OnInit, ChangeDetectorRef, HostListener, OnDestroy, ViewChild, ElementRef } from '@angular/core';
//import { baseAnimations } from '../../../../../../../core/screen/animations/animations.util';
//import { ReportT } from '../../../../support/services/report';
import { ActivatedRoute } from '@angular/router';

import * as HighchartsMaps from "highcharts/highmaps";
import * as Highcharts from "highcharts";
import peruMap from "@highcharts/map-collection/countries/pe/pe-all.geo.json";
import proj4 from "proj4";
//import { cra } from '../../../../comercial/rda/administracion/cra-map';
//import { ComercialService } from '../../../../comercial/comercial.service';
import { Subject, ReplaySubject, Subscription,combineLatest } from 'rxjs';
//import { SelectService } from '../../../../support/services/select.service';
//import { FormControl } from '@angular/forms';
//import { TableMHService } from '../../../../support/services/table.service';
import { takeUntil } from 'rxjs/operators';
//import { GraphicService } from '../../../../support/services/graphic.service';
import { baseAnimations } from '../../../core/screen/animations/animations.util';
import { ReportT } from '../../reportes/legacy/support/services/report';
import { cra } from '../../reportes/legacy/comercial/rda/administracion/cra-map';
import { ComercialService } from '../../reportes/legacy/comercial/comercial.service';
import { TableMHService } from '../../reportes/legacy/support/services/table.service';
import { GraphicService } from '../../reportes/legacy/support/services/graphic.service';
import { ModRepService } from 'app/modules/reportes/compartido/servicios/mod-rep.service';
import { isNullOrUndefined } from 'app/core/shared/functions.util';
import { SelectService } from 'app/modules/reportes/legacy/support/services/select.service';

//const worldMap = require('@highcharts/map-collection/custom/world.geo.json');
export interface PeriodicElement {

  name: string;
  position: string;
  weight: number;
  symbol: string;
  tickpro: number;
  montomarzo: number;
  ticketmarzo: number;
  tranmarzo: number;

  montofeb: number;
  ticketfeb: number;
  tranfeb: number;

  montoene: number;
  ticketene: number;
  tranene: number;

}

@Component({
  selector: 'app-prospecto',
  templateUrl: './prospecto.component.html',
  styleUrls: ['./prospecto.component.scss'],
  animations: baseAnimations
})
export class ProspectoComponent implements OnInit, OnDestroy {
  
  public lat: number=-9.189967;
  public lng: number=-75.015152;

  //show : boolean= true;
  Highcharts: typeof Highcharts = Highcharts;
  mapsschartOptions: Highcharts.Options = {};
  mostrarGrafico: boolean = false;
  activeHier: boolean;
  configG: string[]; 
  filter$ = new Subject<any>();
  configT: string[];
  report = new ReportT(cra('GREPROSPCORRE'));
  config = this.report.getCount();
  config_table: TableMHService[] = [];
  config_table6: TableMHService[] = [];
  config_graphic9: any = [];
  config_graphic_tcorr: any = [];
  config_graphic_g4: any = [];
  jsonmap: any;
  jsonmap2: [];
  jsonmap3: any;
  jsonmap4: any;
  confHier1: any;
  activeFilters: boolean; 
  configFilters: SelectService[];
  jsonmapgoogle: Marker[];
  @ViewChild('charts1') public chartEl: ElementRef;
  @ViewChild('charts2') public chartE2: ElementRef;
  newData1 = ["eg", 555];
  config_graphic_tteri: any = [];
  CorresponsalStock: string;
  transstockStock: string;
  montstock: string;
  tickstock: string;
  numinstalado: string;
  percetInstalado: string;
  sincoresstock: string;
  idPendiDias: [];
  CorresponsalMes: string;
  transstockMes: string;
  montMes: string;
  tickMes: string;
  sincoresMes: string;

  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);


  config_select_group: string = '';

  HighchartsMaps: typeof HighchartsMaps = HighchartsMaps;
  chartConstructor = "mapChart";
  dailyTrafficChartBar: any;
  monthlyTrafficChartBar: any;
  dailyBandwithUsage: any;
  trafficGrowthChart: any; 

  level$ = new Subject<any>();
  constructor(private cdr: ChangeDetectorRef,
    private cs: ComercialService,
    private antRep: ModRepService,
    private route: ActivatedRoute) 
    
    {
      /*
      console.log(this.route.data)
      this.route.data.subscribe(d => {
      this.report = new ReportT(cra('GREPROSPCORRE'));
      this.config_select_group = this.report.getJerar();
      this.config = this.report.getCount();
    });
    */
   let cfg={code:2,max_lvl:5,params:{}}
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
     
    )
  }
/*
  onMouseOver(infoWindow, gm) {
    gm.lastOpen.close();
    infoWindow.close();
  }*/

onMouseOver(infoWindow, gm) {

    if (gm.lastOpen && gm.lastOpen.isOpen) {
      gm.lastOpen.close();
      infoWindow.close();
    }
  
    gm.lastOpen = infoWindow;
  
    infoWindow.open();
  }

  private renderGraficov4GT(r, add): void {
    const graphic = this.report.getGraphicFind
      (add.index);
    const report = this.report.getRNameCompleted(add.find);
    const confG = new GraphicService(graphic);
    confG.results(true, true, false);
    this.config_graphic_g4 = [confG, confG, confG, confG, confG, confG, confG, confG];
    const params = { ...confG.getParamsAdd(), ...r };
    //console.log(params);
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
            confG.setPlotOptions(gf.plotOptions)
            confG.setTitle(gf.graphName);
            confG.setsubTitle(gf.graphSubName);
            confG.setTitleyAxis(gf.getUnitGraph);
            global.push(confG);
          })
          this.config_graphic_g4 = global;
          console.log(this.config_graphic_g4)
          this.cdr.detectChanges();

        },
        () => {
          const confG = new GraphicService();
          confG.results(true, false, true);
          this.config_graphic_g4 = [confG, confG, confG, confG, confG, confG, confG, confG, confG];
          this.cdr.detectChanges();
        });
  }
  private renderGraficov2GT(r, add): void {
    const graphic = this.report.getGraphicFind
      (add.index);
    const report = this.report.getRNameCompleted(add.find);
    const confG = new GraphicService(graphic);
    confG.results(true, true, false);
    this.config_graphic_tcorr = [confG, confG, confG, confG, confG, confG, confG, confG];
    const params = { ...confG.getParamsAdd(), ...r };
    console.log(params);
    this.cs.getGraphicData(report, params)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          let result = data.body['result'];
          console.log(result);
          let global: GraphicService[] = [];
          result.forEach((gf) => {
            const confG = new GraphicService(graphic);
            confG.results(true, false, false);
            confG.setSerie(gf.series);
            confG.setCategorie(gf.categories[0].columnDef);
            confG.setPlotOptions(gf.plotOptions)
            confG.setTitle(gf.graphName);
            confG.setsubTitle(gf.graphSubName);
            confG.setTitleyAxis(gf.getUnitGraph);
            console.log(gf.getUnitGraph)
            global.push(confG);
          })
          this.config_graphic_tcorr = global;
          console.log(this.config_graphic_tcorr)
          this.cdr.detectChanges();

        },
        () => {
          const confG = new GraphicService();
          confG.results(true, false, true);
          this.config_graphic_tcorr = [confG, confG, confG, confG, confG, confG, confG, confG, confG];
          console.log(this.config_graphic_tcorr)
          this.cdr.detectChanges();
        });
  }
  private renderGraficov3GT(r, add): void {
    const graphic = this.report.getGraphicFind
      (add.index);
    const report = this.report.getRNameCompleted(add.find);
    const confG = new GraphicService(graphic);
    confG.results(true, true, false);
    this.config_graphic_tteri = [confG, confG, confG, confG, confG, confG, confG, confG];
    const params = { ...confG.getParamsAdd(), ...r };
    console.log(params);
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
            confG.setPlotOptions(gf.plotOptions)
            confG.setTitle(gf.graphName);
            confG.setsubTitle(gf.graphSubName);
            confG.setTitleyAxis(gf.getUnitGraph);
            global.push(confG);
          })
          this.config_graphic_tteri = global;
          //console.log(this.config_graphic_tteri)
          this.cdr.detectChanges();

        },
        () => {
          const confG = new GraphicService();
          confG.results(true, false, true);
          this.config_graphic_tteri = [confG, confG, confG, confG, confG, confG, confG, confG, confG];
          this.cdr.detectChanges();
        });
  }

  private renderGraficov2(r, add): void {
    const graphic = this.report.getGraphicFind(add.index);
    const report = this.report.getRNameCompleted(add.find);
    const confG = new GraphicService(graphic);
    confG.results(true, true, false);
    this.config_graphic9 = [confG, confG, confG, confG, confG, confG, confG, confG];
    const params = { ...confG.getParamsAdd(), ...r };
    console.log(params);
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
            confG.setPlotOptions(gf.plotOptions)
            confG.setTitle(gf.graphName);
            confG.setsubTitle(gf.graphSubName);
            confG.setTitleyAxis(gf.getUnitGraph);
            global.push(confG);
          })
          this.config_graphic9 = global;
          console.log(this.config_graphic9)
          this.cdr.detectChanges();
 
        },
        () => {
          const confG = new GraphicService();
          confG.results(true, false, true);
          this.config_graphic9 = [confG, confG, confG, confG, confG, confG, confG, confG, confG];
          this.cdr.detectChanges();
        });
  }

  private renderTable05(r, add): void { 
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
           
          this.jsonmap = result.body;  
          this.jsonmap = this.jsonmap[0].TCAD;
          //this.jsonmap = JSON.parse(JSON.stringify(this.jsonmap))
             
          let obj = eval(this.jsonmap)
           


          this.mapsschartOptions = {
            chart: {
              type: 'pie',
            }, 
            title: {
              text: null
            },
            tooltip: {
              pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>',
            },
            plotOptions: {
              pie: {
                showInLegend: true,
              },
            },
            series: [
              {
                // name: 'Brands',
                // colorByPoint: true,
                data: obj// [{"name":'RURAL',"y":0.50},{"name":'URBANA',"y":0.50}]

              } as Highcharts.SeriesPieOptions,
            ]
          }
          this.mostrarGrafico = true;
 
          
          let opts = this.mapsschartOptions;
          console.log(opts);
          let e = document.createElement('div');
      
          this.chartEl.nativeElement.appendChild(e);
      
          if (opts.chart) {
            // opts.chart['renderTo'] = e;
          }
          Highcharts.chart(this.chartEl.nativeElement, opts);

        },
        () => {

        });


  }

  private renderTable07(r, add): void { 
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
          this.jsonmap4 = result.body;  
          this.jsonmap4 = this.jsonmap4[0].TCAD; 
             
          let obj2 = eval(this.jsonmap4)
         


          this.mapsschartOptions = {
            chart: {
              type: 'pie',
            }, 
            title: {
              text: null
            },
            tooltip: {
              pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>',
            },
            plotOptions: {
              pie: {
                showInLegend: true,
              },
            },
            series: [
              {
                 
                data: obj2// [{"name":'RURAL',"y":0.50},{"name":'URBANA',"y":0.50}]

              } as Highcharts.SeriesPieOptions,
            ]
          }
          this.mostrarGrafico = true;
 
          
          let opts = this.mapsschartOptions;
          console.log(opts);
          let e = document.createElement('div');
      
          this.chartE2.nativeElement.appendChild(e);
      
          if (opts.chart) {
            // opts.chart['renderTo'] = e;
          }
          Highcharts.chart(this.chartE2.nativeElement, opts);

        },
        () => {

        });


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
          confT.addExt(result.additional);
          this.config_table[add.index] = confT;
          this.cdr.detectChanges();
          this.CorresponsalStock = result.additional.NumProspecto
          this.transstockStock = result.additional.NumNOCalifica
          this.montstock = result.additional.NumEva
          this.tickstock = result.additional.NumProceso 
          this.numinstalado =  result.additional.NumInstalado
          this.percetInstalado =  result.additional.PercentInsta
          this.CorresponsalMes = result.additional.corresmes
          this.transstockMes = result.additional.transmes
          this.montMes = result.additional.montmes
          this.tickMes = result.additional.tickmes
          this.sincoresMes = result.additional.sincoresmes
            
        },
        () => {
          const confT = new TableMHService(table);
          confT.results(true, false, true);
          this.config_table[add.index] = confT;
          this.cdr.detectChanges();
        });
        console.log(this.CorresponsalStock)
  }

  private renderTable6(r, add): void {
    const table = this.report.getTableFind(add.index);
    const report = this.report.getRNameCompleted(add.find);
    const confT = new TableMHService(table);
    confT.results(true, true, false);
    this.config_table6[add.index] = confT;
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
          this.config_table6[add.index] = confT;
          this.cdr.detectChanges();
        },
        () => {
          const confT = new TableMHService(table);
          confT.results(true, false, true);
          this.config_table6[add.index] = confT;
          this.cdr.detectChanges();
        });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnInit() {
    this.activeHier = false;
    this.activeFilters = false;
    this.configFilters = [];
    this.route.data.subscribe(d => {
      this.report = new ReportT(cra('GREPROSPCORRE'));
      this.configT = this.report.getCount();
      this.configG = this.report.getCountG();
      //console.log(this.report)
      //console.log(this.configT)
      //console.log(this.configG)
      this.processFilters();
      this.combineSelections();
      this.iniHierarchy(); 
    });
  }
  selectHier(evt: any) {
    let lv: any = evt[0];
    this.level$.next(lv);  
  } 
  private iniHierarchy() {
    let cfg={code:2,max_lvl:5,params:{}}
    this.antRep.getBaseHierarchy(cfg.code).subscribe(
      x => {
        let bh: any = x.body.base_hierarchy;
        this.confHier1 = {
          roots: bh,
           
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
     
    ) 
  
  }
  private processFilters() { 
    const filters: any = this.report.getFilters();
    //console.log(filters);
    filters.forEach(f => {
      const confS = new SelectService();
      confS.labelName(f.label);
      confS.getVariable(f.variable);
      confS.selectedVAlue(f.selected);
      confS.adddata(f.data);
      this.configFilters.push(confS);
    });
    //console.log(this.configFilters)
    this.activeFilters = true;
  }
  loadFilter(r) {    
    this.filter$.next(r)  
    
  }
  private combineSelections() { 
    combineLatest([this.filter$, this.level$]).subscribe(([filter, level]) => {
      let lp = { tip_cod: level.tip_cod, cod_rel: level.cod_rel };
      let params = { ...filter, ...lp };
      // this.configT.forEach((find, index) => {
      //   this.renderTable(params, { find: find, index: index });
      // });
      this.renderTable(params, { find: '_01', index: 0 });
    this.renderGraficov2(params, { find: '_01', index: 0 });
    //this.renderGraficov3GT(r, { find: '_03', index: 0 });
      
    this.renderTable05(params, { find: '_02', index: 0 });
    this.renderTable6(params, { find: '_06', index: 0 });
    this.renderTable07(params, { find: '_03', index: 0 });

      // this.configG.forEach((find, index) => {
      //   this.renderGrafico(params, { find: find, index: index })
      // });

    });
    
  }
  load(r) {
    this.renderTable(r, { find: '_01', index: 0 });
    this.renderGraficov2(r, { find: '_01', index: 0 });
    //this.renderGraficov3GT(r, { find: '_03', index: 0 });
      
    this.renderTable05(r, { find: '_02', index: 0 });
    this.renderTable6(r, { find: '_06', index: 0 });
    this.renderTable07(r, { find: '_03', index: 0 });
  }
  

  setChartColor(theme) {
    console.log(theme);
  }
  

  chartOptions: Highcharts.Options = {
    title: {
      text: null//"Highcharts Maps - basic demo"
    },
    xAxis: { categories: ['ene 2021', 'feb 2021', 'mar 2021', 'abr 2021'] },
    series: [{
      type: 'column',
      name: 'Cobro Cuota Corresp. FC Cli',
      data: [11, 255, 1293, 1891]
    }, {
      type: 'column',
      name: 'Ret. Efec. Corresp FC Cli',
      data: [0, 45, 373, 315]
    }, {
      type: 'column',
      name: 'Dep. Efec. Corresp FC Cli',
      data: [2, 12, 311, 174]
    }],
    plotOptions: {
      column: {
        stacking: 'stream'
      }
    }
  };

  /*HighchartsColumn: typeof Highcharts = Highcharts;
  chartOptionsColumn: Highcharts.Options = {
    title: {
      text: null//"Highcharts Maps - basic demo"
    },
    xAxis: { categories: ['PAGO OBLIG.', 'RETIRO', 'DEPOSITO'] },
    yAxis: [{
      title: {
        text: null
      }
    }, {
      title: {
        text: null
      }, opposite: true
    }],
    series: [{
      type: 'column',
      name: 'Monto',
      data: [1125748, 196952, 148417]
    }, {
      type: 'spline',
      name: '#Transacciones',
      data: [3460, 747, 499],
      yAxis: 1
    }]
  };*/

  /*Highcharts1: typeof Highcharts = Highcharts;
  chartOptions1: Highcharts.Options = {
    title: {
      text: null//"Highcharts Maps - basic demo"
    },
    xAxis: { categories: ['LIMA ORIENTE', 'NOR ANDINO', 'CENTRO SUR'] },
    series: [{
      type: 'column',
      name: 'PAGO OBLIG',
      data: [563830, 494881, 67037]
    }, {
      type: 'column',
      name: 'RETIRO',
      data: [65691, 106319, 24492]
    }, {
      type: 'column',
      name: 'DEPOSITO',
      data: [59392, 75287, 13738]
    }],
    plotOptions: {
      column: {
        stacking: 'stream'
      }
    }
  };*/
/*
  HighchartsColumn1: typeof Highcharts = Highcharts;
  chartOptionsColumn1: Highcharts.Options = {
    title: {
      text: null//"Highcharts Maps - basic demo"
    },
    xAxis: { categories: ['ABC00', 'ABC01', 'ABC02', 'ABC03', 'ABC04', 'ABC05', 'ABC06', 'ABC07', 'ABC08', 'ABC09', 'ABC10', 'ABC11', 'ABC12', 'ABC13', 'ABC14', 'ABC15', 'ABC16', 'ABC17', 'ABC18', 'ABC19', 'ABC20', 'ABC21'] },
    yAxis: [{
      title: {
        text: null
      }
    }, {
      title: {
        text: null
      }, opposite: true
    }],
    series: [{
      type: 'column',
      name: 'Monto',
      data: [1125748, 196952, 148417, 120202, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000]
    }, {
      type: 'spline',
      name: '#Transacciones',
      data: [3460, 747, 499, 355, 230, 230, 230, 230, 230, 230, 230, 230, 230, 230, 230, 230, 230, 230, 230, 230, 230, 230],
      yAxis: 1
    }]
  };
*/
  /*
  mapChartOptions: HighchartsMaps.Options = {
   
    chart: {
      map: peruMap,
      proj4: proj4
    },
    title: {
      text: null//"Highcharts Maps - basic demo"
    },
    
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        alignTo: "spacingBox"
      }
    },
    legend: {
      enabled: false,
    },
    colorAxis: {
      min: 0
    },
    series: [
      {
        name: "Random data",
        states: {
          hover: {
            color: "#BADA55"
          }
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}"
        },
        allAreas: false,
        data:  [
          ['pe-ic', 0],
          ['pe-cs', 1],
          ['pe-uc', 2],
          ['pe-md', 3],
          ['pe-sm', 4],
          ['pe-am', 5],
          ['pe-lo', 6],
          ['pe-ay', 7],
          ['pe-145', 8],
          ['pe-hv', 9],
          ['pe-ju', 10],
          ['pe-lr', 11],
          ['pe-lb', 12],
          ['pe-tu', 13],
          ['pe-ap', 14],
          ['pe-ar', 15],
          ['pe-cl', 16],
          ['pe-mq', 17],
          ['pe-ta', 18],
          ['pe-an', 19],
          ['pe-cj', 20],
          ['pe-hc', 21],
          ['pe-3341', 22],
          ['pe-ll', 23],
          ['pe-pa', 24],
          ['pe-pi', 25]
        ]
      } as Highcharts.SeriesMapOptions,
      {
       
        type: "mappoint",
        name: "Corresponsalías",
        marker: {
          radius: 3,
          fillColor: "tomato"
        }
        ,
        data: [
          {
              "name": "BAZAR FANNY",
              "lat": -11.485713056,
              "lon": -75.271150128
          },
          {
              "name": "FARMACIA FRALIFARMA",
              "lat": -11.558634,
              "lon": -75.1853772
          },
          {
              "name": "ALLPY",
              "lat": -12.082560,
              "lon": -75.204363
          },
          {
              "name": "CHIFA KUAN TANG",
              "lat": -12.4475338,
              "lon": -75.145363772
          }
      ]
      }
    ]
  };*/
  
  zoom = 5.6;
  //markers: Marker[] = [{"label":"MULTISERVICIOS EL MALECON","lat":-10.574791,"lng":-75.4092203},{"label":"TIENDA LINDA","lat":-10.34358428,"lng":-75.241437588},{"label":"BODEGA MI MARICARMEN","lat":-6.5402179,"lng":-80.0157964},{"label":"TELECOMUNICACIONES LIVERTEC","lat":-6.56291778,"lng":-78.65068588},{"label":"LANA PASCO","lat":-10.405952144,"lng":-76.151177236},{"label":"LUANA","lat":-17.021801,"lng":-72.0224864},{"label":"MULTISERVICIOS R Y R","lat":-13.322396,"lng":-71.957782},{"label":"BOTICA FARMA MEDIC","lat":-10.5624423,"lng":-75.115996652},{"label":"LOCUTORIO J&A","lat":-10.55342408,"lng":-74.522559072},{"label":"LA ESQUINA RUSTICA","lat":-17.52427504,"lng":-71.454125924},{"label":"NENIT@S KIDS","lat":-10.553472428,"lng":-74.523066276},{"label":"MINIMARKET NELLY","lat":-16.5951486,"lng":-72.5411864},{"label":"MULTISERVIS NILTSAN","lat":-10.5792403,"lng":-75.4041834},{"label":"BOTICA INKAFARPLUS","lat":-9.50582594,"lng":-75.543456972},{"label":"DULTESA","lat":-7.201051044,"lng":-78.1083154},{"label":"HENETEL TELECOMUNICACIONES","lat":-5.533685056,"lng":-76.61853568},{"label":"BAZAR JAZMIN","lat":-13.4155491,"lng":-76.1390305},{"label":"MULTISERVICIOS RAPIFACIL","lat":-10.3423826,"lng":-75.2422734},{"label":"MULTISERVICIOS JG&A","lat":-9.472604,"lng":-78.302791},{"label":"MULTISERVICIOS QULLQI","lat":-12.582601,"lng":-69.197901},{"label":"CENTRO AGRO","lat":-9.531496788,"lng":-75.593904008},{"label":"MULTISERVICIOS MARCELO","lat":-13.684061,"lng":-71.622688},{"label":"LA CASA DE LOS LICORES","lat":-13.387327,"lng":-71.899982},{"label":"MINIMARKET “BACARDIS”","lat":-11.41443612,"lng":-75.201031338},{"label":"SANTA ROSA","lat":-11.779474,"lng":-75.494613},{"label":"LA NOCHE","lat":-8.14790964,"lng":-78.32560616},{"label":"MULTISERVICIOS PODEROSO CAUTIV","lat":-6.59332286,"lng":-76.3192424},{"label":"BOTICA MINKA FARMA","lat":-10.43487182,"lng":-73.45670644},{"label":"MULTISERVICIOS INIVON","lat":-3.6098092,"lng":-80.4786352},{"label":"BOTICA ROXFARMA","lat":-10.441233564,"lng":-75.161068492},{"label":"LIBRERIA MATLUZ","lat":-10.44506,"lng":-75.133845},{"label":"MULTISERVICIOS SHANTHEL","lat":-13.463383,"lng":-72.146545},{"label":"BODEGA MANUELA","lat":-7.92583684,"lng":-78.311295472},{"label":"W - LIBRERIA BAZAR MANYLSA","lat":-12.0299826,"lng":-76.545932512},{"label":"BAZAR VALENTINO'S","lat":-8.14627495,"lng":-78.17133799},{"label":"BAZAR FANNY","lat":-11.485713056,"lng":-75.271150128},{"label":"COMERCIAL KAMIZARAKI","lat":-14.000404,"lng":-69.268759},{"label":"BOUTIQUE BELLEZA Y ELEGANCIA","lat":-5.54594864,"lng":-79.48769032},{"label":"AVICOLA JHIRE","lat":-7.9511092,"lng":-78.27476838},{"label":"COMERCIAL JUANITA","lat":-5.71395864,"lng":-75.133367992},{"label":"MULTISERVICIOS SOFIA","lat":-10.94003749,"lng":-75.2017725},{"label":"THE POINT","lat":-7.91486008,"lng":-78.31269256},{"label":"ABARROTES NOEMI","lat":-13.464653,"lng":-72.14395},{"label":"MULTISERVICIOS DAVIANCA 2","lat":-9.222399736,"lng":-75.2695112},{"label":"MULTISERVIS BRISAN","lat":-10.583030,"lng":-75.397745},{"label":"NEG. DANILO LIAM & JESSIA","lat":-6.322768028,"lng":-80.0561546},{"label":"CONSULTORIO MEDICO EL SHADDAI","lat":-7.94202712,"lng":-78.311217244},{"label":"BODEGA JASSDEY","lat":-12.279015,"lng":-69.15215},{"label":"EL HUAYRURO","lat":-9.85785,"lng":-75.028685},{"label":"TIENDITA MILAGRITOS","lat":-5.245563326,"lng":-80.441977207}]
   
  polylinePoints = [
    { lat: -9.189967, lng: -75.015152 } /*,
    { lat: 23.806921, lng: 90.377078 },
    { lat: 24.919298, lng: 91.831699 }*/
  ];
  circleMapRadius = 30000;

  circleMapRadiusChange(radius) {
    this.circleMapRadius = radius;
    // console.log(e)
  }

}
export interface Marker {
  label?: string;
	lat: number;
	lng: number;
	
  //draggable: boolean;
 }


