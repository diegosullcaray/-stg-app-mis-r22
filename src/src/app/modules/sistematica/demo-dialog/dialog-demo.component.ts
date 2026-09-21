import * as Highcharts from 'highcharts';
import Tree from 'highcharts/modules/treemap';
Tree(Highcharts);
import Funnel from 'highcharts/modules/funnel';
Funnel(Highcharts);
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-demo-sistematica',
  templateUrl: './dialog-demo.component.html',
  styleUrls: ['./dialog-demo.component.scss']
})
export class DialogDemoComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  datos: any;
  constructor(@Inject(MAT_DIALOG_DATA) data) {
    this.datos = data;
  }

  ngOnInit(): void {
  }


}