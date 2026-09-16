import { Component, OnInit } from '@angular/core';
import { IncentivosAService } from '../compartido/servicios/incentivos-a.service';
import { ModIncentivosAService } from '../compartido/servicios/mod-incentivos-a.service';
import { tableHeaders,tableOptions } from './cobertura.util';

@Component({
  selector: 'app-cobertura-incentivos-a',
  templateUrl: './cobertura.component.html',
  styleUrls: ['./cobertura.component.scss','../compartido/estilos/common.scss']
})
export class CoberturaComponent implements OnInit {
  headers:any;
  options:any;
  dataSource:[];
  constructor(
    private incentivosA: IncentivosAService,
    private antInc: ModIncentivosAService
  ) { }

  ngOnInit(): void {
    this.headers=tableHeaders;
    this.options=tableOptions;
    this.incentivosA.selHierObs$.subscribe((x:any)=>{
      this.getDs(x);
    });
  }

  private getDs(h:any){
    this.dataSource=[];
    this.antInc.getSeguiCob(h.tip_cod,h.cod_rel).subscribe(x=>{
      this.dataSource=x.body.resultado
    });
  }

  filter(evt:any){

  }
}
