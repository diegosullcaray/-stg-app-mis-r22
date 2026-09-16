import * as Highcharts from 'highcharts';
import { Component, Input, OnInit } from '@angular/core';
import { LayoutService } from 'app/system/admin/services/layout.service';

@Component({
  selector: 'app-monetizacion-incentivos-a',
  templateUrl: './monetizacion.component.html',
  styleUrls: ['./monetizacion.component.scss','../compartido/estilos/common.scss']
})
export class MonetizacionComponent implements OnInit {
  @Input() config: any;;

  Highcharts: typeof Highcharts = Highcharts;

  constructor(public layout:LayoutService) { }

  ngOnInit(): void {

  }

  varsCompTxt() {
    return '' + (3-this.config.vars_comp);
  }

  varsCompCls() {
    if (this.config.state) {
      return 'color-active a';
    }
    return 'color-inactive a';
  }


}
