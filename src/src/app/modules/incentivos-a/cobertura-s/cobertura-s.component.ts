import * as Highcharts from 'highcharts';
declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);

// const Exporting = require('highcharts/modules/exporting');
// Exporting(Highcharts);

// const ExportData = require('highcharts/modules/export-data');
// ExportData(Highcharts);

// const Accessibility = require('highcharts/modules/accessibility');
// Accessibility(Highcharts);

const ParallelCoordinates = require('highcharts/modules/parallel-coordinates');
ParallelCoordinates(Highcharts);

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cobertura-s-incentivos-a',
  templateUrl: './cobertura-s.component.html',
  styleUrls: ['./cobertura-s.component.scss']
})
export class CoberturaSComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: any[];

  constructor() { }

  ngOnInit(): void {
    this.chartOptions = [];
    [...Array(25).keys()].forEach((e, i) => {
      let aOpt = {};
      let vs = [];
      let fC = 0;
      [...Array(4).keys()].forEach(x => {
        let os = (Math.random() * 2 + 1) / 10;
        let v = Math.min(Math.random() + os, 1);
        if (v == 1) {
          fC++;
        }
        vs.push(v);
      });

      let c = fC >= 2 ? 'rgba(59, 209, 54,0.3)' : 'rgba(255,0,0,0.3)';
      let b = fC >= 2 ? '#3bd136' : 'red';

      aOpt['name'] = 'Asesor ' + i + ' Generado Aleatoriamente Demo';
      aOpt['options'] = {
        credits: {
          enabled: false
        },
        title: {
          text: ".",
          style: {
            'font-size': '4px'
          }
        },
        chart: {
          polar: true,
          backgroundColor: "white",
          borderColor: "#30c9d",
          borderWidth: 2,
          reflow: true,
          allowMutatingData: false,
          parallelCoordinates: true,
          parallelAxes: {
            gridLineWidth: 0,
          }
        },
        pane: {
          startAngle: -45
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          series: {
            fillColor: c,
            color: b
          }
        },
        xAxis: {
          gridLineWidth: 0,
          labels: {
            enabled: true,
            formatter: function () {
              var icon = "";
              if (this.value == "vs") {
                icon = "work";
              } else if (this.value == "vc") {
                icon = "groups";
              } else if (this.value == "e1") {
                icon = "battery_6_bar"
              } else if (this.value == "e2") {
                icon = "battery_3_bar"
              }
              return '<span class="material-icons" style="font-size:14px">' + icon + '</span></br><span style="font-size:8px;">100%</span>';
            }
          },
          type: "category"
        },
        yAxis: [
          {
            max: 1,
            min: 0,
            labels: {
              enabled: false
            }
          },
          {
            max: 1,
            min: 0,
            labels: {
              enabled: false
            }
          },
          {
            max: 1,
            min: 0,
            labels: {
              enabled: false
            }
          },
          {
            max: 1,
            min: 0,
            labels: {
              enabled: false
            }
          }
        ],
        series: [
          {
            type: "area",
            data: [
              {
                name: "vs",
                y: vs[0],
                id: 0
              },
              {
                name: "vc",
                y: vs[1],
                id: 1
              },
              {
                name: "e1",
                y: vs[2],
                id: 2
              },
              {
                name: "e2",
                y: vs[3],
                id: 3
              }
            ]
          }
        ]
      };
      this.chartOptions.push(aOpt);
    });

  }

  showSec(i: number) {
    console.log(this.chartOptions[i].name);
  }

}
