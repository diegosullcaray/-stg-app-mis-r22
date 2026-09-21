import * as moment from 'moment';
import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild, NgZone } from "@angular/core";
import { UserService } from "app/system/admin/services/user.service";
import { ModRepService } from "../../compartido/servicios/mod-rep.service";
import { cloneObject, isNullOrUndefined } from 'app/core/shared/functions.util';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { principalConfig, tablaTab1, tablaTab2, tblOpts } from './cero-cuotas.util';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { ModSysAdminService } from 'app/core/data/remote/instances/mod-sys-admin.service';
import * as Highcharts from 'highcharts';
import { StgPaginatorComponent } from 'app/core/screen/components/stg-paginator/stg-paginator.component';
import { prepareDataForPagination } from 'app/core/screen/components/stg-paginator/stg-paginator.util';
import { tableConfOPTS } from '../agenda-comercial/agenda-comercial.util';
import Heatmap from 'highcharts/modules/heatmap';

Heatmap(Highcharts);

@Component({
  selector: 'app-cero-cuotas.component',
  templateUrl: './cero-cuotas.component.html',
  styleUrls: ['./cero-cuotas.component.scss']
})
export class CeroCuotasComponent implements OnInit {
  tip_cod: number;
  cod_rel: string;
  imp: number;
  config: any;
  principal: any;
  tipcod4: any;
  codrel4: any;
  curr_hier: any;
  firstLoad: boolean;
  curr_fec: string;
  show_lvl_scroll: boolean;
  dataSource: any;
  dataSource3: any;
  dataSource4: any;
  dataSource5: any;
  modalData: any;
  headerDefs: any;
  headerDefs3: any;
  headerDefs4: any;
  headerDefs5: any;
  load0: BehaviorSubject<boolean>;
  loading: boolean;
  Opts: any;
  Opts2: any;
  Opts4: any;

  selectedRow: any = null;
  Highcharts = Highcharts;
  nivel: string;
  saldoPorCultivoOptions: Highcharts.Options = {};
  saldoVencidoPorCultivoOptions: Highcharts.Options = {};
  clientesPorCultivoOptions: Highcharts.Options = {};
  resumenGeneralOptions: Highcharts.Options = {};
  isChartReady: boolean = false;

  private detailDataMap = new Map<string, any[]>();
  showPaginator: boolean;
  dataSource3Length: number;
  dataSource3Page: any;
  modalSalcartera: any;
  modalSaldoVencido: any;
  modalSExtension: any;
  modalPercenSVencido: any;

  kpi_prod_ind: number = 0;
  kpi_tmm_prod: number = 0;
  kpi_perc_cumpl: number = 0;
  kpi_perce_cump_clinuevo: number = 0;
  kpi_perc_avance: number = 0;
  kpi_tick_prom: number = 0;
  kpi_tmm_tick: number = 0;
  kpi_perc_ticket: number = 0;
  kpi_mont_dese: number = 0;
  kpi_tmm_desemb: number = 0;
  kpi_perc_montode: number = 0;
  kpi_perc_clinuev: number = 0;
  kpi_cli_stock: number = 0;
  kpi_tmm_cli_stock: number = 0;
  kpi_perc_cli_stock: number = 0;
  kpi_cart_vig: number = 0;
  kpi_var_cart_vig: number = 0;
  kpi_cli_nuevos: number = 0;
  kpi_tmm_cli_nuevos: number = 0;

  //variables para cards
  kpi_saldo_act: number = 0;
  kpi_saldo_ant: number = 0;
  kpi_dif_saldo: number = 0;	
  kpi_zcuonuevo_act: number = 0;	
  kpi_zcuonuevo_ant: number = 0;	
  kpi_dif_zcuonuevo: number = 0;	
  kpi_may60_act: number = 0;	
  kpi_may60_ant: number = 0;	
  kpi_dif_may60: number = 0;	
  kpi_men60_act: number = 0;	
  kpi_men60_ant: number = 0;	
  kpi_dif_men60: number = 0; 


  lvh: any;
  ftipCod: number;

  public isCeroCuotas1Ready: boolean = false;
  public isCeroCuotas2Ready: boolean = false;
  public updateFlagCeroCuotas1: boolean = false;
  public updateFlagCeroCuotas2: boolean = false;

  public ceroCuotasNumOptions: Highcharts.Options = {};
  public ceroCuotasMontoOptions: Highcharts.Options = {};
  public ceroCuotasAtrasoNumOptions: Highcharts.Options = {};
  public ceroCuotasAtrasoMontoOptions: Highcharts.Options = {};

  public variacionStockOptions: Highcharts.Options = {};
  public variacionCliStockOptions: Highcharts.Options = {};
  public variacionStockOptionsT: Highcharts.Options = {};
  public variacionCliStockOptionsT: Highcharts.Options = {};
  public updateFlagVariacion: boolean = false;
  public updateFlagVariacionT: boolean = false;
  public updateFlagCliVariacion: boolean = false;
  public ingresosSalidasOptions: Highcharts.Options = {};
  public ingresosSalidasOptionst: Highcharts.Options = {};
  public updateFlagIngresosSalidas: boolean = false;
  public updateFlagIngresosSalidast: boolean = false;

  kpi_rodamiento: number = 0;
  kpi_sal_no_vig: number = 0;
  kpi_sal_vig: number = 0;
  kpi_resultado_operativo: number = 0;
  kpi_percent_cancelado: number = 0;

  tmm_rodamiento: number = 0;
  tmm_TMMSALVIGE: number = 0;
  tmm_TMMHSALNOVIG: number = 0;

  meta_productividad: number = 0;
  meta_ticket: number = 0;
  meta_desem: number = 0;
  metadiariacarteravigente: number = 0;
  distdiariacartvig: number = 0;
  meta_cancela: number = 0;
  meta_varstockclie: number = 0;
  meta_clinuevo: number = 0;
  cumpldesembolsometadi: number = 0;
  activeHier: boolean;

  public updateFlagResumen: boolean = false;
  public isResumenReady: boolean = false;
  public isVariacionReady: boolean = false;
  public isVariacionReadyCli: boolean = false;
  public isVariacionReadyT: boolean = false;
  public isIngresosSalidasReady: boolean = false;
  public isIngresosSalidasReadyt: boolean = false;

  public mapaCalorOptions: Highcharts.Options = {};
  public mapaCalorOptions2: Highcharts.Options = {};
  public updateFlagMapaCalor: boolean = false;
  public updateFlagMapaCalor2: boolean = false;
  public isMapaCalorReady: boolean = false;
  public isMapaCalorReady2: boolean = false;
  confHier1: any;

  @ViewChild("paginator", { "static": false }) paginatorVC: StgPaginatorComponent;
  isDropdownOpen: boolean = false;
  currentDate: any;
  selector1: any;
  filter1: any;
  firstload: boolean;
  activeTab: string = 'prod';

  @ViewChild('dropdownContainer', { static: false }) dropdownContainer: ElementRef;

