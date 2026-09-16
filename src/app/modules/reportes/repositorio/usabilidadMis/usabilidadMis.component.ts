import * as Highcharts from 'highcharts';
import { OnInit, ChangeDetectorRef } from '@angular/core';
import { Component } from "@angular/core";
import { IStgTableHeader } from "app/core/screen/components/stg-table/stg-table.interface";
import { ModRepService } from "../../compartido/servicios/mod-rep.service";
import {  loadingConf, tableOptions, headerDef, } from './usabilidadMis.util'; 
import { UserService } from '../../../../system/admin/services/user.service';
import { Subject } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';

@Component({
    selector: 'app-usabilidadMis',
    templateUrl: './usabilidadMis.component.html',
    styleUrls: ['./usabilidadMis.component.scss']
})

export /*abstract*/ class usabilidadMisComponent {

    headerDefs2: any;

    Highcharts: typeof Highcharts = Highcharts;

    activeHier: boolean;
    confHier: any;
    maxIdx: number;
    loadingObs: boolean;
    headerDefs: any;
    loadingConf: {};
    tableOpts: any;
    dataSources: any; 
    headersOpts:any;
    currentDate_:any;

    options: any; 
    dataSource: any[]; 
    dataSourceOri: any[]; 
    headers: any;
    optObs = new Subject<any>();

    constructor(private antRep: ModRepService, private user: UserService, private changeDetectorRef: ChangeDetectorRef){
        this.loadingObs = true;
    }

    ngOnInit(): void {
        this.headerDefs = headerDef;
        this.activeHier = false;
        let currentDate = this.user.get('profile').curr_fec;
/*         this.antRep.getBaseHierarchy(9).subscribe(
            x => {
                let bh : any = x.body.base_hierarchy;
                this.confHier = {
                    roots: bh,
                    cod_hier: 9,
                    params_hier: {key:"fec",val:currentDate},
                    max_lvl: 5,
                    dlg_tlt: "JERARQUIA"
                }
                this.activeHier = true;
      
            }

        ); */

        this.antRep.getRegularData("USABIL_01",{tip_cod: '2', cod_rel: '3'}).subscribe(
            x => {
                console.log(x);
                this.dataSource = x.body.resultado.data;
                //
                console.log(x.body.resultado);
                console.log(x.body.resultado.data);
                this.loadingObs = true;
            }
        );


        //this.headers = tableHeaders;
        this.options = tableOptions;

    }


    selectHier(evt: any){
        let lv: any = evt[0];
        this.loadingObs = true;
        this.currentDate_ = this.user.get('profile').curr_fec;
        this.headers = headerDef;
        this.options = tableOptions;
        console.log(lv);
        this.antRep.getRegularTableResult("USABIL_01",{tip_cod: lv.tip_cod, cod_rel: lv.cod_rel, fec: this.currentDate_}).subscribe(
            x => {
                this.dataSource = x.body.resultado.data;
                //
                console.log(this.dataSource);
                this.loadingObs = false;
            }
        );

    }






//Highcharts.chart('container', {
    graficaPrueba: Highcharts.Options ={
    chart: {
        type: 'column'
    },
    title: {
        text: 'Top 10 Reportes más visitados'
    },
    subtitle: {
        text: 'Source: <a href="https://worldpopulationreview.com/world-cities" target="_blank">World Population Review</a>'
    },
    xAxis: {
        type: 'category',
        labels: {
            autoRotation: [-45, -90],
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Population (millions)'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Population in 2021: <b>{point.y:.1f} millions</b>'
    },
    series: [{
        type: 'bar',
        name: 'Population',
        colors: [
            '#00f194', '#9215ac', '#277dbd', '#7a17e6', '#1693b1', '#691af3',
 /*            '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
            '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
            '#03c69b',  '#00f194' */
        ],
        colorByPoint: true,
        groupPadding: 0,
        data: [
            ['Incentivos', 37.33],
            ['Monitor Efectividades', 31.18],
            ['Cartera', 27.79],
            ['Monitor Metas Desembolso', 22.23],
            ['Saldo Cartera', 21.91],
            ['Clientes y Operaciones', 21.74],
            ['Clientes Nuevos y Recurrentes', 21.32],
            ['Reporte Seguros', 20.89],
            ['Detalle de Efectividades', 20.67],
            ['Proyección Colocación', 19.11]
        ],
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
}






    //grafico 2
    graficaTest: Highcharts.Options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Cantidad de Visualizaciones'
        },
        subtitle: {
            text: 'subtitulo'
        },
        xAxis: {
            categories: [
                '01-10',
                '02-10',
                '03-10',
                '04-10',
                '05-10',
                '06-10',
                '07-10',
                '08-10',
                '09-10',
                '10-10',
                '11-10',
                '12-10',
                '13-10',
                '14-10'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Cantidad'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            type:  'column',
            name: 'Tokyo',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4,
                194.1, 95.6, 54.4,45.78,67.89]
    
        }]
    };




    //grafico 3
    GraficaTipo: Highcharts.Options = {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Cantidad de Visualizaciones por Tipo de Reporte'
        },
        subtitle: {
            text: 'Subtitulo'
        },
        xAxis: {
            categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        },
        yAxis: {
            title: {
                text: 'Cantidad de Visitas'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            type: 'line',
            name: 'Avance Comercial',
            data: [16.0, 18.2, 23.1, 27.9, 32.2, 36.4, 39.8, 38.4, 35.5, 29.2,
                22.0, 17.8]
        }, {
            type: 'line',
            name: 'Captaciones',
            data: [-2.9, -3.6, -0.6, 4.8, 10.2, 14.5, 17.6, 16.5, 12.0, 6.5,
                2.0, -0.9]
        }
        , {
            type: 'line',
            name: 'Clientes',
            data: [-21.9, -30.6, -7.6, 14.8, 10.4, 16.5, 19.6, 46.5, 52.0, 16.5,
                2.0, -0.9]
        }, {
            type: 'line',
            name: 'Cartera',
            data: [2.9, 3.6, 0.6, -4.8, -10.2, -14.5, 37.6, 26.5, 12.7, -6.5,
                12.0, -20.9]
        }, {
            type: 'line',
            name: 'Cartera en Mora',
            data: [-2.9, 3.6, -10.6, 4.8, -10.32, 34.5, 7.6, 6.5, 2.0, -6.5,
                -2.0, -10.9]
        }, {
            type: 'line',
            name: 'Incentivos',
            data: [2.9, 23.6, 30.6, 14.8, 40.2, 24.5, 27.6, -16.5, 2.0, -46.5,
                52.0, 0.49]
        }, {
            type: 'line',
            name: 'Seguros',
            data: [-2.9, -3.6, -0.6, 4.8, 10.2, 14.5, 17.6, 16.5, 12.0, 6.5,
                2.0, -0.9]
        }
    
    
    
        ]
    }
    









}