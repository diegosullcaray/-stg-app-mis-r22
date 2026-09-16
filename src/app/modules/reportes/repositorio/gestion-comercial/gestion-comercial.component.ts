  import * as moment from 'moment';
  import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
  import { UserService } from "app/system/admin/services/user.service";
  import { ModRepService } from "../../compartido/servicios/mod-rep.service";
  import { cloneObject, isNullOrUndefined, onNullOrUndefined } from 'app/core/shared/functions.util';
  import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
  import {  principalConfig,  tablaTab1,  tablaTab2,  tableHeadersModal,  tblOpts } from './gestion-comercial.util';
  import { BehaviorSubject, combineLatest } from 'rxjs'; 
  import { ModSysAdminService } from 'app/core/data/remote/instances/mod-sys-admin.service';
  import * as Highcharts from 'highcharts';
  import { MatDialog, MatDialogRef } from '@angular/material/dialog';
  import { StgPaginatorComponent } from 'app/core/screen/components/stg-paginator/stg-paginator.component';
  import { prepareDataForPagination } from 'app/core/screen/components/stg-paginator/stg-paginator.util';
import { tableConfOPTS } from '../agenda-comercial/agenda-comercial.util';

  @Component({
      selector: 'app-gestion-comercial.component',
      templateUrl: './gestion-comercial.component.html',
      styleUrls: ['./gestion-comercial.component.scss']
  })
  export class GestionComercialComponent implements OnInit {
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
    tip_cod2: any;
    dataSource: any;
    dataSource2: any;
    dataSource3: any;
    dataSource4: any;
    dataSource5: any;
    modalData: any;
    headerDefs: any;
    headerDefs2: any;
    headerDefs3: any;
    headerDefs4: any;
    headerDefs5: any;
    load0: BehaviorSubject<boolean>;
    loading: boolean;
    Opts: any;
    Opts2: any;
    TsaldoCapital: any;
    TsaldoVencido: any;
    TNumCliente: any;
    Textension: any;
    
    showChart: boolean = false;
    chartData: any[] = [];
    selectedRow: any = null;
    headerDefsModal: any;

    Highcharts = Highcharts;
    nivel: string; 
    saldoPorCultivoOptions: Highcharts.Options = {};
    saldoVencidoPorCultivoOptions: Highcharts.Options = {}; 
    clientesPorCultivoOptions: Highcharts.Options = {};
    resumenGeneralOptions: Highcharts.Options = {};
    isChartReady: boolean = false;  
    modalTitle: string = ''; 
    private detailDataMap = new Map<string, any[]>();
    showPaginator: boolean;
    dataSource3Length: number; 
    dataSource3Page: any;
    modalSalcartera: any;
    modalSaldoVencido: any;
    modalSExtension: any;
    modalPercenSVencido: any;
    saldoCarteraMA: any;
    saldoVencidoMA: any;
    numcliMA: any;
    kpi_prod_ind: number = 0;       
    kpi_tmm_prod: number = 0;       
    kpi_perc_cumpl: number = 0;      
    kpi_perce_cump_clinuevo: number=0;
    kpi_perc_avance: number = 0;  
    kpi_tick_prom: number = 0;
    kpi_tmm_tick: number = 0;
    kpi_perc_ticket: number = 0;  
    kpi_mont_dese: number = 0;
    kpi_tmm_desemb: number = 0;
    kpi_perc_montode: number = 0;
    kpi_perc_clinuev: number=0;
    kpi_cli_stock: number = 0;
    kpi_tmm_cli_stock: number = 0;
    kpi_perc_cli_stock: number = 0;
    kpi_cart_vig: number = 0;
    kpi_var_cart_vig: number = 0;
    kpi_cli_nuevos: number = 0;
    kpi_tmm_cli_nuevos: number = 0;

    public saldoCarteraOptions: Highcharts.Options = {};
    public updateFlagSaldo: boolean = false;
    public variacionStockOptions: Highcharts.Options = {};
    public variacionCliStockOptions : Highcharts.Options = {};
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
    
    tmm_rodamiento : number = 0;
    tmm_TMMSALVIGE : number = 0;
    tmm_TMMHSALNOVIG : number = 0;

    meta_productividad: number =0;
    meta_ticket : number = 0;
    meta_desem : number= 0;
    metadiariacarteravigente: number=0
    distdiariacartvig: number=0;
    meta_cancela: number=0;
    meta_varstockclie: number=0;
    meta_clinuevo: number=0;
    cumpldesembolsometadi: number=0;
    Opts4: any;

    public updateFlagResumen: boolean = false;
    public isResumenReady: boolean = false;
    public isSaldoReady: boolean = false; 
    public isVariacionReady: boolean = false; // NUEVA
    public isVariacionReadyCli : boolean = false;
    public isVariacionReadyT: boolean = false; // NUEVA
    public isIngresosSalidasReady: boolean = false; // NUEVA
    public isIngresosSalidasReadyt: boolean = false; // NUEVA

    extMA: any;
    @ViewChild("paginator",{"static":false}) paginatorVC:StgPaginatorComponent;
    isDropdownOpen: boolean = false;
    currentDate: any;
    selector1: any;
    filter1: any;
    firstload: boolean;
    activeTab: string = 'prod';
    
    setTab(tabName: string) {
      this.activeTab = tabName;
    }
    @ViewChild('dropdownContainer', { static: false }) dropdownContainer: ElementRef;

    constructor(
      private loader: StgAppLoaderService,
      private user: UserService, 
      private dialog: MatDialog,
      private antAdmin: ModSysAdminService,
      public antRep: ModRepService, 
      private detector: ChangeDetectorRef,
    ){
      this.setDefaults();
    }

    eventChangePage(event:any) {
      this.filterPage(event.page)
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

    filterPage(page:number){  
      this.modalData = this.dataSource3Page.filter( p => p.idPage == page );
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
      this.modalSalcartera = this.modalData.reduce((acumulador,item) =>{
        const hcapmonValor = Number(item.HCAPMON) || 0; 
        return acumulador + hcapmonValor;
      }, 0); 
      this.modalSaldoVencido = this.modalData.reduce((acumulador,item) =>{
        const HVENMONValor = Number(item.HVENMON) || 0; 
        return acumulador + HVENMONValor;
      }, 0); 

      this.modalSExtension = this.modalData.reduce((acumulador,item) =>{
        const EXTValor = Number(item.HEXTENS) || 0; 
        return acumulador + EXTValor;
      }, 0);

      this.modalPercenSVencido = ((this.modalSaldoVencido / this.modalSalcartera) * 100)
      
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
      this.loadFilter();
      await this.getBaseHierAsync()
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
    // Agrega este método en tu componente
    onFechaChange(item: any) {
      if (!item) return;
  
      // 1. Extraemos EXCLUSIVAMENTE el valor del string de la fecha.
      // Validamos si viene directo en item.val o si está anidado en item.fecha.val
      this.currentDate = item.val || (item.fecha ? item.fecha.val : item); 
      
      // 2. Mantenemos el objeto completo en selector1. 
      // Esto es vital para que el combo no pierda su 'label' visual en la UI.
      this.selector1 = item;
  
      // 3. Disparamos el recálculo (asegúrate de que eventFilter llame a this.setDs)
      this.eventFilter({
        source: {
          value: item,
          selected: true
        },
        isUserInput: true
      });
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

    ddHier(evt: any) { 
      let style = evt.row.STYLE;
      let key = evt.key; 
      let tip_cod = evt.row.htipcod;
      if (key !== 'descripcion') {
        return; 
    }
      
      // if(key =='prod_ind' ||key =='Percent_Cumpl' ||key =='TMMPROD'   ||key =='mont_dese_2'  ||key =='percent_avance_montode' ||key =='tick_prom_2' ||key =='TMM_TICK' ||key =='sal_vig_2'
      // ||key =='HVSALVIGMN' ||key =='hvalvar_9000' ||key =='cli_stock_2' ||key =='TMMCLISTOCK' ||key =='HNUMCLIN' ||key =='TMMCLINUEV' ||key =='tapp_mes_2' ||key =='TMMTAPP'
      // ){
      //   this.nivel = this.capitalizeText(evt.row.rdesjer); 
      //   this.selectedRow = evt.row;
      //   // this.loadAllChartsData(); 
      //   return;
      // }
      // if (tip_cod == 999 ||  tip_cod==2) {
      //   return;
      // }
      this.loader.open();
      this.tipcod4 = tip_cod;
      this.codrel4 = evt.row.cod_rel;
      this.principal.loading = true;  
      let cod_rel = evt.row.hcodrel; 
      this.saveBuffer({ tip_cod: tip_cod, cod_rel: cod_rel, des_rel: evt.value }); 
      this.setDs(tip_cod, cod_rel); 
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
          this.prepareSaldoCarteraVigente(tip, rel, this.currentDate),
          this.prepareVariacionStockChart(tip, rel, this.currentDate),
          this.prepareIngresosSalidasChart(tip, rel, this.currentDate),
          this.prepareIngresosSalidasChartT(tip, rel, this.currentDate),
          this.prepareVariacionStockChartT(tip, rel, this.currentDate)
        ]); 
        this.isChartReady = true;

      } catch (error) {
        console.error("Falló la carga de uno o más gráficos", error);
      } finally {
        this.loader.close();
      }
    }

    prepareIngresosSalidasChart(tip_cod: any, cod_rel: any, fecha: any): Promise<void> {
      return new Promise((resolve) => {
        this.antRep.getRegularTableResult("GRAF_GEST_COM_04", { 
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

              this.ingresosSalidasOptions = {
                chart: {
                  type: 'column',
                  backgroundColor: 'transparent',
                  marginLeft: 85,
                  events: {
                    render: function(this: any) {
                      const chart = this;
                      if (chart.customLabelIng) chart.customLabelIng.destroy();
                      if (chart.customLabelSal) chart.customLabelSal.destroy();

                      chart.customLabelIng = chart.renderer.text('INGRESOS', chart.plotLeft - 80, chart.plotTop + 15)
                        .css({ color: '#689f38', fontSize: '11px', fontWeight: 'bold' }).add();

                      const yZeroPos = chart.yAxis[0].toPixels(0);
                      chart.customLabelSal = chart.renderer.text('SALIDAS', chart.plotLeft - 80, yZeroPos + 18)
                        .css({ color: '#c62828', fontSize: '11px', fontWeight: 'bold' }).add();
                    }
                  }
                },
                title: { text: null },
                xAxis: {
                  categories: chartData.categories, 
                  labels: { style: { fontSize: '10px' } }
                },
                yAxis: {
                  title: { text: null },
                  gridLineColor: '#f0f0f0',
                  stackLabels: { 
                    enabled: true,
                    useHTML: true,
                    formatter: function(this: any) {
                      const valTotal = this.total;
                      const absTotal = Math.abs(valTotal);
                      const text = absTotal >= 1000 ? (valTotal / 1000).toFixed(1).replace('.', ',') + ' mil' : valTotal;
                      const bgColor = this.isNegative ? '#f59e9b' : '#aed581'; 
                      return `<div style="background-color:${bgColor}; color:white; padding:2px 5px; border-radius:3px; font-weight:bold; font-size:10px;">${text}</div>`;
                    }
                  },
                  labels: { 
                    formatter: function(this: any) {
                      const val = Number(this.value);
                      const absVal = Math.abs(val);
                      if (absVal >= 1000) {
                        return (val / 1000).toFixed(1).replace('.', ',') + ' mil';
                      }
                      return val.toString();
                    }
                  },
                  plotLines: [{ value: 0, color: '#000', width: 2, zIndex: 5 }]
                },
                plotOptions: {
                  column: {
                    stacking: 'normal',
                    borderWidth: 0,
                    dataLabels: {
                      enabled: true,
                      formatter: function(this: any) {
                        return this.y !== 0 ? Math.abs(this.y).toLocaleString() : '';
                      },
                      style: { textOutline: 'none', color: 'white', fontSize: '10px' }
                    }
                  }
                },
                series: chartData.series, 
                legend: { enabled: true, align: 'center', verticalAlign: 'bottom' },
                credits: { enabled: false }
              };

              this.isIngresosSalidasReady = true;
              this.detector.detectChanges();
              setTimeout(() => {
                this.updateFlagIngresosSalidas = true;
              }, 100);

              resolve();
            } catch (e) {
              console.error("Error en Ingresos/Salidas:", e);
              resolve();
            }
          },
          error: () => resolve()
        });
      });
    }

    prepareIngresosSalidasChartT(tip_cod: any, cod_rel: any, fecha: any): Promise<void> {
      return new Promise((resolve) => {
        this.antRep.getRegularTableResult("GRAF_GEST_COM_06", { 
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

              this.ingresosSalidasOptionst = {
                chart: {
                  type: 'column',
                  backgroundColor: 'transparent',
                  marginLeft: 85,
                  events: {
                    render: function(this: any) {
                      const chart = this;
                      if (chart.customLabelIng) chart.customLabelIng.destroy();
                      if (chart.customLabelSal) chart.customLabelSal.destroy();

                      chart.customLabelIng = chart.renderer.text('INGRESOS', chart.plotLeft - 80, chart.plotTop + 15)
                        .css({ color: '#689f38', fontSize: '11px', fontWeight: 'bold' }).add();

                      const yZeroPos = chart.yAxis[0].toPixels(0);
                      chart.customLabelSal = chart.renderer.text('SALIDAS', chart.plotLeft - 80, yZeroPos + 18)
                        .css({ color: '#c62828', fontSize: '11px', fontWeight: 'bold' }).add();
                    }
                  }
                },
                title: { text: null },
                xAxis: {
                  categories: chartData.categories, 
                  labels: { style: { fontSize: '10px' } }
                },
                yAxis: {
                  title: { text: null },
                  gridLineColor: '#f0f0f0',
                  stackLabels: { 
                    enabled: true,
                    useHTML: true,
                    formatter: function(this: any) {
                      const valTotal = this.total;
                      const absTotal = Math.abs(valTotal);
                      const text = absTotal >= 1000 ? (valTotal / 1000).toFixed(1).replace('.', ',') + ' mil' : valTotal;
                      const bgColor = this.isNegative ? '#f59e9b' : '#aed581'; 
                      return `<div style="background-color:${bgColor}; color:white; padding:2px 5px; border-radius:3px; font-weight:bold; font-size:10px;">${text}</div>`;
                    }
                  },
                  labels: { 
                    formatter: function(this: any) {
                      const val = Number(this.value);
                      const absVal = Math.abs(val);
                      if (absVal >= 1000) {
                        return (val / 1000).toFixed(1).replace('.', ',') + ' mil';
                      }
                      return val.toString();
                    }
                  },
                  plotLines: [{ value: 0, color: '#000', width: 2, zIndex: 5 }]
                },
                plotOptions: {
                  column: {
                    stacking: 'normal',
                    borderWidth: 0,
                    dataLabels: {
                      enabled: true,
                      formatter: function(this: any) {
                        return this.y !== 0 ? Math.abs(this.y).toLocaleString() : '';
                      },
                      style: { textOutline: 'none', color: 'white', fontSize: '10px' }
                    }
                  }
                },
                series: chartData.series, 
                legend: { enabled: true, align: 'center', verticalAlign: 'bottom' },
                credits: { enabled: false }
              };

              this.isIngresosSalidasReadyt = true;
              this.detector.detectChanges();
              setTimeout(() => {
                this.updateFlagIngresosSalidast = true;
              }, 100);

              resolve();
            } catch (e) {
              console.error("Error en Ingresos/Salidas:", e);
              resolve();
            }
          },
          error: () => resolve()
        });
      });
    }

    prepareVariacionStockChart(tip_cod: any, cod_rel: any, fecha: any): Promise<void> {
      return new Promise((resolve) => {
        this.antRep.getRegularTableResult("GRAF_GEST_COM_03", {
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

              const seriesConfig = chartData.series.map((serie: any) => {
                const isVariacion = serie.name.includes('VARIACION');
                
                return {
                  type: 'column',
                  name: serie.name,
                  data: serie.data,
                  color: isVariacion ? '#c5be97' : '#eef5b2', 
                  dataLabels: {
                    enabled: true,
                    useHTML: true,
                    formatter: function(this: any) {
                      const colorLabel = (isVariacion && this.y < 0) ? '#1a237e' : '#000';
                      return `<span style="color: ${colorLabel}; font-weight: bold; font-size: 11px;">${this.y}</span>`;
                    }
                  }
                };
              });

              this.variacionStockOptions = {
                chart: { type: 'column', backgroundColor: 'transparent' },
                title: { text: null }, 
                xAxis: {
                  categories: chartData.categories,
                  crosshair: true,
                  labels: {
                    style: { fontSize: '10px', fontWeight: 'bold', color: '#000' }
                  }
                },
                yAxis: {
                  title: { text: null },
                  gridLineColor: '#f0f0f0',
                  labels: {
                    formatter: function(this: any) {
                      return this.value >= 1000 ? (this.value / 1000) + ' mil' : this.value;
                    }
                  },
                  plotLines: [{ value: 0, color: '#666', width: 2, zIndex: 5 }] 
                },
                plotOptions: {
                  column: {
                    pointPadding: 0.1,
                    groupPadding: 0.2,
                    borderWidth: 0
                  }
                },
                series: seriesConfig,
                tooltip: { shared: true },
                legend: {
                  align: 'center',
                  verticalAlign: 'top',
                  itemStyle: { fontSize: '11px' }
                },
                credits: { enabled: false }
              };

              this.isVariacionReady = true;
              this.detector.detectChanges();
              setTimeout(() => {
                this.updateFlagVariacion = true;
              }, 100);

              resolve();
            } catch (e) {
              console.error("Error parseando Variacion:", e);
              resolve();
            }
          },
          error: () => resolve()
        });
      });
    }

    prepareVariacionCliStockChart(tip_cod: any, cod_rel: any, fecha: any): Promise<void> {
      return new Promise((resolve, reject) => {
        this.antRep.getRegularTableResult("GRAF_GEST_COM_07", {
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
              if (!chartData || !chartData.categories) {
                resolve();
                return;
              }
    
              // 1. CORRECCIÓN EN LA LÓGICA DE LAS SERIES
              const seriesConfig = chartData.series.map((serie: any) => {
                const name = serie.name.toLowerCase();
                // Verificamos si el nombre incluye "var" para saber si es la variación
                const isVariacion = name.includes('var');
    
                if (!isVariacion) { // Es "Clientes Stock" (Línea)
                  return {
                    type: 'line',
                    name: 'Cliente Stock',
                    data: serie.data,
                    yAxis: 0,
                    color: '#1565C0',
                    lineWidth: 3,
                    zIndex: 5, 
                    marker: { enabled: true, radius: 4, symbol: 'circle' },
                    dataLabels: {
                      enabled: true,
                      formatter: function(this: any) {
                        // Quitamos la división por 1 millón para mostrar clientes exactos
                        return Highcharts.numberFormat(this.y, 0, ',', '.');
                      },
                      style: { color: '#1565C0', fontSize: '10px', fontWeight: 'bold' }
                    }
                  };
                } else { // Es "Var Clientes Stock" (Columnas)
                  return {
                    type: 'column',
                    name: 'Var. Cliente Stock',
                    data: serie.data,
                    yAxis: 1,
                    color: '#80DEEA',
                    zIndex: 1,
                    dataLabels: {
                      enabled: true,
                      formatter: function(this: any) {
                        return Highcharts.numberFormat(this.y, 0, ',', '.');
                      },
                      style: { color: '#000', fontSize: '10px', fontWeight: 'bold' }
                    }
                  };
                }
              });
    
              // 2. CORRECCIÓN DE NOMBRES PARA EL HTML
              this.variacionCliStockOptions = {
                chart: { zoomType: 'xy', alignTicks: false },
                title: { text: null }, 
                xAxis: { 
                  categories: chartData.categories, 
                  crosshair: true,
                  labels: { 
                    rotation: -45,
                    style: { fontSize: '9px'}
                  }
                },
                yAxis: [
                  {   
                    title: { text: null }, 
                    labels: {
                      formatter: function(this: any) {
                        return Highcharts.numberFormat(this.value, 0, ',', '.');
                      },
                      style: { fontSize: '10px' }
                    }
                  },
                  { 
                    title: { text: null }, 
                    opposite: true,
                    gridLineWidth: 0,
                    labels: {
                      formatter: function(this: any) {
                        return Highcharts.numberFormat(this.value, 0, ',', '.');
                      },
                      style: { fontSize: '10px' }
                    },
                    plotLines: [{ value: 0, color: '#333', width: 1, zIndex: 3 }]
                  }
                ],
                series: seriesConfig,
                tooltip: { shared: true },
                credits: { enabled: false },
                legend: { 
                  align: 'left', 
                  verticalAlign: 'top',
                  itemStyle: { fontSize: '11px' }
                }
              };
    
              // Si usabas un *ngIf para mostrar el gráfico, asegúrate de actualizar esta variable también
              // this.isSaldoReady = true; <-- Recomiendo cambiarla si existe a this.isVariacionReady = true;
              this.isVariacionReadyCli = true;
              this.detector.detectChanges(); 
              setTimeout(() => {
                // 3. CORRECCIÓN DEL FLAG DE ACTUALIZACIÓN
                this.updateFlagCliVariacion = true; 
              }, 100);
    
              resolve();
            } catch (e) {
              console.error("Error procesando Variación Clientes:", e);
              reject(e);
            }
          },
          error: (err) => reject(err)
        });
      });
    }


    prepareVariacionStockChartT(tip_cod: any, cod_rel: any, fecha: any): Promise<void> {
      return new Promise((resolve) => {
        this.antRep.getRegularTableResult("GRAF_GEST_COM_05", {
          "tip_cod": tip_cod,
          "cod_rel": cod_rel,
          "fecha": fecha
        }).subscribe({
          next: (x) => {
            try {
              const r = x.body.resultado;
              //console.log(r)
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

              const seriesConfig = chartData.series.map((serie: any) => {
                const nombreSerie = serie.name.toUpperCase();
                
                // Determinamos qué tipo de serie es
                const isVariacion = nombreSerie.includes('VARIACION') && !nombreSerie.includes('META');
                const isMeta = nombreSerie.includes('META');
                
                // Asignamos el color dependiendo del tipo
                let colorSerie = '#eef5b2'; // Color por defecto (claro)
                if (isVariacion) {
                    colorSerie = '#c5be97'; // Color para la variación (grisáceo/marrón)
                } else if (isMeta) {
                    colorSerie = '#d4e157'; // Color para la meta (verde lima más oscuro)
                }

                return {
                  type: 'column',
                  name: serie.name,
                  data: serie.data,
                  color: colorSerie, 
                  dataLabels: {
                    enabled: true,
                    useHTML: true,
                    formatter: function(this: any) {
                      const colorLabel = (isVariacion && this.y < 0) ? '#1a237e' : '#000';
                      return `<span style="color: ${colorLabel}; font-weight: bold; font-size: 11px;">${this.y}</span>`;
                    }
                  }
                };
              });

              this.variacionStockOptionsT = {
                chart: { type: 'column', backgroundColor: 'transparent' },
                title: { text: null }, 
                xAxis: {
                  categories: chartData.categories,
                  crosshair: true,
                  labels: {
                    style: { fontSize: '10px', fontWeight: 'bold', color: '#000' }
                  }
                },
                yAxis: {
                  title: { text: null },
                  gridLineColor: '#f0f0f0',
                  labels: {
                    formatter: function(this: any) {
                      return this.value >= 1000 ? (this.value / 1000) + ' mil' : this.value;
                    }
                  },
                  plotLines: [{ value: 0, color: '#666', width: 2, zIndex: 5 }] 
                },
                plotOptions: {
                  column: {
                    pointPadding: 0.1,
                    groupPadding: 0.2,
                    borderWidth: 0
                  }
                },
                series: seriesConfig,
                tooltip: { shared: true },
                legend: {
                  align: 'center',
                  verticalAlign: 'top',
                  itemStyle: { fontSize: '11px' }
                },
                credits: { enabled: false }
              };

              this.isVariacionReadyT = true;
               
              this.detector.detectChanges();
              setTimeout(() => {
                this.updateFlagVariacionT = true;
              }, 100);

              resolve();
            } catch (e) {
              console.error("Error parseando Variacion:", e);
              resolve();
            }
          },
          error: () => resolve()
        });
      });
    }

    prepareSaldoCarteraVigente(tip_cod: any, cod_rel: any, fecha: any): Promise<void> {
      return new Promise((resolve, reject) => {
        this.antRep.getRegularTableResult("GRAF_GEST_COM_02", {
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
              if (!chartData || !chartData.categories) {
                resolve();
                return;
              }

              const seriesConfig = chartData.series.map((serie: any) => {
                const name = serie.name.toLowerCase();
                const isSaldo = name.includes('saldo') && !name.includes('var');

                if (isSaldo) {
                  return {
                    type: 'line',
                    name: 'Saldo Vigente',
                    data: serie.data,
                    yAxis: 0,
                    color: '#1565C0',
                    lineWidth: 3,
                    zIndex: 5, 
                    marker: { enabled: true, radius: 4, symbol: 'circle' },
                    dataLabels: {
                      enabled: true,
                      formatter: function(this: any) {
                        return Highcharts.numberFormat(this.y / 1000000, 3, ',', '.') + ' M';
                      },
                      style: { color: '#1565C0', fontSize: '10px', fontWeight: 'bold' }
                    }
                  };
                } else {
                  return {
                    type: 'column',
                    name: 'Var.Saldo Vigente',
                    data: serie.data,
                    yAxis: 1,
                    color: '#80DEEA',
                    zIndex: 1,
                    dataLabels: {
                      enabled: true,
                      formatter: function(this: any) {
                        return Highcharts.numberFormat(this.y / 1000000, 1, ',', '.') + ' M';
                      },
                      style: { color: '#000', fontSize: '10px', fontWeight: 'bold' }
                    }
                  };
                }
              });

              this.saldoCarteraOptions = {
                chart: { zoomType: 'xy', alignTicks: false },
                title: { text: null }, 
                xAxis: { 
                  categories: chartData.categories, 
                  crosshair: true,
                  labels: { 
                    rotation: -45,
                    style: { fontSize: '9px'}
                  }
                },
                yAxis: [
                  {   
                    title: { text: null }, 
                    labels: {
                      formatter: function(this: any) {
                        return Highcharts.numberFormat(this.value / 1000000, 0, ',', '.') + ' M';
                      },
                      style: { fontSize: '10px' }
                    }
                  },
                  { 
                    title: { text: null }, 
                    opposite: true,
                    gridLineWidth: 0,
                    labels: {
                      formatter: function(this: any) {
                        return Highcharts.numberFormat(this.value / 1000000, 0, ',', '.') + ' M';
                      },
                      style: { fontSize: '10px' }
                    },
                    plotLines: [{ value: 0, color: '#333', width: 1, zIndex: 3 }]
                  }
                ],
                series: seriesConfig,
                tooltip: { shared: true },
                credits: { enabled: false },
                legend: { 
                  align: 'left', 
                  verticalAlign: 'top',
                  itemStyle: { fontSize: '11px' }
                }
              };

              this.isSaldoReady = true;
              this.detector.detectChanges(); 
              setTimeout(() => {
                this.updateFlagSaldo = true;
              }, 100);

              resolve();
            } catch (e) {
              console.error("Error procesando Cartera Vigente:", e);
              reject(e);
            }
          },
          error: (err) => reject(err)
        });
      });
    }

    prepareResumenChart(tip_cod: any, cod_rel: any, fecha: any): Promise<void> {
      console.log(fecha)
      console.log("Cargando ResumenChart para fecha:", fecha);
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
                      formatter: function(this: any) {
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
                    formatter: function(this: any) {
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
                      formatter: function(this: any) {
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

    prepareClientesChart(): Promise<void> {
      return new Promise((resolve) => resolve()); 
    }
    prepareSaldoVencidoChart(): Promise<void> {
      return new Promise((resolve) => resolve());
    }
    prepareSaldoCapitalChart(): Promise<void> {
      return new Promise((resolve) => resolve());
    }
    prepareChartData(): void {} 

    changeHier(item: any) { 
      if (this.principal.hierBuffer.length - 1 == item.idx) {
          return;
      }
      this.loader.open();
      this.principal.loading = true; 
      let tip_cod = item.tip_cod;
      let cod_rel = item.cod_rel; 
      this.tipcod4 = item.tip_cod;
      this.codrel4 = item.cod_rel;  
      this.principal.hierBuffer = this.principal.hierBuffer.slice(0, item.idx + 1);
      let l = this.principal.hierBuffer.length;
      let ci = this.principal.hierBuffer[l - 1];
      
      this.setCurrHier(ci.des_rel, ci.tip_cod); 
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
        // Mostramos el loader de carga
        this.preLoad();
        
        console.log('🚀 Actualizando TODO el dashboard para la fecha:', this.currentDate);
        
        // Llamamos a setDs, que se encargará de actualizar las 3 tablas y TODOS los gráficos
        this.setDs(this.tip_cod, this.cod_rel);
      }
    }
    // loadData(){  
    //   let tipcod = this.tip_cod
    //   let codrel = this.cod_rel;
    //   this.preLoad(); 
    //   this.antRep.getRegularTableResult("RS_GEST_COM_01", {
    //     "tip_cod": tipcod,
    //     "cod_rel": codrel,
    //     "fecha":  this.currentDate 
    // }).subscribe(x => { 
    //     let r = x.body.resultado; 
    //     this.dataSource = r.data; 
    //     this.headerDefs = tablaTab1;
    //     console.log(this.headerDefs)
    //     this.setKpiValues(r.data);
    //     this.dataSource3 = r.data;  
    //     this.headerDefs3  = tablaTab2;
    //     this.load0.next(true);
    // });
    // }
    private setDs(tip_cod: number, cod_rel: string) { 

      // 1. DECLARAMOS LA LÓGICA DE COLORES UNA SOLA VEZ AQUÍ
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
    
      // --- TABLA 01 ---
      this.antRep.getRegularTableResult("RS_GEST_COM_01", {
        "tip_cod": tip_cod,
        "cod_rel": cod_rel,
        "fecha":  this.currentDate 
      }).subscribe(x => { 
        let r = x.body.resultado;
        this.dataSource = r.data;
        this.dataSource3 = r.data; 
        this.setKpiValues(r.data);
        console.log("piero")
        this.prepareResumenChart(tip_cod, cod_rel, this.currentDate);
        this.prepareSaldoCarteraVigente(tip_cod, cod_rel, this.currentDate);
        this.prepareVariacionStockChart(tip_cod, cod_rel, this.currentDate);
        this.prepareIngresosSalidasChart(tip_cod, cod_rel, this.currentDate);
        this.prepareVariacionStockChartT(tip_cod, cod_rel, this.currentDate);
        this.prepareVariacionCliStockChart(tip_cod, cod_rel, this.currentDate);
        this.prepareIngresosSalidasChartT(tip_cod, cod_rel, this.currentDate);
        
        this.load0.next(true);
      });
    
      // --- TABLA 02 ---
      this.antRep.getRegularTableResult("RS_GEST_COM_02", {
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
    
      // --- TABLA 03 (VAR CLIENTE STOCK) ---
      this.antRep.getRegularTableResult("RS_GEST_COM_03", {
        "tip_cod": tip_cod,
        "cod_rel": cod_rel,
        "fecha":  this.currentDate 
      }).subscribe(x => {
        let r = x.body.resultado;  
        this.dataSource5 = r.data;
        
        // Parseamos e inyectamos LOS MISMOS estilos de la tabla 2
        let headersParseados5 = JSON.parse(r.headers);
        inyectarEstilos(headersParseados5);
        this.headerDefs5 = headersParseados5;  
      });
    
    }
  //   private setDs(tip_cod: number, cod_rel: string) { 
  //     this.antRep.getRegularTableResult("RS_GEST_COM_01", {
  //       "tip_cod": tip_cod,
  //       "cod_rel": cod_rel,
  //       "fecha":  this.currentDate 
  //     }).subscribe(x => { 
  //       let r = x.body.resultado;
  //       this.dataSource = r.data;
  //       this.dataSource3 = r.data; 
  //       this.setKpiValues(r.data);
        
  //       this.prepareResumenChart(tip_cod,cod_rel,this.currentDate)
  //       this.prepareSaldoCarteraVigente(tip_cod,cod_rel,this.currentDate)
  //       this.prepareVariacionStockChart(tip_cod,cod_rel,this.currentDate)
  //       this.prepareIngresosSalidasChart(tip_cod,cod_rel,this.currentDate)
  //       this.prepareVariacionStockChartT(tip_cod,cod_rel,this.currentDate)
  //       this.prepareVariacionCliStockChart(tip_cod,cod_rel,this.currentDate)
  //       this.prepareIngresosSalidasChartT(tip_cod,cod_rel,this.currentDate)
        
  //       this.load0.next(true);
  //     });
  //     this.antRep.getRegularTableResult("RS_GEST_COM_02", {
  //       "tip_cod": tip_cod,
  //       "cod_rel": cod_rel,
  //       "fecha":  this.currentDate 
  //     }).subscribe(x => {
  //       let r = x.body.resultado;  
  //       //console.log(JSON.parse(r.headers))
  //       //console.log(r)
  //       this.dataSource4 = r.data;
  //       let headersParseados = JSON.parse(r.headers);
  //       //this.headerDefs4 =  JSON.parse(r.headers);

  //       const fondoDinamicoFn = function (params: any) {
  //         // Convertimos el valor a número
  //         let val = Number(params.value);
          
  //         // Si es texto o nulo, no hacemos nada
  //         if (isNaN(val)) return {};
  
  //         if (val > 0) {
  //             // Positivo -> Fondo verde suave, texto verde oscuro
  //             return { 'background-color': '#dcfce7', 'color': '#166534', 'font-weight': 'bold' }; 
  //         } else if (val < 0) {
  //             // Negativo -> Fondo rojo suave, texto rojo oscuro
  //             return { 'background-color': '#fee2e2', 'color': '#991b1b', 'font-weight': 'bold' }; 
  //         }
  
  //         return {}; // Si es 0 exacto, no aplicamos fondo
  //     };
  //    // 3. Inyectamos la función
  //   const inyectarEstilos = (columnas: any[]) => {
  //     columnas.forEach(col => {
  //         if (col.subs && col.subs.length > 0) {
  //             inyectarEstilos(col.subs);
  //         } else {
  //             // Evitamos inyectar la función en la primera columna (Descripción) para que no se pinte raro
  //             if (col.label !== 'Descripción' && col.label !== 'Descripción') {
  //                 col.cellStyleFn = fondoDinamicoFn;
  //             }
  //         }
  //     });
  // };
  //   inyectarEstilos(headersParseados);

  //   this.headerDefs4 = headersParseados;
        
  //     })

      
  //     //tabla var cliente stock 
  //     this.antRep.getRegularTableResult("RS_GEST_COM_03", {
  //       "tip_cod": tip_cod,
  //       "cod_rel": cod_rel,
  //       "fecha":  this.currentDate 
  //     }).subscribe(x => {
  //       let r = x.body.resultado;  
  //       this.dataSource5 = r.data;
  //       this.headerDefs5 = JSON.parse(r.headers);  
  //     })

  //   }
    
    toggleDropdown(event?: Event): void {
      if (event) {
          event.stopPropagation();
      }
      this.isDropdownOpen = !this.isDropdownOpen;
    }

    setKpiValues(data: any[]) {
      if (data && data.length > 0) {
        const row0 = data[0]; 
        
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
        this.kpi_perc_cli_stock = (row0.percent_avance_cli_stock || 0)* 100; 

        this.kpi_mont_dese = row0.mont_dese_2 || 0;
        this.kpi_tmm_desemb = row0.TMMDESEMB || 0;
        this.cumpldesembolsometadi = row0.percentcumpldesembolsometadi  || 0
        //console.log(this.cumpldesembolsometadi)
        this.kpi_perc_montode = (row0.percent_avance_montode || 0) * 100;

        this.kpi_cart_vig = row0.sal_vig_2 || 0;       
        this.kpi_var_cart_vig = row0.HVSALVIGMN || 0;  

        this.kpi_cli_nuevos = row0.HNUMCLIN || 0;
        this.kpi_tmm_cli_nuevos = row0.TMMCLINUEV || 0;

        this.kpi_rodamiento = row0.HRODAM || 0;
        this.kpi_sal_no_vig = row0.HSALNOVIG || 0;
        this.kpi_sal_vig = row0.HSALVIGEN || 0;

        this.kpi_resultado_operativo = this.kpi_mont_dese - this.kpi_var_cart_vig - this.kpi_rodamiento;
        this.kpi_percent_cancelado = (this.kpi_resultado_operativo / row0.hvalvar_136 || 0) * 100

        this.tmm_rodamiento = row0.TMMRODAMIENTO || 0;
        this.tmm_TMMSALVIGE = row0.TMMSALVIGE  || 0;
        this.tmm_TMMHSALNOVIG = row0.TMMHSALNOVIG || 0;

        this.meta_productividad = row0.hvalvar_8070
        this.meta_ticket  = row0.hvalvar_134 
        this.meta_desem = row0.hvalvar_133 
        this.metadiariacarteravigente = row0.hvalvar_10256
        this.distdiariacartvig=row0.distdiariacartvig
        this.meta_cancela = row0.hvalvar_136 
        this.meta_varstockclie = row0.hvalvar_10062 
        this.meta_clinuevo= row0.hvalvar_166

        this.kpi_perc_clinuev = (row0.percent_avance_cli_nuevos || 0) * 100;  

      } else {
        this.kpi_prod_ind = 0; this.kpi_tmm_prod = 0; this.kpi_perc_cumpl = 0; this.kpi_perc_avance = 0;
        this.kpi_tick_prom = 0; this.kpi_tmm_tick = 0; this.kpi_perc_ticket = 0;
        this.kpi_cli_stock = 0; this.kpi_tmm_cli_stock = 0; this.kpi_perc_cli_stock = 0;
        this.kpi_perce_cump_clinuevo=0;
        this.kpi_cart_vig = 0; this.kpi_var_cart_vig = 0;
        this.kpi_cli_nuevos = 0; this.kpi_tmm_cli_nuevos = 0;
        this.kpi_rodamiento = 0;
        this.kpi_sal_no_vig = 0;
        this.kpi_sal_vig = 0;
        this.kpi_resultado_operativo = 0;
        this.tmm_rodamiento =0;
        this.tmm_TMMSALVIGE =0;
        this.tmm_TMMHSALNOVIG=0;
        this.meta_productividad = 0;
        this.meta_ticket  = 0;
        this.meta_desem = 0;
        this.metadiariacarteravigente= 0;
        this.distdiariacartvig=0;
        this.meta_cancela = 0;
        this.meta_varstockclie = 0;
        this.meta_clinuevo = 0;
        this.cumpldesembolsometadi=0
        this.kpi_perc_clinuev=0;
      }
    }

    
    private getBaseHierAsync(): Promise<void> { //piero
      return new Promise((resolve, reject) => {
        this.antAdmin.getBaseHierarchy(this.user.email, 9).subscribe({
          next: (x) => {
            let br: any = x.body;
            let h = br.base_hierarchy;
            
            if (!isNullOrUndefined(h)) {
              // 1. AQUI SE ASIGNAN LAS VARIABLES
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
                    console.log(this.currentDate)
                    // --- TABLA 01 ---
                    this.antRep.getRegularTableResult("RS_GEST_COM_01", {
                      "tip_cod": this.tip_cod,
                      "cod_rel": this.cod_rel,
                      "fecha":  this.currentDate 
                    }).subscribe(x => {
                      let r = x.body.resultado;  
                      console.log(r)
                      this.setKpiValues(r.data);
                      this.dataSource = r.data;
                      this.dataSource3 = r.data; 
                      this.headerDefs = tablaTab1;
                      this.headerDefs3  = tablaTab2;
                      console.log(this.currentDate)
                      this.prepareResumenChart(this.tip_cod,this.cod_rel,this.currentDate);
                      this.prepareSaldoCarteraVigente(this.tip_cod,this.cod_rel,this.currentDate);
                      this.prepareVariacionStockChart(this.tip_cod,this.cod_rel,this.currentDate);
                      this.prepareIngresosSalidasChart(this.tip_cod,this.cod_rel,this.currentDate);
                      this.prepareIngresosSalidasChartT(this.tip_cod,this.cod_rel,this.currentDate);
                      this.prepareVariacionStockChartT(this.tip_cod,this.cod_rel,this.currentDate)
                      this.prepareVariacionCliStockChart(this.tip_cod,this.cod_rel,this.currentDate)
                      
                      this.load0.next(true);
                    });
    
                    // --- TABLA 02 ---
                    this.antRep.getRegularTableResult("RS_GEST_COM_02", {
                      "tip_cod": this.tip_cod,
                      "cod_rel": this.cod_rel,
                      "fecha":  this.currentDate 
                    }).subscribe(x => {
                      let r = x.body.resultado;  
                      this.dataSource4 = r.data;
                      let headersParseados = JSON.parse(r.headers);
              
                      const fondoDinamicoFn = function (params: any) {
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
                      inyectarEstilos(headersParseados);
                      this.headerDefs4 = headersParseados;
                    });
    
                    // --- TABLA 03 (¡AQUÍ ES EL LUGAR CORRECTO!) ---
                    // --- TABLA 03 (¡AQUÍ ES EL LUGAR CORRECTO!) ---
this.antRep.getRegularTableResult("RS_GEST_COM_03", {
  "tip_cod": this.tip_cod, 
  "cod_rel": this.cod_rel, 
  "fecha":  this.currentDate 
}).subscribe({
  next: (x) => {
    if(x.body && x.body.resultado) {
       let r = x.body.resultado;  
      // console.log("Data RS_GEST_COM_03:", r);
       this.dataSource5 = r.data;
       
       // 1. Parsear los headers
       let headersParseados5 = JSON.parse(r.headers); 

       // 2. Definir la función de colores (la misma de la Tabla 2)
       const fondoDinamicoFn = function (params: any) {
         if (params.value == null || params.value === '') return { 'background-color': '#ffffff' }; 
         let valorLimpio = String(params.value).replace(/,/g, '').trim();
         let val = Number(valorLimpio);
         if (isNaN(val)) return { 'background-color': '#ffffff' };
         if (val > 0) return { 'background-color': '#dcfce7', 'color': '#166534', 'font-weight': 'bold' }; 
         else if (val < 0) return { 'background-color': '#fee2e2', 'color': '#991b1b', 'font-weight': 'bold' }; 
         return { 'background-color': '#ffffff' }; 
       };

       // 3. Función recursiva para inyectar la función de estilo en las columnas
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

       // 4. Inyectar estilos y asignar a la variable de la tabla
       inyectarEstilos(headersParseados5);
       this.headerDefs5 = headersParseados5; 
    }
  },
  error: (err) => console.error("Error en tabla 03", err)
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

    // component.ts
obtenerClaseColor(valor: number): string {
  const porcentaje = valor * 100; 
  if (porcentaje >= 100) {
    return 'text-green';  // >= 100%
  } else if (porcentaje >= 80) {
    return 'text-yellow'; // >= 80% y < 100%
  } else {
    return 'text-red';    // < 80%
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