  constructor(
    private loader: StgAppLoaderService,
    private user: UserService,
    private antAdmin: ModSysAdminService,
    public antRep: ModRepService,
    private detector: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.setDefaults();
  }

  setTab(tabName: string) {
    this.activeTab = tabName;
  }

  eventChangePage(event: any) {
    this.filterPage(event.page);
  }

  preparePagination() {
    if (!this.dataSource3Page || this.dataSource3Page.length === 0) {
      this.showPaginator = false;
      this.modalData = [];
      this.dataSource3Length = 0;
      return;
    }
    this.dataSource3Length = this.dataSource3Page.length;
    if (this.dataSource3Length > 10) {
      this.showPaginator = true;
      prepareDataForPagination(10, this.dataSource3Page, "idPage");
      this.dataSource3Length = this.dataSource3Page.length;
      this.showPaginator = this.dataSource3Length > 10;
      if (this.paginatorVC) {
        this.paginatorVC.toFirstPage();
      }
      this.filterPage(1);
    } else {
      this.showPaginator = false;
      this.modalData = this.dataSource3Page;
    }
  }

  filterPage(page: number) {
    this.modalData = this.dataSource3Page.filter(p => p.idPage == page);
  }

  showDetailsPopup(category: string, chartIdentifier: string): void {
    const dataToFilter = this.detailDataMap.get(chartIdentifier);

    if (!dataToFilter) {
      console.error(`No se encontraron datos de detalle para el gráfico: ${chartIdentifier}`);
      return;
    }

    this.modalData = dataToFilter.filter(item =>
      (item.HDESCUL_Agrupado || item.HDESCUL) === category
    );
    this.modalSalcartera = this.modalData.reduce((acumulador, item) => {
      const hcapmonValor = Number(item.HCAPMON) || 0;
      return acumulador + hcapmonValor;
    }, 0);
    this.modalSaldoVencido = this.modalData.reduce((acumulador, item) => {
      const HVENMONValor = Number(item.HVENMON) || 0;
      return acumulador + HVENMONValor;
    }, 0);

    this.modalSExtension = this.modalData.reduce((acumulador, item) => {
      const EXTValor = Number(item.HEXTENS) || 0;
      return acumulador + EXTValor;
    }, 0);

    this.modalPercenSVencido = ((this.modalSaldoVencido / this.modalSalcartera) * 100);

    this.dataSource3Page = dataToFilter.filter(item =>
      (item.HDESCUL_Agrupado || item.HDESCUL) === category
    );
  }

  selectItem(item: any, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.selector1 = item;
    this.isDropdownOpen = false;

    const mockEvent = {
      source: { value: item, selected: true },
      isUserInput: true
    };

    this.eventFilter(mockEvent);
  }

  eventFilter(event: any) {
    if (!this.firstload && event.isUserInput) {
      this.loadData();
    }
  }

  closeModal(): void {
    this.modalData = [];
  }

  private setDefaults() {
    this.firstLoad = true;
    this.principal = cloneObject(principalConfig);
    this.show_lvl_scroll = false;
    this.curr_hier = { des_rel: "", des_lab: "" };

    this.saldoPorCultivoOptions = this.getInitialChartOptions('Saldo por Cultivo');
    this.saldoVencidoPorCultivoOptions = this.getInitialChartOptions('Saldo Vencido por Cultivo');
    this.clientesPorCultivoOptions = this.getInitialChartOptions('Clientes por Cultivo');
    this.resumenGeneralOptions = this.getInitialChartOptions('Resumen General');
  }

  private getInitialChartOptions(title: string): Highcharts.Options {
    return {
      chart: { type: 'bar', backgroundColor: '#fff' },
      title: { text: title },
      subtitle: { text: 'Seleccione una fila de la tabla para ver los datos' },
      xAxis: { categories: [] } as any,
      yAxis: { title: { text: '' } } as any,
      series: [{
        type: 'bar',
        name: 'Datos',
        data: []
      }] as any,
      credits: { enabled: false }
    };
  }

