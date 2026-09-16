import * as Highcharts from 'highcharts';
import { Component, Input, OnInit } from '@angular/core';
import { copyFields } from 'app/core/shared/functions.util';

@Component({
  selector: 'app-desempenio-kaypacha',
  templateUrl: './desempenio.component.html',
  styleUrls: ['./desempenio.component.scss']
})
export class DesempenioKaypachaComponent implements OnInit {
  @Input() config:any;

  Highcharts: typeof Highcharts = Highcharts;

  enableNavigators:boolean = false;

  chartDb:any[]=[];
  chart1:any;
  chart2:any;

  candado:any;

  loading:boolean = true;

  constructor() { }

  ngOnInit(): void {
    if(Object.keys(this.config).length>3){
      this.enableNavigators=true;
    }
    let i3 = this.config.i3;
    this.candado = {
      title:i3.title,
      d1:i3.hist[0],
      d2:i3.hist[1],
      d3:i3.hist[2],
      d4:i3.hist[3],
      d5:i3.hist[4],
      d6:i3.hist[5],
      d7:i3.hist[6],
      d8:i3.hist[7],
      d9:i3.hist[8],
      d10:i3.hist[9],
      d11:i3.hist[10],
      d12:i3.hist[11]
    }
    this.buildDb();
    this.chart1 = this.chartDb[0];
    this.chart2 = this.chartDb[1];
  }

  buildDb(){
    Object.keys(this.config).forEach(v => {
      if(v!="i3"){
        let cp = this.config[v];
        let fd =[];
        cp.hist.forEach((v,i)=>{
          let mv =[Date.UTC(2022,i,1),parseInt(v)];
          fd.push(mv);
        });
        let sd = [{
          data:fd,
          type:cp.type,
        }];
        let a = {
          series:sd
        }
        copyFields(a,cp.options);
        let f ={
          title:cp.title,
          options:a
        }
        this.chartDb.push(f);
      }
    });
    this.loading=false;
  }

  eventLeft(){
  }

  eventRight(){
  }

}
