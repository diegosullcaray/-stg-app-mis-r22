import * as Highcharts from 'highcharts';
import { Component, Input, OnInit } from '@angular/core';
import { cloneObject, copyFields } from 'app/core/shared/functions.util';

@Component({
  selector: 'app-dinamizadores-kaypacha',
  templateUrl: './dinamizadores.component.html',
  styleUrls: ['./dinamizadores.component.scss']
})
export class DinamizadoresKaypachaComponent implements OnInit {
  @Input() config: any;

  Highcharts: typeof Highcharts = Highcharts;

  enableNavigators: boolean = false;

  chartPool: any[] = [];
  chart1: any;
  chart2: any;
  currPointer: number = 0;

  loading: boolean = true;

  constructor() { }

  ngOnInit(): void {
    if (Object.keys(this.config).length > 3) {
      this.enableNavigators = true;
    }
    this.buildDb();
  }

  buildDb() {
    Object.keys(this.config).forEach(v => {
      let cp = this.config[v];
      let fd = [];
      cp.hist.forEach((v, i) => {
        let mv = [Date.UTC(2022, i, 1), parseInt(v)];
        fd.push(mv);
      });
      let sd = [{
        data: fd,
        type: cp.type,
      }];
      let a = {
        series: sd
      }
      copyFields(a, cp.options);
      let f = {
        title: cp.title,
        options: a
      }
      this.chartPool.push(f);
    });
    this.setCharts()
    this.loading = false;
  }

  setCharts(){
    let cp = cloneObject(this.chartPool);
    
    this.chart1 = cp[this.currPointer];
    this.chart2 = cp[this.currPointer + 1];
  }

  eventLeft() {
    if (this.currPointer > 0) {
      this.currPointer--;
      this.setCharts();
    }
  }

  eventRight() {
    if (this.currPointer < this.chartPool.length - 2) {
      this.currPointer++;
      this.setCharts();
    }
  }

}
