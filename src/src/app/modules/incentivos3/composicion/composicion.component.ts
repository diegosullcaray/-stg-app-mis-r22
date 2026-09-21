import * as Highcharts from 'highcharts';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Incentivos3Service } from '../compartido/servicios/incentivos3.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-composicion-incentivos3',
  templateUrl: './composicion.component.html',
  styleUrls: ['./composicion.component.scss']
})
export class ComposicionComponent implements OnInit,AfterViewInit,OnDestroy {
  Highcharts: typeof Highcharts = Highcharts;

  config: any;
  chartRef: any;

  constructor(private inc3: Incentivos3Service) {
  }

  ngAfterViewInit() {
    //this.chartRef.reflow();
  }

  ngOnDestroy() {
  }

  ngOnInit() {
   this.config=this.inc3.composicion;
  }

  chartCallback: Highcharts.ChartCallbackFunction = (chart) => {
    this.chartRef = chart;
    this.chartRef.series[0].setData(this.config.data);
    //this.chartRef.reflow();
  };

}
