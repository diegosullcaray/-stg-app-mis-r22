import { Component, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef, OnInit } from '@angular/core';
import { ModSysAdminService } from 'app/core/data/remote/instances/mod-sys-admin.service';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { UserService } from 'app/system/admin/services/user.service';
import * as Highcharts from 'highcharts';
import { ModRepService } from '../../compartido/servicios/mod-rep.service';
import { cloneObject, isNullOrUndefined } from 'app/core/shared/functions.util';
import { BehaviorSubject, combineLatest } from 'rxjs';
import moment from 'moment';
import { principalConfig, tblOpts } from './banca-solidaria.util';

export interface RegionData {
  nombre: string;
  saldoVigente: string;
  mtoDesembolsado: string; 
  ticketPromedio: string;
  nClientes: number;
  tasaMes: string;
  baseInicial: number;
  renovados: number;
  porRenovar: number;
  vencidos: number;
  vencenHoy: number;
  pagoPuntual: string; 
  efectividad30a0: string;
  efectividad1a30: string;
  conteoGrupos: number;
  isTotal?: boolean;
 
}

@Component({
  selector: 'app-banca-solidaria',
  templateUrl: './banca-solidaria.component.html',
  styleUrls: ['./banca-solidaria.component.scss']
})
export class BancaSolidariaComponent implements OnInit {
  @ViewChild('donutChart') donutChartRef!: ElementRef;
  @ViewChild('barChart') barChartRef!: ElementRef;
  principal: any;
  dataSource: any;
  headerDefs: any;
  Opts: any;
  curr_hier: any;
  load0: BehaviorSubject<boolean>;
curr_fec: string;
currentDate: any;
firstload: boolean;
loading: boolean;
tip_cod: number;
cod_rel: string;
tipcod4: any;
  codrel4: any;

  config: any; 