  async ngOnInit(): Promise<void> {
    this.loader.open();
    this.Opts = cloneObject(tblOpts);
    this.Opts2 = cloneObject(tblOpts);
    this.load0 = new BehaviorSubject(false);
    let profile = this.user.get('profile');
    this.curr_fec = profile.curr_fec;
    this.currentDate = moment(profile.curr_fec).format("YYYY-MM-DD");
    this.firstload = true;
    this.activeHier = false;
    this.loadFilter();
    await this.getBaseHierAsync();
    this.iniHierarchy(9, 6) 
    this.loading = true;
    this.Opts4 = tableConfOPTS;

    combineLatest([this.load0]).subscribe(([a]) => {
      if (a) {
        this.loading = false;
        this.loader.close();
        this.firstload = false;
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isDropdownOpen && this.dropdownContainer) {
      const targetElement = event.target as HTMLElement;
      const dropdownElement = this.dropdownContainer.nativeElement;

      if (!dropdownElement.contains(targetElement)) {
        this.isDropdownOpen = false;
      }
    }
  }

  
  iniHierarchy(code: number, max_lvl: number) {
    this.antRep.getBaseHierarchy(code).subscribe(
        x => {

            let bh: any = x.body.base_hierarchy;
            //console.log(bh)
            this.confHier1 = {
                roots: bh, //antes r_tip_cod: bh.tip_cod,
                cod_hier: code,
                params_hier: { key: "fec", val: this.currentDate },
                max_lvl: max_lvl,
                dlg_tlt: "JERARQUIA UNIDAD"

            }
            this.activeHier = true;
        }
    );
}

  onFechaChange(item: any) {
    if (!item) return;

    this.currentDate = item.val || (item.fecha ? item.fecha.val : item);
    this.selector1 = item;

    this.eventFilter({
      source: { value: item, selected: true },
      isUserInput: true
    });
  }

  
  selectHier(evt: any) {
    this.lvh = evt[0];
    //console.log(this.lvh)
    this.ftipCod= this.lvh.tip_cod
    
    this.loadData();

}

  loadFilter() {
    this.antRep.getRegularTableResult("RS_FECH02", {
      "fec": this.currentDate
    }).subscribe(x => {
      let r = x.body.resultado;

      if (r.meta1 && r.meta1.length > 0 && r.meta1[0]["json_result"]) {
        try {
          this.filter1 = JSON.parse(r.meta1[0]["json_result"]);

          if (this.filter1 && this.filter1.length > 0) {
            this.selector1 = this.filter1[0];
          } else {
            this.selector1 = null;
          }

          this.detector.detectChanges();
        } catch (error) {
          this.filter1 = [];
          this.selector1 = null;
        }
      } else {
        this.filter1 = [];
        this.selector1 = null;
      }
    }, error => {
      this.filter1 = [];
      this.selector1 = null;
      this.load0.next(true);
    });
  }

  private saveBuffer(obj: any) {
    obj['idx'] = this.principal.hierBuffer.length;
    this.setCurrHier(obj.des_rel, obj.tip_cod);
    this.principal.hierBuffer.push(obj);
  }

  capitalizeText(text: string): string {
    if (!text) return '';
    return text
      .split(/(\s+|-)/g)
      .map(word => {
        if (/^(\s+|-)$/.test(word)) { return word; }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join('');
  }

  // Evento que se dispara al clickear la tabla general
  ddHier(evt: any) {
    let key = evt.key;
    let tip_cod = evt.row.htipcod;
    if (key !== 'descripcion') {
      return;
    }

    this.loader.open();
    this.tipcod4 = tip_cod;
    this.codrel4 = evt.row.cod_rel;
    this.tip_cod = tip_cod;
    this.cod_rel = evt.row.hcodrel;
    this.principal.loading = true;
    
    let cod_rel = evt.row.hcodrel;
    this.saveBuffer({ tip_cod: tip_cod, cod_rel: cod_rel, des_rel: evt.value });
    this.setDs(tip_cod, cod_rel);
  }

  // --- NUEVA FUNCIÓN: DRILL DOWN DESDE LOS GRÁFICOS ---
  drillDownFromChart(htipcod: number, hcodrel: string, nombre: string) {
    // NgZone asegura que el UI de Angular se entere del cambio cuando Highcharts dispara un evento
    this.ngZone.run(() => {
      this.loader.open();
      this.principal.loading = true;
      this.tipcod4 = htipcod;
      this.codrel4 = hcodrel;
      this.tip_cod = htipcod;
      this.cod_rel = hcodrel;

      // Agregamos a la jerarquía / breadcrumb superior
      this.saveBuffer({ tip_cod: htipcod, cod_rel: hcodrel, des_rel: nombre });
      
      // Actualizamos toda la data del dashboard
      this.setDs(htipcod, hcodrel);
    });
  }

  backToTable() {
    this.selectedRow = null;
    this.loadAllChartsData();
  }

  async loadAllChartsData(): Promise<void> {
    this.isChartReady = false;
    this.loader.open();

    try {
      let tip = this.selectedRow ? this.selectedRow.htipcod : this.tip_cod;
      let rel = this.selectedRow ? this.selectedRow.hcodrel : this.cod_rel;

      await Promise.all([
        this.prepareResumenChart(tip, rel, this.currentDate),
        this.prepareIngresosSalidasChart(tip, rel, this.currentDate),
        this.prepareVariacionCliStockChart(tip, rel, this.currentDate),
        this.prepareMapaCalorChart(tip, rel, this.currentDate),
        this.prepareMapaCalorChart2(tip, rel, this.currentDate),
        this.prepareCeroCuotas01(tip, rel, this.currentDate),
        this.prepareCeroCuotas02(tip, rel, this.currentDate)
      ]);
      this.isChartReady = true;

    } catch (error) {
      console.error("Falló la carga de uno o más gráficos", error);
    } finally {
      this.loader.close();
    }
  }

  prepareIngresosSalidasChart(tip_cod: any, cod_rel: any, fecha: any): Promise<void> {
  //Gráfico de barras verticales
  return new Promise((resolve) => {
    this.antRep.getRegularTableResult("GRAF_ZCUO_02", {
      "tip_cod": tip_cod,
      "cod_rel": cod_rel,
      "fecha": fecha
    }).subscribe({
      next: (x) => {
        try {
          const r = x.body.resultado;
          let jsonString = "";

          if (r.data && r.data.length > 0) {
            const firstKey = Object.keys(r.data[0])[0];
            jsonString = r.data[0][firstKey];
          } else {
            jsonString = r.headers;
          }

          if (!jsonString) { resolve(); return; }
          const chartData = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;

          const misCategorias = (chartData.categories && chartData.categories.length > 0) 
            ? chartData.categories 
            : [];

          const procesedSeries = (chartData.series || []).map((s: any) => ({
            ...s,
            type: 'bar'
          }));

          // Guardamos referencia al componente para usar drillDownFromChart dentro de Highcharts
          const self = this;

          this.ingresosSalidasOptions = {
            chart: {
              type: 'bar',
              backgroundColor: 'transparent',
              marginLeft: 120
            },
            colors: ['#4472c4', '#00b0f0', '#a6a6a6', '#ffc000', '#ed7d31'],
            title: {
              text: 'CONCENTRACION DE SALDOS POR TERRITORIO',
              style: { fontWeight: 'bold', fontSize: '14px', color: '#000000' }
            },
            xAxis: {
              categories: misCategorias,
              labels: { style: { fontSize: '11px', color: '#000000', fontWeight: 'bold' } },
              lineWidth: 1,
              lineColor: '#666666'
            },
            yAxis: {
              min: 0,
              title: { text: 'Saldos (Miles S/)', style: { fontWeight: 'bold', color: '#000000' } },
              gridLineColor: '#e6e6e6',
              gridLineDashStyle: 'Dash',
              stackLabels: {
                enabled: true,
                style: { fontWeight: 'bold', color: '#000000', textOutline: 'none', fontSize: '11px' },
                formatter: function (this: any) { return this.total.toFixed(2) + 'M'; }
              },
              labels: { style: { fontSize: '10px' } }
            },
            plotOptions: {
              bar: {
                stacking: 'normal',
                borderWidth: 1,
                borderColor: '#ffffff',
                pointPadding: 0.1,
                groupPadding: 0.15,
                cursor: 'pointer', // Indica al usuario que es clickeable
                events: {
                  // Evento en la leyenda
                  legendItemClick: function (event: any) {
                    const seriesOpts = this.options as any;
                    if (seriesOpts.HTIPCOD && seriesOpts.HCODREL) {
                      self.drillDownFromChart(seriesOpts.HTIPCOD, seriesOpts.HCODREL, this.name);
                    }
                    return false; // Evita que la serie se oculte al dar click
                  }
                },
                point: {
                  events: {
                    // Evento en la barra directa
                    click: function (event: any) {
                      const seriesOpts = this.series.options as any;
                      if (seriesOpts.HTIPCOD && seriesOpts.HCODREL) {
                        self.drillDownFromChart(seriesOpts.HTIPCOD, seriesOpts.HCODREL, this.series.name);
                      }
                    }
                  }
                },
                dataLabels: {
                  enabled: true,
                  formatter: function (this: any) {
                    if (this.y === 0 || this.y === null) return '';
                    return this.y.toFixed(2) + 'M';
                  },
                  style: { textOutline: 'none', color: '#ffffff', fontSize: '10px', fontWeight: 'bold' }
                }
              }
            },
            series: procesedSeries,
            legend: {
              enabled: true,
              align: 'right',
              verticalAlign: 'bottom',
              layout: 'horizontal',
              itemStyle: { fontSize: '10px', fontWeight: 'normal' }
            },
            credits: { enabled: false }
          };

          this.isIngresosSalidasReady = true;
          this.detector.detectChanges();
          setTimeout(() => {
            this.updateFlagIngresosSalidas = true;
          }, 100);

          resolve();
        } catch (e) {
          console.error("Error en Concentración de Saldos:", e);
          resolve();
        }
      },
      error: () => resolve()
    });
  });
}

  prepareVariacionCliStockChart(tip_cod: any, cod_rel: any, fecha: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.antRep.getRegularTableResult("GRAF_ZCUO_01", {
        "tip_cod": tip_cod,
        "cod_rel": cod_rel,
        "fecha": fecha
      }).subscribe({
        next: (x) => {
          try {
            const r = x.body.resultado;
            let jsonString = "";

            if (r.data && r.data.length > 0) {
              const firstKey = Object.keys(r.data[0])[0];
              jsonString = r.data[0][firstKey];
            } else {
              jsonString = r.headers;
            }

            if (!jsonString) {
              resolve();
              return;
            }

            const chartData = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
            
            if (!chartData || !chartData.categories || !chartData.series || chartData.series.length === 0) {
              resolve();
              return;
            }

            // Mapeamos la data recibida del SQL (que incluye htipcod y hcodrel)
            let pieData = chartData.series[0].data.map((item: any) => {
              return {
                name: item.HDESREL,
                y: item.y,
                htipcod: item.HTIPCOD,
                hcodrel: item.HCODREL
              };
            });

            // Ordenamos de mayor a menor
            pieData.sort((a: any, b: any) => b.y - a.y);

            // Guardamos la referencia de Angular para Highcharts
            const self = this;

            this.variacionCliStockOptions = {
              chart: {
                type: 'pie',
                backgroundColor: 'transparent'
              },
              title: {
                text: 'PARTICIPACION DE SALDO POR PRODUCTO',
                align: 'left',
                style: { fontWeight: 'bold', fontSize: '14px', color: '#000000' }
              },
              colors: ['#22486b', '#2b628f', '#3677a8', '#4b91cc', '#67aae4', '#8ec9f9', '#b5e0ff'],
              plotOptions: {
                pie: {
                  innerSize: '60%',
                  borderWidth: 2,
                  borderColor: '#ffffff',
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                    enabled: true,
                    distance: -35,
                    formatter: function (this: any) {
                      if (this.percentage && this.percentage > 1) {
                        return this.percentage.toFixed(1) + '%';
                      }
                      return null;
                    },
                    style: {
                      fontWeight: 'bold',
                      color: '#ffffff',
                      textOutline: 'none',
                      fontSize: '11px'
                    }
                  },
                  showInLegend: true,
                  /*point: {
                    events: {
                      // Evento de Drill-down al clickear en la Dona
                      click: function(event: any) {
                        const customOptions = this.options as any; // Corrección TypeScript
                        const htipcod = customOptions.htipcod;
                        const hcodrel = customOptions.hcodrel;
                        const nombre = this.name;
                        
                        if(htipcod && hcodrel) {
                          self.drillDownFromChart(htipcod, hcodrel, nombre);
                        }
                      },
                      // Evento de Drill-down al clickear en la leyenda lateral
                      // legendItemClick: function(event: any) {
                      //   const customOptions = this.options as any; // Corrección TypeScript
                      //   const htipcod = customOptions.htipcod;
                      //   const hcodrel = customOptions.hcodrel;
                      //   const nombre = this.name;
                        
                      //   if(htipcod && hcodrel) {
                      //     self.drillDownFromChart(htipcod, hcodrel, nombre);
                      //   }
                        
                      //   // Retornamos false para evitar la animación por defecto de ocultar la rebanada
                      //   return false; 
                      // }
                    }
                  }*/
                }
              },
              series: [{
                type: 'pie',
                name: 'Participación',
                data: pieData
              }],
              legend: {
                enabled: true,
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                itemMarginBottom: 8,
                labelFormatter: function (this: any) {
                  return this.name;
                },
                itemStyle: { fontSize: '11px', fontWeight: 'normal', color: '#333333' }
              },
              credits: { enabled: false }
            };

            this.isVariacionReadyCli = true;
            this.detector.detectChanges();
            setTimeout(() => {
              this.updateFlagCliVariacion = true;
            }, 100);

            resolve();
          } catch (e) {
            console.error("Error procesando Gráfico de Donut:", e);
            reject(e);
          }
        },
        error: (err) => reject(err)
      });
    });
  }

  prepareMapaCalorChart(tip_cod: any, cod_rel: any, fecha: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.antRep.getRegularTableResult("GRAF_ZCUO_03", {
        "tip_cod": tip_cod,
        "cod_rel": cod_rel,
        "fecha": fecha
      }).subscribe({
        next: (x) => {
          try {
            const r = x.body.resultado;
            let jsonString = "";

            if (r.data && r.data.length > 0) {
              const firstKey = Object.keys(r.data[0])[0];
              jsonString = r.data[0][firstKey];
            } else {
              jsonString = r.headers;
            }

            if (!jsonString) { resolve(); return; }
            const chartData = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;

            const xCategories = chartData.categories;
            const yCategories = chartData.series.map((s: any) => s.name);

            let heatmapData: any[] = [];
            chartData.series.forEach((serie: any, yIndex: number) => {
              serie.data.forEach((valor: number, xIndex: number) => {
                heatmapData.push([xIndex, yIndex, valor]);
              });
            });

            this.mapaCalorOptions = {
              chart: {
                type: 'heatmap',
                backgroundColor: 'transparent',
                marginTop: 40,
                marginBottom: 80,
                plotBorderWidth: 0
              },
              title: {
                text: 'MAPA DE CALOR: TRAMO DE ATRASO vs AÑO DESEMBOLSO',
                style: { fontWeight: 'bold', fontSize: '14px', color: '#000000' }
              },
              xAxis: {
                categories: xCategories,
                title: { text: 'Año de Desembolso', style: { fontWeight: 'bold' } },
                labels: { style: { fontSize: '11px', color: '#000' } }
              },
              yAxis: {
                categories: yCategories,
                title: { text: 'Estado', style: { fontWeight: 'bold' } },
                reversed: true, //cambia el orden como se muestra el Y descendente o ascendente
                labels: { style: { fontSize: '11px', color: '#000' } }
              },
              colorAxis: {
                min: 0,
                stops: [
                  [0, '#ffffcc'],
                  [0.2, '#d9f0a3'],
                  [0.5, '#41b6c4'],
                  [0.8, '#225ea8'],
                  [1, '#081d58']
                ]
              },
              legend: {
                title: {
                  text: 'Saldos (M S/)',
                  style: { fontWeight: 'normal', fontSize: '12px' }
                },
                align: 'right',
                layout: 'vertical',
                margin: 15,
                verticalAlign: 'top',
                y: 25,
                symbolHeight: 280
              },
              tooltip: {
                formatter: function (this: any) {
                  return `<b>${this.series.xAxis.categories[this.point.x]}</b> - <b>${this.series.yAxis.categories[this.point.y]}</b><br>Saldo: <b>${this.point.value.toFixed(2)} M</b>`;
                }
              },
              series: [{
                type: 'heatmap',
                name: 'Saldos',
                borderWidth: 2,
                borderColor: '#ffffff',
                data: heatmapData,
                dataLabels: {
                  enabled: true,
                  formatter: function (this: any) {
                    return this.point.value.toFixed(2);
                  },
                  style: {
                    textOutline: 'none',
                    fontSize: '11px',
                    fontWeight: 'normal'
                  }
                }
              } as any],
              credits: { enabled: false }
            };

            this.isMapaCalorReady = true;
            this.detector.detectChanges();
            setTimeout(() => {
              this.updateFlagMapaCalor = true;
            }, 100);

            resolve();
          } catch (e) {
            console.error("Error procesando Mapa de Calor:", e);
            reject(e);
          }
        },
        error: (err) => reject(err)
      });
    });
  }

  prepareMapaCalorChart2(tip_cod: any, cod_rel: any, fecha: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.antRep.getRegularTableResult("GRAF_ZCUO_04", {
        "tip_cod": tip_cod,
        "cod_rel": cod_rel,
        "fecha": fecha
      }).subscribe({
        next: (x) => {
          try {
            const r = x.body.resultado;
            let jsonString = "";

            if (r.data && r.data.length > 0) {
              const firstKey = Object.keys(r.data[0])[0];
              jsonString = r.data[0][firstKey];
            } else {
              jsonString = r.headers;
            }

            if (!jsonString) { resolve(); return; }
            const chartData = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;

            const xCategories = chartData.categories;
            const yCategories = chartData.series.map((s: any) => s.name);

            let heatmapData: any[] = [];
            chartData.series.forEach((serie: any, yIndex: number) => {
              serie.data.forEach((valor: number, xIndex: number) => {
                heatmapData.push([xIndex, yIndex, valor]);
              });
            });

            this.mapaCalorOptions2 = {
              chart: {
                type: 'heatmap',
                backgroundColor: 'transparent',
                marginTop: 40,
                marginBottom: 80,
                plotBorderWidth: 0
              },
              title: {
                text: 'MAPA DE CALOR: ESTADO vs AÑO DESEMBOLSO - ORIENTE',
                style: { fontWeight: 'bold', fontSize: '14px', color: '#000000' }
              },
              xAxis: {
                categories: xCategories,
                title: { text: 'Año de Desembolso', style: { fontWeight: 'bold' } },
                labels: { style: { fontSize: '11px', color: '#000' } }
              },
              yAxis: {
                categories: yCategories,
                title: { text: 'Estado', style: { fontWeight: 'bold' } },
                reversed: false,
                labels: { style: { fontSize: '11px', color: '#000' } }
              },
              colorAxis: {
                min: 0,
                stops: [
                  [0, '#ffffcc'],
                  [0.2, '#d9f0a3'],
                  [0.5, '#41b6c4'],
                  [0.8, '#225ea8'],
                  [1, '#081d58']
                ]
              },
              legend: {
                title: {
                  text: 'Saldos (M S/)',
                  style: { fontWeight: 'normal', fontSize: '12px' }
                },
                align: 'right',
                layout: 'vertical',
                margin: 15,
                verticalAlign: 'top',
                y: 25,
                symbolHeight: 280
              },
              tooltip: {
                formatter: function (this: any) {
                  return `<b>${this.series.xAxis.categories[this.point.x]}</b> - <b>${this.series.yAxis.categories[this.point.y]}</b><br>Saldo: <b>${this.point.value.toFixed(2)} M</b>`;
                }
              },
              series: [{
                type: 'heatmap',
                name: 'Saldos',
                borderWidth: 2,
                borderColor: '#ffffff',
                data: heatmapData,
                dataLabels: {
                  enabled: true,
                  formatter: function (this: any) {
                    return this.point.value.toFixed(2);
                  },
                  style: {
                    textOutline: 'none',
                    fontSize: '11px',
                    fontWeight: 'normal'
                  }
                }
              } as any],
              credits: { enabled: false }
            };

            this.isMapaCalorReady2 = true;
            this.detector.detectChanges();
            setTimeout(() => {
              this.updateFlagMapaCalor2 = true;
            }, 100);

            resolve();
          } catch (e) {
            console.error("Error procesando Mapa de Calor:", e);
            reject(e);
          }
        },
        error: (err) => reject(err)
      });
    });
  }

  prepareResumenChart(tip_cod: any, cod_rel: any, fecha: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.antRep.getRegularTableResult("GRAF_GEST_COM_01", {
        "tip_cod": tip_cod,
        "cod_rel": cod_rel,
        "fecha": fecha
      }).subscribe({
        next: (x) => {
          try {
            const r = x.body.resultado;
            let jsonString = "";

            if (r.data && r.data.length > 0) {
              const firstKey = Object.keys(r.data[0])[0];
              jsonString = r.data[0][firstKey];
            } else {
              jsonString = r.headers;
            }

            if (!jsonString) { resolve(); return; }
            const chartData = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;

            if (!chartData || !chartData.categories || !chartData.series) {
              throw new Error("El JSON no es válido.");
            }

            const seriesConfig = chartData.series.map((serie: any) => {
              if (serie.name.toLowerCase().includes('tapp')) {
                return {
                  type: 'line',
                  name: serie.name,
                  data: serie.data.map((val: any) => val * 100),
                  yAxis: 1,
                  color: '#3F51B5',
                  zIndex: 2,
                  dataLabels: {
                    enabled: true,
                    formatter: function (this: any) {
                      return this.y.toFixed(2) + '%';
                    },
                    style: { fontSize: '10px', color: '#3F51B5', fontWeight: 'bold' }
                  },
                  marker: { enabled: true, radius: 4, fillColor: '#3F51B5' }
                };
              }

              return {
                type: 'column',
                name: serie.name,
                data: serie.data,
                yAxis: 0,
                color: '#4DD0E1',
                zIndex: 1,
                dataLabels: {
                  enabled: true,
                  formatter: function (this: any) {
                    return (this.y / 1000000).toFixed(1) + ' M';
                  },
                  style: { fontSize: '10px', fontWeight: 'bold' }
                }
              };
            });

            this.resumenGeneralOptions = {
              chart: { zoomType: 'xy' },
              title: { text: null },
              xAxis: {
                categories: chartData.categories,
                crosshair: true
              },
              yAxis: [
                {
                  title: { text: '' },
                  labels: {
                    formatter: function (this: any) {
                      return (this.value / 1000000) + ' M';
                    }
                  }
                },
                {
                  title: { text: '' },
                  opposite: true,
                  min: 0,
                  max: 100,
                  gridLineWidth: 0,
                  labels: {
                    formatter: function (this: any) {
                      return this.value + '%';
                    }
                  }
                }
              ],
              plotOptions: {
                column: { pointPadding: 0.1, groupPadding: 0.1, borderWidth: 0 }
              },
              series: seriesConfig,
              tooltip: {
                shared: true,
                formatter: function (this: any) {
                  let s = `<b>Día ${this.x}</b><br/>`;
                  this.points.forEach((point: any) => {
                    const isTapp = point.series.name.toLowerCase().includes('tapp');
                    const val = isTapp ? point.y.toFixed(2) + '%' : point.y.toLocaleString();
                    s += `<span style="color:${point.color}">●</span> ${point.series.name}: <b>${val}</b><br/>`;
                  });
                  return s;
                }
              },
              legend: { enabled: true, align: 'left', verticalAlign: 'top' },
              credits: { enabled: false }
            };

            this.isResumenReady = true;
            this.detector.detectChanges();
            setTimeout(() => {
              this.updateFlagResumen = true;
            }, 100);

            resolve();
          } catch (e) {
            reject(e);
          }
        },
        error: (err) => reject(err)
      });
    });
  }

  // Evento que se dispara al dar clic en los breadcrumbs superiores para retroceder
  changeHier(item: any) {
    if (this.principal.hierBuffer.length - 1 == item.idx) {
      return;
    }
    this.loader.open();
    this.principal.loading = true;
    let tip_cod = item.tip_cod;
    let cod_rel = item.cod_rel;
    
    // Actualizamos el estado global del componente
    this.tip_cod = tip_cod;
    this.cod_rel = cod_rel;
    this.tipcod4 = item.tip_cod;
    this.codrel4 = item.cod_rel;

    // Recortamos el arreglo para descartar los niveles inferiores
    this.principal.hierBuffer = this.principal.hierBuffer.slice(0, item.idx + 1);
    
    let l = this.principal.hierBuffer.length;
    let ci = this.principal.hierBuffer[l - 1];

    this.setCurrHier(ci.des_rel, ci.tip_cod);
    
    // Recargamos el tablero entero (tablas y todos los gráficos)
    this.setDs(tip_cod, cod_rel);
  }

  preLoad() {
    if (!this.firstload) {
      this.loading = true;
      this.loader.open();
      this.load0.next(false);
    }
  }

  loadData() {
    if (this.tip_cod && this.cod_rel) {
      this.preLoad();
      this.setDs(this.lvh.tip_cod,this.lvh.cod_rel)//(this.tip_cod, this.cod_rel);
    }
  }


  private setDs(tip_cod: number, cod_rel: string) {
   // console.log(tip_cod,cod_rel)
    const fondoDinamicoFn = function (params: any) {
      let val = Number(params.value);
      if (isNaN(val)) return {};
      if (val > 0) {
        return { 'background-color': '#dcfce7', 'color': '#166534', 'font-weight': 'bold' };
      } else if (val < 0) {
        return { 'background-color': '#fee2e2', 'color': '#991b1b', 'font-weight': 'bold' };
      }
      return {};
    };

    const inyectarEstilos = (columnas: any[]) => {
      columnas.forEach(col => {
        if (col.subs && col.subs.length > 0) {
          inyectarEstilos(col.subs);
        } else {
          if (col.label !== 'Descripción') {
            col.cellStyleFn = fondoDinamicoFn;
          }
        }
      });
    };

    this.antRep.getRegularTableResult("RS_CARD_ZCUO_01", { //RS_GEST_COM_01
      "tip_cod": tip_cod,
      "cod_rel": cod_rel,
      "fecha": this.currentDate
    }).subscribe(x => {
      let r = x.body.resultado;
      this.dataSource = r.data;
      this.dataSource3 = r.data;
      this.setKpiValues(r.data);
      this.prepareResumenChart(tip_cod, cod_rel, this.currentDate);
      this.prepareIngresosSalidasChart(tip_cod, cod_rel, this.currentDate);
      this.prepareVariacionCliStockChart(tip_cod, cod_rel, this.currentDate);
      this.prepareMapaCalorChart(tip_cod, cod_rel, this.currentDate);
      this.prepareMapaCalorChart2(tip_cod, cod_rel, this.currentDate);
      this.prepareCeroCuotas01(tip_cod, cod_rel, this.currentDate);
      this.prepareCeroCuotas02(tip_cod, cod_rel, this.currentDate);

      this.load0.next(true);
    }); 
    // --- TABLA 02 ---
      this.antRep.getRegularTableResult("RS_TOP_ZCUO_01", {
        "tip_cod": tip_cod,
        "cod_rel": cod_rel,
        "fecha":  this.currentDate 
      }).subscribe(x => {
        let r = x.body.resultado;  
        this.dataSource4 = r.data;
        
        // Parseamos e inyectamos los estilos
        let headersParseados = JSON.parse(r.headers);
        inyectarEstilos(headersParseados);
        this.headerDefs4 = headersParseados;
      });

  }

  toggleDropdown(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  private buildLineChartOptions(title: string, categories: string[], seriesData: any[], isMillions: boolean): Highcharts.Options {
    return {
      chart: { type: 'line', backgroundColor: 'transparent' },
      title: { text: title, style: { fontWeight: 'bold', fontSize: '14px', color: '#004B8D' } },
      xAxis: { categories: categories, crosshair: true, labels: { style: { fontSize: '10px', fontWeight: 'bold' } } },
      yAxis: {
        title: { text: null },
        labels: {
          formatter: function (this: any) {
            return isMillions ? this.value + ' M' : this.value;
          },
          style: { fontSize: '10px' }
        },
        gridLineColor: '#e6e6e6'
      },
      tooltip: { shared: true },
      plotOptions: {
        line: {
          marker: { enabled: true, radius: 4 },
          dataLabels: {
            enabled: true,
            formatter: function (this: any) {
              if (this.y === 0 || this.y === null) return '';
              return isMillions ? this.y.toFixed(2) + ' M' : Highcharts.numberFormat(this.y, 0, ',', '.');
            },
            style: { fontSize: '9px', fontWeight: 'bold', textOutline: 'none', color: '#000000' }
          }
        }
      },
      series: seriesData as any,
      legend: { align: 'center', verticalAlign: 'bottom', itemStyle: { fontSize: '11px', fontWeight: 'normal' } },
      credits: { enabled: false }
    };
  }

  prepareCeroCuotas01(tip_cod: any, cod_rel: any, fecha: any): Promise<void> {
    return new Promise((resolve) => {
      this.antRep.getRegularTableResult("REP_CERCUOT_01", {
        "tip_cod": tip_cod, "cod_rel": cod_rel, "fecha": fecha
      }).subscribe({
        next: (x) => {
          try {
            const r = x.body.resultado;
            if (!r.data || r.data.length === 0) { resolve(); return; }

            const rawData = r.data;
            const parseNum = (val: any) => (val !== null && val !== undefined) ? Number(val) : null;
            const parseMM = (val: any) => (val !== null && val !== undefined) ? Number(val) / 1000000 : null;

            const categories = rawData.map((row: any) => Object.values(row)[1]);

            this.ceroCuotasNumOptions = this.buildLineChartOptions('Cero Cuotas Nuevo Ingreso (N°)', categories, [
              { name: 'Total Nro', data: rawData.map((r: any) => parseNum(Object.values(r)[4])), color: '#a6a6a6' },
              { name: 'Nuevo Ingreso', data: rawData.map((r: any) => parseNum(Object.values(r)[2])), color: '#4472c4' },
              { name: 'Mantiene', data: rawData.map((r: any) => parseNum(Object.values(r)[6])), color: '#ffc000' }
            ], false);

            this.ceroCuotasMontoOptions = this.buildLineChartOptions('Cero Cuotas Nuevo Ingreso (S/MM)', categories, [
              { name: 'Total Saldo', data: rawData.map((r: any) => parseMM(Object.values(r)[5])), color: '#a6a6a6' },
              { name: 'Nuevo Ingreso', data: rawData.map((r: any) => parseMM(Object.values(r)[3])), color: '#4472c4' },
              { name: 'Mantiene', data: rawData.map((r: any) => parseMM(Object.values(r)[7])), color: '#ffc000' }
            ], true);

            this.isCeroCuotas1Ready = true;
            this.detector.detectChanges();
            setTimeout(() => { this.updateFlagCeroCuotas1 = true; }, 100);
            resolve();
          } catch (e) {
            console.error("Error Cero Cuotas 01:", e);
            resolve();
          }
        },
        error: () => resolve()
      });
    });
  }

  prepareCeroCuotas02(tip_cod: any, cod_rel: any, fecha: any): Promise<void> {
    return new Promise((resolve) => {
      this.antRep.getRegularTableResult("REP_CERCUOT_02", {
        "tip_cod": tip_cod, "cod_rel": cod_rel, "fecha": fecha
      }).subscribe({
        next: (x) => {
          try {
            const r = x.body.resultado;
            if (!r.data || r.data.length === 0) { resolve(); return; }

            const rawData = r.data;
            const parseNum = (val: any) => (val !== null && val !== undefined) ? Number(val) : null;
            const parseMM = (val: any) => (val !== null && val !== undefined) ? Number(val) / 1000000 : null;

            const categories = rawData.map((row: any) => Object.values(row)[1]);

            this.ceroCuotasAtrasoNumOptions = this.buildLineChartOptions('Nuevo Ingreso x Tramos de Atraso (N°)', categories, [
              { name: '1. <=8 días', data: rawData.map((r: any) => parseNum(Object.values(r)[2])), color: '#4472c4' },
              { name: '2. <9 - 15 días', data: rawData.map((r: any) => parseNum(Object.values(r)[4])), color: '#00b0f0' },
              { name: '3. <16 - 30 días', data: rawData.map((r: any) => parseNum(Object.values(r)[6])), color: '#ffc000' },
              { name: '4. >31 días', data: rawData.map((r: any) => parseNum(Object.values(r)[8])), color: '#e53935' }
            ], false);

            this.ceroCuotasAtrasoMontoOptions = this.buildLineChartOptions('Nuevo Ingreso x Tramos de Atraso (S/MM)', categories, [
              { name: '1. <=8 días', data: rawData.map((r: any) => parseMM(Object.values(r)[3])), color: '#4472c4' },
              { name: '2. <9 - 15 días', data: rawData.map((r: any) => parseMM(Object.values(r)[5])), color: '#00b0f0' },
              { name: '3. <16 - 30 días', data: rawData.map((r: any) => parseMM(Object.values(r)[7])), color: '#ffc000' },
              { name: '4. >31 días', data: rawData.map((r: any) => parseMM(Object.values(r)[9])), color: '#e53935' }
            ], true);

            this.isCeroCuotas2Ready = true;
            this.detector.detectChanges();
            setTimeout(() => { this.updateFlagCeroCuotas2 = true; }, 100);
            resolve();
          } catch (e) {
            console.error("Error Cero Cuotas 02:", e);
            resolve();
          }
        },
        error: () => resolve()
      });
    });
  }

  setKpiValues(data: any[]) {
    if (data && data.length > 0) {
      const row0 = data[0]; 

      this.kpi_saldo_act	= row0.saldo_act || 0;
      this.kpi_saldo_ant	= row0.saldo_ant || 0;
      this.kpi_dif_saldo	= row0.dif_saldo || 0;
      this.kpi_zcuonuevo_act = row0.zcuonuevo_act || 0;	
      this.kpi_zcuonuevo_ant = row0.zcuonuevo_ant || 0;	
      this.kpi_dif_zcuonuevo = row0.dif_zcuonuevo || 0;	
      this.kpi_may60_act = row0.may60_act || 0;	
      this.kpi_may60_ant = row0.may60_ant || 0;	
      this.kpi_dif_may60 = row0.dif_may60 || 0;	
      this.kpi_men60_act = row0.men60_act || 0;	
      this.kpi_men60_ant = row0.men60_ant || 0;	
      this.kpi_dif_men60 = row0.dif_men60 || 0;

      this.kpi_prod_ind = row0.prod_ind || 0;
      this.kpi_tmm_prod = row0.TMMPROD || 0;
      this.kpi_perc_cumpl = (row0.Percent_Cumpl || 0) * 100;
      this.kpi_perce_cump_clinuevo = (row0.Percent_Cumpl_clinuevo || 0) * 100;
      this.kpi_perc_avance = (row0.percent_avance_hoy || 0) * 100;
      this.kpi_tick_prom = row0.tick_prom_2 || 0;
      this.kpi_tmm_tick = row0.TMM_TICK || 0;
      this.kpi_perc_ticket = (row0.percent_avance_ticket || 0) * 100;

      this.kpi_cli_stock = row0.cli_stock_2 || 0;
      this.kpi_tmm_cli_stock = row0.TMMCLISTOCK || 0;
      this.kpi_perc_cli_stock = (row0.percent_avance_cli_stock || 0) * 100;

      this.kpi_mont_dese = row0.mont_dese_2 || 0;
      this.kpi_tmm_desemb = row0.TMMDESEMB || 0;
      this.cumpldesembolsometadi = row0.percentcumpldesembolsometadi || 0;
      this.kpi_perc_montode = (row0.percent_avance_montode || 0) * 100;

      this.kpi_cart_vig = row0.sal_vig_2 || 0;
      this.kpi_var_cart_vig = row0.HVSALVIGMN || 0;

      this.kpi_cli_nuevos = row0.HNUMCLIN || 0;
      this.kpi_tmm_cli_nuevos = row0.TMMCLINUEV || 0;

      this.kpi_rodamiento = row0.HRODAM || 0;
      this.kpi_sal_no_vig = row0.HSALNOVIG || 0;
      this.kpi_sal_vig = row0.HSALVIGEN || 0;

      this.kpi_resultado_operativo = this.kpi_mont_dese - this.kpi_var_cart_vig - this.kpi_rodamiento;
      this.kpi_percent_cancelado = (this.kpi_resultado_operativo / row0.hvalvar_136 || 0) * 100;

      this.tmm_rodamiento = row0.TMMRODAMIENTO || 0;
      this.tmm_TMMSALVIGE = row0.TMMSALVIGE || 0;
      this.tmm_TMMHSALNOVIG = row0.TMMHSALNOVIG || 0;

      this.meta_productividad = row0.hvalvar_8070;
      this.meta_ticket = row0.hvalvar_134;
      this.meta_desem = row0.hvalvar_133;
      this.metadiariacarteravigente = row0.hvalvar_10256;
      this.distdiariacartvig = row0.distdiariacartvig;
      this.meta_cancela = row0.hvalvar_136;
      this.meta_varstockclie = row0.hvalvar_10062;
      this.meta_clinuevo = row0.hvalvar_166;

      this.kpi_perc_clinuev = (row0.percent_avance_cli_nuevos || 0) * 100;

    } else {
      this.kpi_saldo_act	= 0;
      this.kpi_saldo_ant	= 0;
      this.kpi_dif_saldo	= 0;
      this.kpi_zcuonuevo_act = 0;	
      this.kpi_zcuonuevo_ant = 0;	
      this.kpi_dif_zcuonuevo = 0;	
      this.kpi_may60_act = 0;	
      this.kpi_may60_ant = 0;	
      this.kpi_dif_may60 = 0;	
      this.kpi_men60_act = 0;	
      this.kpi_men60_ant = 0;	
      this.kpi_dif_men60 = 0;

      this.kpi_prod_ind = 0; this.kpi_tmm_prod = 0; this.kpi_perc_cumpl = 0; this.kpi_perc_avance = 0;
      this.kpi_tick_prom = 0; this.kpi_tmm_tick = 0; this.kpi_perc_ticket = 0;
      this.kpi_cli_stock = 0; this.kpi_tmm_cli_stock = 0; this.kpi_perc_cli_stock = 0;
      this.kpi_perce_cump_clinuevo = 0;
      this.kpi_cart_vig = 0; this.kpi_var_cart_vig = 0;
      this.kpi_cli_nuevos = 0; this.kpi_tmm_cli_nuevos = 0;
      this.kpi_rodamiento = 0;
      this.kpi_sal_no_vig = 0;
      this.kpi_sal_vig = 0;
      this.kpi_resultado_operativo = 0;
      this.tmm_rodamiento = 0;
      this.tmm_TMMSALVIGE = 0;
      this.tmm_TMMHSALNOVIG = 0;
      this.meta_productividad = 0;
      this.meta_ticket = 0;
      this.meta_desem = 0;
      this.metadiariacarteravigente = 0;
      this.distdiariacartvig = 0;
      this.meta_cancela = 0;
      this.meta_varstockclie = 0;
      this.meta_clinuevo = 0;
      this.cumpldesembolsometadi = 0;
      this.kpi_perc_clinuev = 0;
    }
  }

  private getBaseHierAsync(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.antAdmin.getBaseHierarchy(this.user.email, 9).subscribe({
        next: (x) => {
          let br: any = x.body;
          let h = br.base_hierarchy;

          if (!isNullOrUndefined(h)) {
            this.tip_cod = h[0].tip_cod;
            this.cod_rel = h[0].cod_rel;
            this.tipcod4 = h[0].tip_cod;
            this.codrel4 = h[0].cod_rel;
            this.imp = h[0].imp;

            let currentDate = moment(this.curr_fec).format("YYYY-MM-DD");

            this.antAdmin.getLevelHierarchy(9, h[0].lvl, this.tip_cod, [this.cod_rel], { key: "fec", val: currentDate }).subscribe({
              next: (x) => {
                let lh = x.body.level_hierarchy;

                if (lh && lh.length > 0) {
                  let cl = lh[0];
                  this.saveBuffer({ tip_cod: cl.tip_cod, cod_rel: cl.cod_rel, des_rel: cl.des_rel });
                  this.tip_cod = h[0].tip_cod;

                  this.antRep.getRegularTableResult("RS_CARD_ZCUO_01", {
                    "tip_cod": this.tip_cod,
                    "cod_rel": this.cod_rel,
                    "fecha": this.currentDate
                  }).subscribe(x => {
                    let r = x.body.resultado;
                    this.setKpiValues(r.data);
                    console.log(this.kpi_saldo_act)
                    this.dataSource = r.data;
                    this.dataSource3 = r.data;
                    this.headerDefs = tablaTab1;
                    this.headerDefs3 = tablaTab2;
                    this.prepareResumenChart(this.tip_cod, this.cod_rel, this.currentDate);
                    this.prepareIngresosSalidasChart(this.tip_cod, this.cod_rel, this.currentDate);
                    this.prepareVariacionCliStockChart(this.tip_cod, this.cod_rel, this.currentDate);
                    this.prepareMapaCalorChart(this.tip_cod, this.cod_rel, this.currentDate);
                    this.prepareMapaCalorChart2(this.tip_cod, this.cod_rel, this.currentDate);
                    this.prepareCeroCuotas01(this.tip_cod, this.cod_rel, this.currentDate);
                    this.prepareCeroCuotas02(this.tip_cod, this.cod_rel, this.currentDate);
                    this.load0.next(true);
                  });

                  // --- TABLA 02 ---
                    this.antRep.getRegularTableResult("RS_TOP_ZCUO_01", {
                      "tip_cod": this.tip_cod,
                      "cod_rel": this.cod_rel,
                      "fecha":  this.currentDate 
                    }).subscribe(x => {
                      let r = x.body.resultado;  
                      this.dataSource4 = r.data;
                      let headersParseados = JSON.parse(r.headers);
              
                      /*const fondoDinamicoFn = function (params: any) {
                        if (params.value == null || params.value === '') return { 'background-color': '#ffffff' }; 
                        let valorLimpio = String(params.value).replace(/,/g, '').trim();
                        let val = Number(valorLimpio);
                        if (isNaN(val)) return { 'background-color': '#ffffff' };
                        if (val > 0) return { 'background-color': '#dcfce7', 'color': '#166534', 'font-weight': 'bold' }; 
                        else if (val < 0) return { 'background-color': '#fee2e2', 'color': '#991b1b', 'font-weight': 'bold' }; 
                        return { 'background-color': '#ffffff' }; 
                      };
    
                      const inyectarEstilos = (columnas: any[]) => {
                        columnas.forEach(col => {
                          if (col.subs && col.subs.length > 0) {
                            inyectarEstilos(col.subs);
                          } else {
                            if (col.label !== 'Descripción') {
                              col.cellStyleFn = fondoDinamicoFn;
                            }
                          }
                        });
                      };
                      inyectarEstilos(headersParseados);*/
                      this.headerDefs4 = headersParseados;
                    });

                  resolve();
                } else {
                  resolve();
                }
              },
              error: (err) => reject(err)
            });
          } else {
            resolve();
          }
        },
        error: (err) => reject(err)
      });
    });
  }

  obtenerClaseColor(valor: number): string {
    const porcentaje = valor * 100;
    if (porcentaje >= 100) {
      return 'text-green';
    } else if (porcentaje >= 80) {
      return 'text-yellow';
    } else {
      return 'text-red';
    }
  }

  private setCurrHier(des_rel: string, tip_cod: number) {
    this.curr_hier.des_rel = des_rel;
    if (tip_cod == 18) {
      this.curr_hier.des_lab = "Unidad";
    } else if (tip_cod == 19) {
      this.curr_hier.des_lab = "Corredor";
    } else if (tip_cod == 20) {
      this.curr_hier.des_lab = "Territorio";
    } else if (tip_cod == 21) {
      this.curr_hier.des_lab = "Grupo";
    } else {
      this.curr_hier.des_lab = "Total";
    }
  }
}