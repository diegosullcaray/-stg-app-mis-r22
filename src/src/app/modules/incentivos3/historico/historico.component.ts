import * as Highcharts from 'highcharts';
import { Component, OnInit } from '@angular/core';
import { Incentivos3Service } from '../compartido/servicios/incentivos3.service';

@Component({
  selector: 'app-historico-incentivos3',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  updateChartFlag:boolean

  config: any;
  chartRef: any;

  constructor(private inc3: Incentivos3Service) { }

  ngOnInit() {
    this.updateChartFlag=false;
    //this.config = this.inc3.historico;
    this.config={};
  }

  chartCallback: Highcharts.ChartCallbackFunction = (chart) => {
    this.chartRef = chart;
    this.config.series.forEach((x:any)=>{
      this.chartRef.addSeries(x);
    });
    //console.log(this.config.series)
    //this.config.opts.series=this.config.series;
    //this.chartRef.series=this.config.series;
    //this.updateChartFlag=true;
  };

}
