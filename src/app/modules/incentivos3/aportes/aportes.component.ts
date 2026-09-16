import * as Highcharts from 'highcharts';
import { Component, OnInit } from '@angular/core';
import { Incentivos3Service } from '../compartido/servicios/incentivos3.service';

@Component({
    selector: 'app-aportes-incentivos3',
    templateUrl: './aportes.component.html',
    styleUrls: ['./aportes.component.scss']
})
export class AportesComponent implements OnInit {
    Highcharts: typeof Highcharts = Highcharts;

    config: any;
    chartRef: any;

    constructor(private inc3: Incentivos3Service) { }

    ngOnInit() {
        this.config = this.inc3.aportes;
    }

    chartCallback: Highcharts.ChartCallbackFunction = (chart) => {
        this.chartRef = chart;
        this.chartRef.series[0].setData(this.config.data1);
        this.chartRef.series[1].setData(this.config.data2);
        //this.chartRef.reflow();
    };

}
