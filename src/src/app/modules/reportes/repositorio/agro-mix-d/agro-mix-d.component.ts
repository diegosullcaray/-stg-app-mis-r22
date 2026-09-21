import * as moment from 'moment';
import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { UserService } from "app/system/admin/services/user.service";
import { ModRepService } from "../../compartido/servicios/mod-rep.service";
import { cloneObject, isNullOrUndefined, onNullOrUndefined } from 'app/core/shared/functions.util';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import {  principalConfig,  tableHeadersModal,  tblOpts } from './agro-mix-d.util';
import { BehaviorSubject, combineLatest } from 'rxjs'; 
import { ModSysAdminService } from 'app/core/data/remote/instances/mod-sys-admin.service';
import * as Highcharts from 'highcharts';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StgPaginatorComponent } from 'app/core/screen/components/stg-paginator/stg-paginator.component';
import { prepareDataForPagination } from 'app/core/screen/components/stg-paginator/stg-paginator.util';
import { DetalleDialogComponent } from './detalle/detalle-dialog.component';
import { MapaSimpleComponent } from './mapa-simple.component';
@Component({
    selector: 'app-agro-mix-d.component',
    templateUrl: './agro-mix-d.component.html',
    styleUrls: ['./agro-mix-d.component.scss']
})
export class AgroMixDComponent implements OnInit {
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
  modalData: any;
  headerDefs: any;
  load0: BehaviorSubject<boolean>;
  loading: boolean;
  Opts: any;
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
  extMA: any;
  @ViewChild("paginator",{"static":false}) paginatorVC:StgPaginatorComponent;
  isDropdownOpen: boolean = false;
  currentDate: any;
  selector1: any;
  filter1: any;
  firstload: boolean;
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
}, 0); //modalSaldoVencido ,   modalSExtension  , modalPercenSVencido

this.modalSExtension = this.modalData.reduce((acumulador,item) =>{
  const EXTValor = Number(item.HEXTENS) || 0; 
  return acumulador + EXTValor;
}, 0);

