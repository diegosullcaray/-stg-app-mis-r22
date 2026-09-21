import * as Highcharts from 'highcharts';
import Tree from 'highcharts/modules/treemap';
import Funnel from 'highcharts/modules/funnel';
Tree(Highcharts);
Funnel(Highcharts);
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogDemoComponent } from '../demo-dialog/dialog-demo.component';
import { StgWindowConfig } from 'app/core/screen/components/stg-window/stg-window.config';
import { MapDemoComponent } from '../demo-map/map-demo.component';
import { ModSistematicaService } from '../compartido/servicios/mod-sistematica.service';
import * as moment from 'moment';
import { UserService } from 'app/system/admin/services/user.service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { dsGraphDesem, dsMainCards } from './principal.util';
import { round } from 'app/core/shared/functions.util';
import { DesembolsosComponent } from '../desembolsos/desembolsos.component';
import { SistematicaService } from '../compartido/servicios/sistematica.service';

@Component({
  selector: 'app-principal-sistematica',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  activeHier: boolean;
  confHier: any;

  curr_gl:string;

  dsMainCards: any;
  dsTblVars: any;

  dsGraphDesem: any;
  dsTblDesem: any;


  graph2Opts: any;
  graph3aOpts: any;
  graph3bOpts: any;
  graph4Opts: any;
  graph5Opts: any;

  loading: boolean = true;

  load0: BehaviorSubject<boolean>;
  load1: BehaviorSubject<boolean>;

  constructor(public mDialog: MatDialog, private antDsc: ModSistematicaService, private user2: UserService,
    private loader: StgAppLoaderService,private sistematica: SistematicaService) { }

  ngOnInit(): void {
    let profile = this.user2.get('profile');
    this.activeHier = false;
    this.curr_gl = "--";

    this.dsMainCards = dsMainCards;

    this.load0 = new BehaviorSubject(false);
    this.load1 = new BehaviorSubject(false);

    combineLatest([this.load0, this.load1]).subscribe(([a, b]) => {
      if (a && b) {
        this.loading = false;
        this.loader.close();
      }
    });


    this.loader.open();

    this.antDsc.getBaseHierarchy(9).subscribe(
      x => {
        let bh: any = x.body.base_hierarchy;
        //console.log(x.body)
        const hoy = Date.now();

        let currentDate = moment(profile.curr_fec).format("YYYY-MM-DD");
        //let currentDate = moment(hoy).format("YYYY-MM-DD");  
        // let currentDate = moment(profile.curr_fec).format("YYYY-MM-DD");
        //console.log(currentDate) 
        this.confHier = {
          roots: bh,
          //r_tip_cod: bh.tip_cod, 
          //r_cod_rel: bh.cod_rel,
          //r_lvl_hier: bh.lvl,
          cod_hier: 9,
          params_hier: { key: "fec", val: currentDate },
          max_lvl: 6
        }
        //console.log(this.confHier);
        this.activeHier = true;
        this.load0.next(true);
        this.load1.next(true);
      }

    );

   

    this.dsTblVars = [
      {
        lab: 'Cartera (M)',
        val1: '80,935',
        val2: '82,685'
      },
      {
        lab: 'Desembolso Mes(M)',
        val1: '3,928',
        val2: '9,781'
      },
      {
        lab: 'Ope Desem. Mes',
        val1: '515',
        val2: '1,175'
      },
      {
        lab: 'Ticket Prom.',
        val1: '7,626',
        val2: '8,324'
      },
      {
        lab: 'Productividad',
        val1: '9.90',
        val2: '22.17'
      },
      {
        lab: 'Cancelaciones Mes(M)',
        val1: '4,285',
        val2: '8,073'
      },
      {
        lab: 'Tasa Stock',
        val1: '29.36%',
        val2: '29.33%'
      },
      {
        lab: 'Tasa Mes',
        val1: '34.26%',
        val2: '31.98%'
      },
    ];

    this.dsGraphDesem = dsGraphDesem;

    this.graph2Opts = {
      credits: {
        enabled: false
      },
      chart: {
        type: 'column'
      },
      title: {
        text: undefined
      },
      xAxis: {
        min: 1,
        //categories: ['USA', 'China', 'Brazil', 'EU', 'India', 'Russia'],
        crosshair: true
      },
      yAxis: {
        title: {
          text: 'Monto (M)'
        }
      },
      plotOptions: {
        column: {
          pointPadding: 0.1,
          borderWidth: 0
        }
      },
      series: [
        {
          name: 'Vencimiento',
          color: '#DEE356',
          data: [1100, 2950, 0, 3400, 2100, 505, 490, 520, 500, 0, 1750, 520, 400, 380, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
          name: 'Recuperado',
          color: '#585E63',
          data: [0, 0, 1500, 1500, 1050, 1050, 800, 0, 1250, 800, 1000, 550, 400, 400, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ]
    };

    this.graph4Opts = {
      credits: {
        enabled: false
      },
      title: {
        text: undefined
      },
      colors: ["#00e272", "#2caffe", "#544fc5", "#fe6a35", "#6b8abc", "#d568fb", "#2ee0ca", "#fa4b42", "#feb56a", "#91e8e12"],
      xAxis: {
        min: 1,
      },
      yAxis: [
        {
          //min: 0,
          title: {
            text: 'Productividad',
            style: {
              color: "#00e272"
            }
          },
          labels: {
            style: {
              color: "#00e272"
            }
          }
        },
        {
          //min: 70,
          gridLineWidth: 0,
          title: {
            text: 'Ope. Desembolsadas',
            style: {
              color: "#2caffe"
            }
          },
          labels: {
            style: {
              color: "#2caffe"
            }
          },
          opposite: true
        }
      ],
      plotOptions: {
        column: {
          grouping: false,
          shadow: false,
          borderWidth: 0
        },
        series: {
          label: {
            connectorAllowed: true
          },
          marker: {
            enabled: false
          }
          //pointStart: 1
        }
      },
      tooltip: {
        shared: true
      },
      series: [
        {
          name: 'Productividad',
          type: 'spline',
          //color: 'rgba(165,170,217,1)',
          data: [1.66, 1.43, 1.43, 1.71, 1.86, 2.32, 2.28, 2.28, 2.28, 2.28, 1.89, 2.13, 2.21, 2.17, 2.31, 1.75, 1.75, 1.99, 2.15, 2.17, 2.34, 2.08, 1.71, 1.71, 1.71, 1.49, 1.75, 1.75, 1.96, 1.97, 1.97],
          //pointPadding: 0.3,
          //pointPlacement: -0.2
        },
        {
          name: 'OpeDesembolsadas',
          type: 'column',
          yAxis: 1,
          //color: 'orange',
          data: [1098, 853, 853, 1347, 1728, 2162, 2334, 2334, 2334, 2334, 1599, 1994, 2133, 2045, 2180, 1063, 1063, 1503, 1966, 1981, 2091, 1765, 1046, 1046, 1046, 875, 1359, 1351, 1624, 1119, 1119]
          //pointPadding: 0.4,
          //pointPlacement: -0.2
        },
        /* {
           name: 'Control',
           type: 'line',
           color: 'lightgrey',
           data: [85.89, 85.73, 92.62, 89.52, 86.91, 88.3, 86.63, 88.94, 83.33, 88.42, 89.02, 83.75, 86.58, 85.56, 89.9, 89.11, 83.38, 82.33, 89.12, 82.58, 90.45, 84.48, 84.27, 85.27, 85.02, 87.15, 80.97, 91.54, 82.54, 89.68]
         }*/
      ]
    };

    this.graph3aOpts = {
      credits: {
        enabled: false
      },
      series: [{
        type: 'treemap',
        layoutAlgorithm: 'stripes',
        alternateStartingDirection: true,
        borderColor: '#fff',
        borderRadius: 6,
        borderWidth: 2,
        dataLabels: {
          style: {
            textOutline: 'none'
          }
        },
        levels: [{
          level: 1,
          layoutAlgorithm: 'sliceAndDice',
          dataLabels: {
            enabled: true,
            align: 'center',
            verticalAlign: 'middle',
            style: {
              fontSize: '8px'
            }
          }
        }],
        data: [{
          name: 'Mejora',
          color: '#53E686',
          value: 2873.74
        }, {
          name: 'Man. Efectivo',
          color: '#65A67C',
          value: 32819.55
        }, {
          name: 'Man. Vencer',
          color: '#FBFFAB',
          value: 13460.26
        }, {
          name: 'Deteriora',
          color: '#E35B56',
          value: 4467.46
        }, {
          name: 'Castigo',
          color: '#58665D',
          value: 0
        }]
      }],
      title: {
        text: undefined
      }
    }

    this.graph3bOpts = {
      credits: {
        enabled: false
      },
      series: [{
        type: 'treemap',
        layoutAlgorithm: 'stripes',
        alternateStartingDirection: true,
        borderColor: '#fff',
        borderRadius: 6,
        borderWidth: 2,
        dataLabels: {
          style: {
            textOutline: 'none'
          }
        },
        levels: [{
          level: 1,
          layoutAlgorithm: 'sliceAndDice',
          dataLabels: {
            enabled: true,
            align: 'center',
            verticalAlign: 'middle',
            style: {
              fontSize: '8px'
            }
          }
        }],
        data: [{
          name: 'Mejora',
          color: '#53E686',
          value: 200.28
        }, {
          name: 'Man. Efectivo',
          color: '#65A67C',
          value: 271.56
        }, {
          name: 'Man. Vencer',
          color: '#FBFFAB',
          value: 566.82
        }, {
          name: 'Deteriora',
          color: '#E35B56',
          value: 942.14
        }, {
          name: 'Castigo',
          color: '#58665D',
          value: 35
        }]
      }],
      title: {
        text: undefined
      }
    }

    this.graph5Opts = {
      credits: {
        enabled: false
      },
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'funnel'
      },
      colors: ["#2caffe", "#544fc5", "#00e272", "#fe6a35", "#6b8abc", "#d568fb", "#2ee0ca", "#fa4b42", "#feb56a", "#91e8e12"],
      title: {
        text: undefined
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            inside: true,
            format: '<b>{point.name}</b> ({point.y:,.0f})',
            //softConnector: true
          },
          //center: ['40%', '50%'],
          neckWidth: '44%',
          neckHeight: '40%',
          width: '85%'
        }
      },
      legend: {
        enabled: false
      },
      series: [{
        name: 'Agendamiento',
        //colorByPoint: true,
        data: [
          ['Prospecto Nuevo', 4064],
          ['Listo Para Comité', 1987],
          ['Listo para Desembolso', 976],
          ['Desembolsados', 846]
        ]
      }]
    };

  }

  openDesembolsos(){
    const dialogConfig = new StgWindowConfig();
    dialogConfig.width = '1200px';
    dialogConfig.height = '800px';
    dialogConfig.data = {
      graph_opts: this.dsGraphDesem,
      tbl_ds: this.dsTblDesem
    };
    dialogConfig.disableClose = false;
    const dialogRef = this.mDialog.open(DesembolsosComponent, dialogConfig);
  }

  openDialog(opts: any, title: string) {
    const dialogConfig = new StgWindowConfig();
    dialogConfig.width = '1000px';
    dialogConfig.height = '600px';
    dialogConfig.data = {
      title: title,
      opts: opts
    };
    dialogConfig.disableClose = false;
    const dialogRef = this.mDialog.open(DialogDemoComponent, dialogConfig);
  }

  openMap(evt: any) {
    const dialogConfig = new StgWindowConfig();
    dialogConfig.width = '1000px';
    dialogConfig.height = '800px';
    dialogConfig.data = {
      title: 'Demo Mapa',
    };
    dialogConfig.disableClose = false;
    const dialogRef = this.mDialog.open(MapDemoComponent, dialogConfig);
  }

  selectHier(evt: any) {
    let ch = evt[0];
    this.curr_gl = ch.des_rel;

    this.sistematica.curr_hier=ch;

    this.antDsc.getResumenCards(ch.tip_cod,ch.cod_rel).subscribe(x=>{
      
      let cards = x.body.resultado.cards;
      this.dsMainCards[0].val=cards.car;
      this.dsMainCards[1].val=cards.cli;
      this.dsMainCards[2].val=cards.desem;
      this.dsMainCards[3].val=cards.mora_30;

      let mon_desem = x.body.resultado.mon_desem_1;
      this.dsTblDesem = mon_desem;
      let ope_cump=[];
      let desem_cump=[];
      let dias_cump=[];
      mon_desem.forEach((v:any)=>{
        dias_cump.push(round(v.porc_dias,2));
        ope_cump.push(round(v.cumpl_ope_acum,2));
        desem_cump.push(round(v.cumpl_des_acum,2));
      });

      this.dsGraphDesem.series[0].data=desem_cump;
      this.dsGraphDesem.series[1].data=ope_cump;
      this.dsGraphDesem.series[2].data=dias_cump;

      this.load1.next(true);
    });
  }
}
