import { Component, OnInit } from '@angular/core';
import { tableHeaders, tableOptions } from '../composicion/composicion.util';
import { IncentivosAService } from '../compartido/servicios/incentivos-a.service';
import { ModIncentivosAService } from '../compartido/servicios/mod-incentivos-a.service';

@Component({
  selector: 'app-composicion-incentivos-a',
  templateUrl: './composicion.component.html',
  styleUrls: ['./composicion.component.scss', '../compartido/estilos/common.scss']
})
export class ComposicionComponent implements OnInit {
  headers: any;
  options: any;
  dataSource: [];

  constructor(
    private incentivosA: IncentivosAService,
    private antInc: ModIncentivosAService
  ) { }

  ngOnInit(): void {
    this.headers = tableHeaders;
    this.options = tableOptions;
    this.incentivosA.selHierObs$.subscribe((x:any) => {
      this.getDs(x);
    });
  }

  private getDs(h:any) {
    this.dataSource=[];
    this.antInc.getSeguiDet(h.tip_cod, h.cod_rel).subscribe(x => {
      this.dataSource = x.body.resultado
    });
  }

}