this.modalPercenSVencido = ((this.modalSaldoVencido / this.modalSalcartera) * 100)
 
  this.dataSource3Page = dataToFilter.filter(item => 
    (item.HDESCUL_Agrupado || item.HDESCUL) === category
  );  
 
  this.dialog.open(DetalleDialogComponent, {
    
    width: '1200px',
    height: '1200px', 
    disableClose: true,
    panelClass: 'stg-window-dialog', 
    data: {
      modalTitle: `${category}`,
      modalData: this.modalData,  
      headerDefsModal: tableHeadersModal,
      opts: this.Opts,
      showPaginator: this.showPaginator,
      dataSource3Length: this.dataSource3Length,
      modalSalcartera: this.modalSalcartera,
      modalSaldoVencido: this.modalSaldoVencido,
      modalSExtension: this.modalSExtension,
      modalPercenSVencido: this.modalPercenSVencido 
    }
  });
} 
 
  // MÉTODO ACTUALIZADO: selectItem
  selectItem(item: any, event?: Event): void {
    if (event) {
        event.stopPropagation();
    }
    
    this.selector1 = item;
    this.isDropdownOpen = false;
    
    // Simular el evento de onSelectionChange como en mat-select
    const mockEvent = {
        source: {
            value: item,
            selected: true
        },
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

// Modifica esta función para que acepte un título
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
  this.load0 = new BehaviorSubject(false);
    let profile = this.user.get('profile');
    this.curr_fec = profile.curr_fec;
    this.currentDate = moment(profile.curr_fec).format("YYYY-MM-DD");
    this.firstload = true;
    this.loadFilter();
    await  this.getBaseHierAsync()
    this.loading = true;
   
    
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
        
        // Si el click no fue dentro del dropdown, cerrarlo
        if (!dropdownElement.contains(targetElement)) {
            this.isDropdownOpen = false;
        }
    }
}
loadFilter() { 
  this.antRep.getRegularTableResult("RS_FECH", { 
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
// Función para convertir texto a formato título (Primera letra de cada palabra mayúscula)
capitalizeText(text: string): string {
  if (!text) return '';
  
  return text
    .split(/(\s+|-)/g) // Divide por espacios o guiones, manteniendo los separadores
    .map(word => {
      // Si es un separador (espacio o guión), devuélvelo tal cual
      if (/^(\s+|-)$/.test(word)) {
        return word;
      }
      // Si es una palabra, capitaliza primera letra
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
}
ddHier(evt: any) { 
  let style = evt.row.STYLE;
  let key = evt.key; 
  let tip_cod = evt.row.htipcod;
  
  console.log(evt)
  
   
  if(key =='EXTE' ||key =='HCCLI'||key =='HSALCAPMN' ||key =='HSALVEMN'){
    this.nivel =  this.capitalizeText(evt.row.rdesjer);  //evt.row.rdesjer.charAt(0).toUpperCase() + evt.row.rdesjer.slice(1).toLowerCase();
    this.selectedRow = evt.row;
    this.showChart = true;
    this.loadAllChartsData(); //this.prepareChartData();
    return;
  }
  if (tip_cod == 999 ||  tip_cod==2) {
    return;
}
  this.loader.open();
  this.tipcod4 = tip_cod;
  this.codrel4 = evt.row.cod_rel;
  this.principal.loading = true;
  let cod_rel = evt.row.cod_rel;
  this.saveBuffer({ tip_cod: tip_cod, cod_rel: cod_rel, des_rel: evt.value }); 
  this.setDs(tip_cod, cod_rel); 
}
 
backToTable() {
  this.showChart = false;
  this.selectedRow = null; 
  this.isChartReady = false; 
}  
async loadAllChartsData(): Promise<void> {
  this.isChartReady = false;  
  this.loader.open();

  try { 
    await Promise.all([
      this.prepareSaldoVencidoChart(),   
      this.prepareSaldoCapitalChart(), 
       this.prepareClientesChart(), 
       this.prepareResumenChart()    
    ]); 
    this.isChartReady = true;

  } catch (error) {
    console.error("Falló la carga de uno o más gráficos", error);
  } finally {
    this.loader.close();
  }
}
prepareResumenChart(): Promise<void> {
  return new Promise((resolve, reject) => { 
    this.antRep.getRegularTableResult("RS_AGROMIX_05", {
      "tip_cod": this.selectedRow.htipcod,
      "cod_rel": this.selectedRow.cod_rel,
      "fec":  this.currentDate //this.selector1.val  
    }).subscribe({
      next: (x) => {
        try {
          const r = x.body.resultado;
         
          const jsonString = r.headers;
          const chartData = JSON.parse(jsonString);

          if (!chartData || !chartData.categories || !chartData.series) {
            throw new Error("El JSON para Resumen General no es válido.");
          } 
          const seriesConfig = chartData.series.map((serie: any) => { 
                        if (serie.name.includes('%Saldo Vencido')) {
                          return {
                            type: 'spline',  
                            name: serie.name,
                            data: serie.data,
                            yAxis: 1, 
                            color: '#ff7c43',
                                            marker: { enabled: true, radius: 4, fillColor: '#ff7c43' }  
                          };
                        }
            let barColor = '#003f5c'; 
            if (serie.name === 'Saldo') {
              barColor = '#003f5c';  
            } else if (serie.name === 'Saldo Vencido') {
              barColor = '#bc5090';  
            } 
                        return {
                          type: 'column',
                          name: serie.name,
                          data: serie.data,
                          yAxis: 0, 
            color: barColor
                        };
                      });
          this.resumenGeneralOptions = {
            chart: {
              type: 'column',  
              zoomType: 'xy'
            },
            title: { text: null },
            xAxis: {
              categories: chartData.categories,
              crosshair: true
            }, 
            yAxis: [
                            {  
                              title: { text: 'Saldos' },
             labels: { 
             enabled: true,  
                                formatter: function () {
                                  if (typeof this.value === 'number') {
                                    return (this.value / 1000000) + ' M';
                                  }
                                  return this.value;
              }
              }
              },
              {  
              title: { text: '% Saldo Vencido' },
              labels: { 
              enabled: true, 
              format: '{value} %'  
              },
             opposite: true,  
              gridLineWidth: 0  
              }
              ], 
            plotOptions: {
              column: {
                pointPadding: 0.2,
                borderWidth: 0,
                groupPadding: 0.1
              }
            },
            series: seriesConfig,
            // tooltip: {
            //   shared: true,
            //   headerFormat: '<b>{point.key}</b><br/>',
            //   pointFormat: '<span style="color:{series.color}">●</span> {series.name}: <b>{point.y:,.2f}</b><br/>'
            // },
            tooltip: {
                            shared: true,
                            formatter: function () {
                              let tooltip = `<b>${this.x}</b><br/>`;
                              this.points.forEach(point => {
                                const seriesName = point.series.name;
                                const value = point.y;
                                
                                if (seriesName.includes('%')) { 
                                  tooltip += `<span style="color:${point.color}">●</span> ${seriesName}: <b>${value.toFixed(2)} %</b><br/>`;
                                } else { 
                                  tooltip += `<span style="color:${point.color}">●</span> ${seriesName}: <b>${Highcharts.numberFormat(value, 2, '.', ',')}</b><br/>`;
                                }
                              });
                              return tooltip;
                            }
                          },
            legend: { enabled: true },
            credits: { enabled: false }
          };

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
  return new Promise((resolve, reject) => { 
    this.antRep.getRegularTableResult("RS_AGROMIX_04", { 
      "tip_cod": this.selectedRow.htipcod,
      "cod_rel": this.selectedRow.cod_rel,
      "fec":  this.currentDate// this.selector1.val  
    }).subscribe({
      next: (x) => {
        try {
          const r = x.body.resultado;
          const jsonString = r.headers;
          const chartData = JSON.parse(jsonString); 
          if (!chartData || !chartData.categories || !chartData.series) {
            throw new Error("El JSON para Clientes no es válido.");
          } 
          const seriesConfig: Highcharts.SeriesOptionsType[] = [{
            name: 'Clientes', 
            type: 'bar',
            data: chartData.series[0].data, 
            color: '#2f9bd8'  
          }];

          this.clientesPorCultivoOptions = {
            chart: { type: 'bar', zoomType: 'xy' },
            title: { text: null },
            xAxis: { categories: chartData.categories }, 
            yAxis: {
              title: { text: null }, 
              labels: { format: '{value:,.0f}' } 
            },

            series: seriesConfig,
            
            tooltip: { 
              formatter: function () {
                return `<b>${this.key}</b><br/>Clientes: <b>${Highcharts.numberFormat(this.y, 0, '.', ',')}</b>`;
              }
            },
             
            legend: { enabled: false },
            credits: { enabled: false }
          };
          
          resolve();
        } catch (e) {
          reject(e);
        }
      },
      error: (err) => reject(err)
    });
  });
}
prepareSaldoVencidoChart(): Promise<void> {
  return new Promise((resolve, reject) => {
    this.antRep.getRegularTableResult("RS_AGROMIX_02", {
      "tip_cod": this.selectedRow.htipcod,
      "cod_rel": this.selectedRow.cod_rel,
      "fec":  this.currentDate // this.selector1.val  
    }).subscribe({
      next: (x) => {
        try {
          const r = x.body.resultado; 
          const jsonString = r.headers;
          const chartData = JSON.parse(jsonString);
          this.detailDataMap.set('saldoVencido', r.data);
          if (!chartData || !chartData.categories || !chartData.series) {
            throw new Error("El JSON para Saldo Vencido no es válido.");
          }
 
          const seriesConfig = chartData.series.map((serie: any) => {
            if (serie.name === '%Respecto al Total') { 
              return { 
                name: serie.name, 
                type: 'spline', 
                data: serie.data, 
                yAxis: 1, 
                color: '#ff7c43',
                marker: { enabled: true, radius: 3 }
              };
            }
            return { 
              name: 'Saldo Vencido', 
              type: 'bar',  
              data: serie.data, 
              yAxis: 0, 
              color: '#bc5090' ,
              
            };
          });

          this.saldoVencidoPorCultivoOptions = {
            chart: { type: 'bar', zoomType: 'xy' },
            title: { text: null },
            xAxis: { categories: chartData.categories },
            yAxis: [
              { 
                title: { text: null },
                labels: { 
                  formatter: function () {
                    if (typeof this.value === 'number') {
                      return (this.value / 1000000) + ' M';
                    }
                    return this.value;
                  }
                } 
              },
              {  
                title: { text: null }, 
                labels: { enabled: true }, 
                gridLineWidth: 0, 
                opposite: true 
              }
            ],
            plotOptions: {
              series: {
                cursor: 'pointer',
                events: {
                  click: (event) => { 
                    this.showDetailsPopup(event.point.category, 'saldoVencido');
                  }
                }
              }
            },
            series: seriesConfig,
            tooltip: {
              shared: true,
              formatter: function () {
                let tooltip = `<b>${this.x}</b><br/>`;
                this.points.forEach(point => {
                  const seriesName = point.series.name;
                  const value = point.y;
                  if (seriesName.includes('%')) {
                    tooltip += `<span style="color:${point.color}">●</span> ${seriesName}: <b>${value.toFixed(2)} %</b><br/>`;
                  } else {
                    tooltip += `<span style="color:${point.color}">●</span> ${seriesName}: <b>S/ ${Highcharts.numberFormat(value, 0, '.', ',')}</b><br/>`;
                  }
                });
                return tooltip;
              }
            },
            legend: { enabled: true },
            credits: { enabled: false }
          };
          
          resolve();
        } catch (e) {
          reject(e);
        }
      },
      error: (err) => reject(err)
    });
  });
}
 
  prepareSaldoCapitalChart(): Promise<void> {
    return new Promise((resolve, reject) => { 
      this.antRep.getRegularTableResult("RS_AGROMIX_03", {
        "tip_cod": this.selectedRow.htipcod,
        "cod_rel": this.selectedRow.cod_rel,
        "fec":  this.currentDate //this.selector1.val 
      }).subscribe({
        next: (x) => {
          try {
            const r = x.body.resultado;
            const jsonString = r.headers;
            const chartData = JSON.parse(jsonString);
            this.detailDataMap.set('saldoCartera', r.data);
            if (!chartData || !chartData.categories || !chartData.series) {
              throw new Error("El JSON para Saldo Capital no es válido.");
            } 
            const seriesConfig = chartData.series.map((serie: any) => {
              if (serie.name === 'Saldo') {
                return {
                  name: 'Saldo',
                  type: 'bar',
                  data: serie.data,
                  yAxis: 0,
                  color: '#003f5c'
                };
              }
              return {
                name: serie.name,
                type: 'spline',//'bar',//'spline',
                data: serie.data,
                yAxis: 1,
                color: serie.name.includes('Vencido') ? '#ffa600' : '#bc5090',
                marker: { enabled: true, radius: 3 }
              };
            });

            this.saldoPorCultivoOptions = {
              chart: { zoomType: 'xy' },
              title: { text: null },
              xAxis: {
                categories: chartData.categories,
                crosshair: true
              },
              yAxis: [
                {  
                  title: { text: null },
                  labels: { 
                    formatter: function () {
                      if (typeof this.value === 'number') {
                        return (this.value / 1000000) + ' M';
                      }
                      return this.value;
                    }
                  }
                },
                {  
                  title: { text: null },
                  labels: { enabled: true },
                  gridLineWidth: 0,
                  opposite: true
                }
              ],
              plotOptions: {
                series: {
                  cursor: 'pointer',
                  events: {
                    click: (event) => { 
                      this.showDetailsPopup(event.point.category, 'saldoCartera');
                    }
                  }
                }
              },
              series: seriesConfig,
              tooltip: {
                shared: true,
                formatter: function () {
                  let tooltip = `<b>${this.x}</b><br/>`;
                  const points = this.points.sort((a, b) => b.series.name.localeCompare(a.series.name));
                  points.forEach(point => {
                    const seriesName = point.series.name;
                    const value = point.y;
                    if (seriesName.includes('%')) {
                      tooltip += `<span style="color:${point.color}">●</span> ${seriesName}: <b>${value.toFixed(2)} %</b><br/>`;
                    } else {
                      tooltip += `<span style="color:${point.color}">●</span> ${seriesName}: <b>S/ ${Highcharts.numberFormat(value, 0, '.', ',')}</b><br/>`;
                    }
                  });
                  return tooltip;
                }
              },
              legend: { enabled: true },
              credits: { enabled: false }
            };

            resolve();
          } catch (e) {
            reject(e);
          }
        },
        error: (err) => reject(err)
      });
    });
  }
prepareChartData(): void { 
  if (!this.selectedRow) { return; }

  this.loader.open();
  this.isChartReady = false; 
 
  this.antRep.getRegularTableResult("RS_AGROMIX_02", {
    "tip_cod": this.selectedRow.htipcod,
    "cod_rel": this.selectedRow.cod_rel,
    "fec":  this.currentDate //this.selector1.val  
  }).subscribe({
    next: (x) => {
      try {
        const r = x.body.resultado;
        const jsonString = r.headers;
        const chartData = JSON.parse(jsonString);

        if (!chartData || !chartData.categories || !chartData.series) {
          throw new Error("El JSON recibido no tiene la estructura esperada.");
        }

        const seriesConfig = chartData.series.map((serie: any) => {
          if (serie.name === '%Respecto al Total') {
            return {
              name: '% Respecto al Total',
              type: 'bar',
              data: serie.data,
              yAxis: 1,
              color: '#0275d8'
            };
          }
          return {
            name: 'Saldo Vencido',
            type: 'bar',
            data: serie.data,
            yAxis: 0,
            color: '#5cb85c'
          };
        });

        this.saldoVencidoPorCultivoOptions = {
          chart: {
            type: 'bar',
            zoomType: 'xy',
            marginTop: 0,
          },
          title: {
            text: null  
          },
          xAxis: {
            categories: chartData.categories,
          },
          yAxis: [
            {  
              title: { text: 'Saldo Vencido (S/)' },
              labels: { format: '{value:,.0f}' }
            },
            {  
              title: { text: null },       
              labels: { enabled: false },  
              gridLineWidth: 0,          
              opposite: true
            }
          ],
          series: seriesConfig,
          
          tooltip: {
            shared: true,
            formatter: function () {
              let tooltip = `<b>${this.x}</b><br/>`;
              this.points.forEach(point => {
                const seriesName = point.series.name;
                const value = point.y;
                if (seriesName.includes('%')) { 
                  tooltip += `<span style="color:${point.color}">●</span> ${seriesName}: <b>${value.toFixed(2)} %</b><br/>`;
                } else {
                  tooltip += `<span style="color:${point.color}">●</span> ${seriesName}: <b>S/ ${Highcharts.numberFormat(value, 0, '.', ',')}</b><br/>`;
                }
              });
              return tooltip;
            }
          },
          legend: {
            enabled: true
          },
          credits: {
            enabled: false
          }
        };
        
        this.isChartReady = true;

      } catch (e) {
        console.error("Error al procesar la respuesta del gráfico:", e);
      } finally {
        this.loader.close();
      }
    },
    error: (err) => {
      console.error("Error en la llamada al servicio del gráfico:", err);
      this.loader.close();
    }
  });
} 
 

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
loadData(){  
  let tipcod = this.tip_cod
   let codrel = this.cod_rel;
   this.preLoad();
   this.antRep.getRegularTableResult("RS_AGROMIX_01", {
    "tip_cod": tipcod,
    "cod_rel": codrel,
    "fec":  this.currentDate //this.selector1.val 
}).subscribe(x => { 
    let r = x.body.resultado;
    this.dataSource = r.data;
    this.headerDefs = JSON.parse(r.headers);
    this.saldoCarteraMA = r.meta1[0]["HSALCAPMN"]
    this.saldoVencidoMA = r.meta1[0]["HSALVEMN"]
    this.numcliMA = r.meta1[0]["HCCLI"]
    this.extMA = r.meta1[0]["EXTE"]  
    this.TsaldoCapital = this.dataSource[0].HSALCAPMN
    this.TsaldoVencido = this.dataSource[0].HSALVEMN
    this.TNumCliente = this.dataSource[0].HCCLI
    this.Textension = this.dataSource[0].EXTE
    this.load0.next(true);
});
}
private setDs(tip_cod: number, cod_rel: string) {  
  this.antRep.getRegularTableResult("RS_AGROMIX_01", {
    "tip_cod": tip_cod,
    "cod_rel": cod_rel,
    "fec":  this.currentDate //this.selector1.val 
}).subscribe(x => { 
    let r = x.body.resultado;
    this.dataSource = r.data;
    console.log(this.dataSource)
    this.headerDefs = JSON.parse(r.headers);
    this.saldoCarteraMA = r.meta1[0]["HSALCAPMN"]
    this.saldoVencidoMA = r.meta1[0]["HSALVEMN"]
    this.numcliMA = r.meta1[0]["HCCLI"]
    this.extMA = r.meta1[0]["EXTE"]  
    this.TsaldoCapital = this.dataSource[0].HSALCAPMN
    this.TsaldoVencido = this.dataSource[0].HSALVEMN
    this.TNumCliente = this.dataSource[0].HCCLI
    this.Textension = this.dataSource[0].EXTE
    this.load0.next(true);
});
}

public get saldoCapitalDiff(): number { 
  return (this.TsaldoCapital || 0) - (this.saldoCarteraMA || 0);
}
 
public get saldoVencidoDiff(): number {
  return (this.TsaldoVencido || 0) - (this.saldoVencidoMA || 0);
}
 
public get numClienteDiff(): number {
  return (this.TNumCliente || 0) - (this.numcliMA || 0);
}
 
public get extensionDiff(): number {
  return (this.Textension || 0) - (this.extMA || 0);
}
toggleDropdown(event?: Event): void {
  if (event) {
      event.stopPropagation();
  }
  this.isDropdownOpen = !this.isDropdownOpen;
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
                              this.antRep.getRegularTableResult("RS_AGROMIX_01", {
                                "tip_cod": this.tip_cod,
                                "cod_rel": this.cod_rel,
                                "fec":  this.currentDate //this.selector1.val 
                            }).subscribe(x => {
                                let r = x.body.resultado; 
                                this.saldoCarteraMA = r.meta1[0]["HSALCAPMN"]
                                this.saldoVencidoMA = r.meta1[0]["HSALVEMN"]
                                this.numcliMA = r.meta1[0]["HCCLI"]
                                this.extMA = r.meta1[0]["EXTE"] 

                                this.dataSource = r.data;
                                console.log(this.dataSource)
                                this.TsaldoCapital = this.dataSource[0].HSALCAPMN
                                this.TsaldoVencido = this.dataSource[0].HSALVEMN
                                this.TNumCliente = this.dataSource[0].HCCLI
                                this.Textension = this.dataSource[0].EXTE
                                this.headerDefs = JSON.parse(r.headers);
                                this.load0.next(true);
                            });
                              resolve();
                          } else {
                              resolve();
                          }
                      },
                      error: (err) => {
                          reject(err);
                      }
                  });
              } else {
                  resolve();
              }
          },
          error: (err) => {
              reject(err);
          }
      });
  });
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