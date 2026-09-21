import * as Highcharts from 'highcharts';

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { headDesem1, tableOpts1,headDesem2,headDesem3,headDesem4 } from './desembolsos.util';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { ModSistematicaService } from '../compartido/servicios/mod-sistematica.service';
import { SistematicaService } from '../compartido/servicios/sistematica.service';

@Component({
  selector: 'app-desembolsos-sistematica',
  templateUrl: './desembolsos.component.html',
  styleUrls: ['./desembolsos.component.scss']
})
export class DesembolsosComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  tableOpts1: any;

  headTblOpe: any;
  headTblDesem: any;
  headTblRank: any;
  headTbl12M: any;

  dsTblDesem3: any;
  dsTblDesem4: any;

  loading: boolean;

  datos: any;
  constructor(@Inject(MAT_DIALOG_DATA) data, private antDsc: ModSistematicaService,
    private loader: StgAppLoaderService, private sistematica: SistematicaService) {
    this.datos = data;
  }

  ngOnInit(): void {
    //[options]="analista.tbl_opts" (onClickCell)="actionLink($event)"
    this.tableOpts1 = tableOpts1;

    this.headTblOpe = headDesem1;
    this.headTblDesem = headDesem2;
    this.headTblRank = headDesem3;
    this.headTbl12M = headDesem4;

    this.loading = true;
    this.loader.open();
    let ch = this.sistematica.curr_hier;
    this.antDsc.getDesembolsos(ch.tip_cod, ch.cod_rel).subscribe(x => {
      this.dsTblDesem3 = x.body.resultado.mon_desem_3;
      this.dsTblDesem4 = x.body.resultado.mon_desem_4;
      this.loading = false;
      this.loader.close();
    });

  }


}