  tblOpts: any;
  tblHeaders: any; 
 show_lvl_scroll: boolean;
 kpi_saldovig : number=0;
 kpi_mdesem: number=0;
 kpi_ticpro: number=0;
 kpi_numcli: number=0;
 tappmes: number=0; // Añadir esta línea
 private donutChartInstance: any;
 private barChartInstance: any; // <-- Añadir esta línea
 constructor(
    private loader: StgAppLoaderService,
    private user: UserService, 
    private antAdmin: ModSysAdminService,
    public antRep: ModRepService
  ){
    this.tblOpts = cloneObject(tblOpts);
    this.setDefaults();
  }
  
async ngOnInit(): Promise<void> {   
  this.loader.open();
  this.Opts = cloneObject(tblOpts);
  this.load0 = new BehaviorSubject(false);
    let profile = this.user.get('profile');
    this.curr_fec = profile.curr_fec;
    this.currentDate = moment(profile.curr_fec).format("YYYY-MM-DD");
    this.firstload = true; 
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
ddHier(evt: any) { 
  let style = evt.row.STYLE;
  let key = evt.key; 
  let tip_cod = evt.row.htipcod;

  if (key !== 'descripcion') {
    return; 
  }
  console.log(evt)
  console.log(key)
  
     
  this.loader.open();
  this.tipcod4 = tip_cod;
  this.codrel4 = evt.row.cod_rel;
  this.principal.loading = true;  
  let cod_rel = evt.row.hcodrel; 
  this.saveBuffer({ tip_cod: tip_cod, cod_rel: cod_rel, des_rel: evt.value }); 
  console.log(tip_cod,cod_rel)
  this.setDs(tip_cod, cod_rel); 
}
private setDs(tip_cod: number, cod_rel: string) { 
  this.antRep.getRegularTableResult("GRBSOLI_01", {
    "tip_cod": tip_cod,
    "cod_rel": cod_rel,
    "fec":  this.currentDate //this.selector1.val 
}).subscribe(x => { 
    let r = x.body.resultado;
    this.dataSource = r.data; 
    this.setKpiValues(r.data);
    console.log(r.data) 
    this.load0.next(true);
});
}
setKpiValues(data: any[]) {
  if (data && data.length > 0) {
    const row0 = data[0];
    this.kpi_saldovig = row0.sal_vig_bs || 0;
    this.kpi_mdesem = row0.mod_desem_bs || 0;
    this.kpi_ticpro = row0.tick_prom_bs || 0;
    this.kpi_numcli = row0.cont_cli_gr_bs || 0;
    this.tappmes = row0.tapp_mes_bs || 0;
    this.updateDonutChart(row0);
    this.updateBarChart(row0);
  }
  else
  {
    this.kpi_saldovig =0;
    this.kpi_mdesem = 0;
    this.kpi_ticpro = 0;
    this.kpi_numcli  = 0;
    this.tappmes= 0;
    this.resetKpis()
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
private setDefaults() {
  this.firstload = true;
  this.principal = cloneObject(principalConfig);
  this.show_lvl_scroll = false;
  this.curr_hier = { des_rel: "", des_lab: "" };

}
private saveBuffer(obj: any) {
  obj['idx'] = this.principal.hierBuffer.length;
  this.setCurrHier(obj.des_rel, obj.tip_cod);
  this.principal.hierBuffer.push(obj); 
} 
private updateDonutChart(row: any) {
  if (this.donutChartInstance) {
    this.donutChartInstance.series[0].setData([
      { name: 'Renovados', y: row.Porcentaje_Renovados || 0, color: '#4CB848' },
      { name: 'Por Renovar', y: row.Porcentaje_PorRenovar || 0, color: '#004481' },
      { name: 'Vencidos', y: row.Porcentaje_Vencidos || 0, color: '#EF4444' },
      { name: 'Vencen Hoy', y: row.Porcentaje_VencenHoy || 0, color: '#F59E0B' }
    ], true); // true para animar la transición
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
                  
                  let currentDate = moment(this.curr_fec).format("YYYY-MM-DD"); 
                  this.antAdmin.getLevelHierarchy(9, h[0].lvl, this.tip_cod, [this.cod_rel], { key: "fec", val: currentDate }).subscribe({
                      next: (x) => {
                          let lh = x.body.level_hierarchy;
                           
                          if (lh && lh.length > 0) {
                              let cl = lh[0];
                              this.saveBuffer({ tip_cod: cl.tip_cod, cod_rel: cl.cod_rel, des_rel: cl.des_rel });
                              this.tip_cod = h[0].tip_cod;
                              this.antRep.getRegularTableResult("GRBSOLI_01", {
                                "tip_cod": this.tip_cod,
                                "cod_rel": this.cod_rel,
                                "fec":  this.currentDate 
                            }).subscribe(x => {
                                let r = x.body.resultado;   
                                console.log(r.data)  
                                console.log(JSON.parse(r.headers))
                                this.dataSource = r.data; 
                                this.headerDefs = JSON.parse(r.headers);
                                this.setKpiValues(r.data);
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

  tableData: RegionData[] = [
    {
      nombre: 'Financiera Confianza',
      saldoVigente: 'S/ 4,500,000', mtoDesembolsado: 'S/ 1,200,000', ticketPromedio: 'S/ 5,400', nClientes: 834, tasaMes: '2.4%',
      baseInicial: 850, renovados: 382, porRenovar: 298, vencidos: 127, vencenHoy: 43,
      pagoPuntual: '96.2%', efectividad30a0: '88.5%', efectividad1a30: '81.2%', conteoGrupos: 125,
      isTotal: true
    },
    {
      nombre: 'Banca Grupal',
      saldoVigente: 'S/ 320,000', mtoDesembolsado: 'S/ 85,000', ticketPromedio: 'S/ 5,300', nClientes: 60, tasaMes: '2.5%',
      baseInicial: 60, renovados: 45, porRenovar: 10, vencidos: 5, vencenHoy: 0,
      pagoPuntual: '98.5%', efectividad30a0: '92.0%', efectividad1a30: '85.0%', conteoGrupos: 45
    },
    {
      nombre: 'Oriente',
      saldoVigente: 'S/ 650,000', mtoDesembolsado: 'S/ 180,000', ticketPromedio: 'S/ 5,410', nClientes: 120, tasaMes: '2.4%',
      baseInicial: 120, renovados: 50, porRenovar: 40, vencidos: 20, vencenHoy: 10,
      pagoPuntual: '94.1%', efectividad30a0: '87.5%', efectividad1a30: '79.0%', conteoGrupos: 12
    },
    {
      nombre: 'Norte 2',
      saldoVigente: 'S/ 590,000', mtoDesembolsado: 'S/ 160,000', ticketPromedio: 'S/ 5,360', nClientes: 110, tasaMes: '2.3%',
      baseInicial: 110, renovados: 45, porRenovar: 45, vencidos: 15, vencenHoy: 5,
      pagoPuntual: '95.0%', efectividad30a0: '89.2%', efectividad1a30: '80.5%', conteoGrupos: 18
    },
    {
      nombre: 'Norte 1',
      saldoVigente: 'S/ 510,000', mtoDesembolsado: 'S/ 140,000', ticketPromedio: 'S/ 5,360', nClientes: 95, tasaMes: '2.4%',
      baseInicial: 95, renovados: 40, porRenovar: 35, vencidos: 12, vencenHoy: 8,
      pagoPuntual: '96.8%', efectividad30a0: '90.1%', efectividad1a30: '82.3%', conteoGrupos: 15
    },
    {
      nombre: 'Lima',
      saldoVigente: 'S/ 970,000', mtoDesembolsado: 'S/ 250,000', ticketPromedio: 'S/ 5,380', nClientes: 180, tasaMes: '2.5%',
      baseInicial: 180, renovados: 80, porRenovar: 60, vencidos: 30, vencenHoy: 10,
      pagoPuntual: '97.5%', efectividad30a0: '85.4%', efectividad1a30: '78.9%', conteoGrupos: 8
    },
    {
      nombre: 'Centro',
      saldoVigente: 'S/ 760,000', mtoDesembolsado: 'S/ 210,000', ticketPromedio: 'S/ 5,420', nClientes: 140, tasaMes: '2.3%',
      baseInicial: 140, renovados: 65, porRenovar: 50, vencidos: 20, vencenHoy: 5,
      pagoPuntual: '96.0%', efectividad30a0: '88.8%', efectividad1a30: '81.0%', conteoGrupos: 14
    },
    {
      nombre: 'Sur 2',
      saldoVigente: 'S/ 430,000', mtoDesembolsado: 'S/ 115,000', ticketPromedio: 'S/ 5,370', nClientes: 80, tasaMes: '2.4%',
      baseInicial: 80, renovados: 35, porRenovar: 30, vencidos: 10, vencenHoy: 5,
      pagoPuntual: '95.5%', efectividad30a0: '90.5%', efectividad1a30: '83.5%', conteoGrupos: 7
    },
    {
      nombre: 'Sur 1',
      saldoVigente: 'S/ 270,000', mtoDesembolsado: 'S/ 60,000', ticketPromedio: 'S/ 5,380', nClientes: 49, tasaMes: '2.4%',
      baseInicial: 65, renovados: 22, porRenovar: 28, vencidos: 15, vencenHoy: 0,
      pagoPuntual: '94.8%', efectividad30a0: '86.7%', efectividad1a30: '84.1%', conteoGrupos: 6
    }
  ];

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initDonutChart();
      this.initBarChart();
      
      // Forzamos la actualización del tamaño de Highcharts para que reconozca 
      // si la pantalla es de móvil o de PC al iniciar.
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }

  private resetKpis() {
    this.kpi_saldovig = 0;
    this.kpi_mdesem = 0;
    this.kpi_ticpro = 0;
    this.kpi_numcli = 0;
    this.tappmes = 0;
    if (this.donutChartInstance) {
      this.donutChartInstance.series[0].setData([], true);
    }
    if (this.barChartInstance) { // <-- Añadir este bloque
      this.barChartInstance.series[0].setData([0, 0, 0], true);
    }
  }
  // private initDonutChart(): void {
  //   Highcharts.chart(this.donutChartRef.nativeElement, {
  //     chart: { 
  //       type: 'pie', 
  //       backgroundColor: 'transparent', 
  //       style: { fontFamily: "'Inter', sans-serif" }
  //     },
  //     title: { text: undefined },
  //     credits: { enabled: false },
  //     plotOptions: {
  //       pie: { 
  //         innerSize: '65%', // Dona un poco más gruesa
  //         size: '120%', // ¡Dona mucho más grande!
  //         center: ['30%', '50%'], // Movida hacia la izquierda para dar espacio a la leyenda
  //         borderWidth: 0, 
  //         dataLabels: { enabled: false }, 
  //         showInLegend: true 
  //       }
  //     },
  //     legend: { 
  //       align: 'right', 
  //       verticalAlign: 'middle', 
  //       layout: 'vertical', 
  //       symbolRadius: 0, 
  //       itemMarginBottom: 8, 
  //       itemStyle: { 
  //         fontWeight: 'normal', 
  //         fontSize: '11px', 
  //         color: '#64748B',
  //         textOverflow: 'none'
  //       }
  //     },
  //     series: [{
  //       type: 'pie', 
  //       name: 'Porcentaje',
  //       data: [
  //         { name: 'Renovados', y: 45, color: '#4CB848' },
  //         { name: 'Por Renovar', y: 35, color: '#004481' },
  //         { name: 'Vencidos', y: 15, color: '#EF4444' },
  //         { name: 'Vencen Hoy', y: 5, color: '#F59E0B' }
  //       ]
  //     }]
  //   });
  // }
  private initDonutChart(): void {
    this.donutChartInstance = Highcharts.chart(this.donutChartRef.nativeElement, {
      chart: { 
        type: 'pie', 
        backgroundColor: 'transparent', 
        style: { fontFamily: "'Inter', sans-serif" }
      },
      title: { text: undefined },
      credits: { enabled: false },
      plotOptions: {
        pie: { 
          innerSize: '65%', 
          size: '120%', 
          center: ['30%', '50%'], 
          borderWidth: 2, 
          borderColor: '#ffffff',
          dataLabels: { enabled: false }, 
          showInLegend: true 
        }
      },
      legend: { 
        align: 'right', 
        verticalAlign: 'middle', 
        layout: 'vertical', 
        symbolRadius: 0, 
        itemMarginBottom: 8, 
        itemStyle: { 
          fontWeight: 'normal', 
          fontSize: '11px', 
          color: '#64748B',
          textOverflow: 'none'
        }
      },
      series: [{
        type: 'pie', 
        name: 'Porcentaje',
        data: [
          { name: 'Renovados', y: 45, color: '#4CB848' },   // Verde Éxito
        { name: 'Por Renovar', y: 35, color: '#004481' }, // Azul Institucional
        { name: 'Vencidos', y: 15, color: '#EF4444' },    // Rojo (Alerta)
        { name: 'Vencen Hoy', y: 5, color: '#F59E0B' }
        ]
      }]
    });
  }
  // private initBarChart(): void {
  //   Highcharts.chart(this.barChartRef.nativeElement, {
  //     chart: { 
  //       type: 'column', 
  //       backgroundColor: 'transparent', 
  //       style: { fontFamily: "'Inter', sans-serif" }
  //     },
  //     title: { text: undefined },
  //     credits: { enabled: false },
  //     xAxis: { 
  //       categories: ['Nuevos', 'Recurrentes', 'Recuperados'], 
  //       lineWidth: 1, 
  //       lineColor: '#E2E8F0', 
  //       tickWidth: 0, 
  //       labels: { style: { fontSize: '11px', color: '#64748B' } } 
  //     },
  //     yAxis: { 
  //       title: { text: undefined }, 
  //       gridLineColor: '#E2E8F0', 
  //       labels: { style: { fontSize: '11px', color: '#64748B' } } 
  //     },
  //     legend: { enabled: false },
  //     plotOptions: { 
  //       column: { 
  //         borderRadius: 0, 
  //         pointPadding: 0.1, 
  //         borderWidth: 0, 
  //         maxPointWidth: 60 
  //       } 
  //     },
  //     series: [{ 
  //       type: 'column', 
  //       name: 'Clientes', 
  //       data: [150, 620, 80], 
  //       color: '#004481' 
  //     }]
  //   });
  // }
  private initBarChart(): void {
    // Guardamos la instancia en this.barChartInstance
    this.barChartInstance = Highcharts.chart(this.barChartRef.nativeElement, {
      chart: { 
        type: 'column', 
        backgroundColor: 'transparent', 
        style: { fontFamily: "'Inter', sans-serif" },
        marginTop: 30
      },
      title: { text: undefined },
      credits: { enabled: false },
      xAxis: { 
        categories: ['Nuevos', 'Recurrentes', 'Recuperados'], 
        lineWidth: 1, 
        lineColor: '#E2E8F0', 
        tickWidth: 0, 
        labels: { style: { fontSize: '11px', color: '#64748B',fontWeight: '500' } } 
      },
      yAxis: { 
        title: { text: undefined }, 
        gridLineColor: '#F1F5F9', 
        labels: { style: { fontSize: '11px', color: '#94A3B8' } } 
      },
      tooltip: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        shadow: true,
        useHTML: true,
        headerFormat: '<span style="font-size: 10px; color: #64748B; font-weight: 600">{point.key}</span><br/>',
        pointFormat: '<span style="color:{point.color}">●</span> <b style="color: #004481">{point.y}</b> Clientes',
        style: { fontFamily: "'Inter', sans-serif" }
      },
      legend: { enabled: false },
      plotOptions: { 
        column: { 
          borderRadius: 4, // Un poco de redondeado se ve mejor
          pointPadding: 0.1, 
          borderWidth: 0, 
          maxPointWidth: 60,
          dataLabels: { enabled: true, style: { fontSize: '10px' } } // Opcional: mostrar el valor arriba
        } 
      },
      series: [{ 
        type: 'column', 
        name: 'Clientes', 
        data: [0, 0, 0], // Iniciamos en cero
        color: '#004481' 
      }]
    });
  }
  private updateBarChart(row: any) {
    if (this.barChartInstance) {
      this.barChartInstance.series[0].setData([
        row.conteo_ant_cli_nuev || 0,
        row.conteo_ant_cli_recurr || 0,
        row.conteo_ant_cli_repre || 0
      ], true);
    }
  }
}