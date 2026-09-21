import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnalistaService } from '../../compartido/servicios/analista.service';
import { ModSecService } from '../../compartido/servicios/mod-sec.service';
import { ListaBaseComponent } from '../lista-base/lista-base.component';
import { headers } from './priorizacion-leads.util';

@Component({
  selector: 'app-priorizacion-leads-listas-analista',
  templateUrl: '../lista-base/lista-base.component.html',
  styleUrls: ['./priorizacion-leads.component.scss', '../lista-base/lista-base.component.scss']
})
export class PriorizacionLeadsComponent extends ListaBaseComponent implements OnInit,OnDestroy {

  constructor(public router: Router, public activatedRoute: ActivatedRoute, private antSec: ModSecService, public analista: AnalistaService) {
    super(router, activatedRoute, analista);
  }
  ngOnDestroy(): void {
    this.destroy();
  }

  ngOnInit(): void {
    this.title = 'Priorización de Leads';
    this.checkFilters = [
      {
        key: 'ind_desem',
        label: 'Ocultar Desembolsados'
      },
      {
        key: 'dia_atr',
        label: 'Ocultar en Mora'
      }
    ];
    this.headers = headers;
    this.init();
    if (this.analista.cod_bt) {
      this.ds();
    } else {
      this.navRoot();
    }

  }

  private ds() {
    this.antSec.getListaPrioLeads(this.analista.cod_bt).subscribe(x => {
      this.dataSource = x.body.resultado;
      this.currDataSource = x.body.resultado;
      this.analista.doneLoadingDataSource$.next(x.body.resultado);
    });
  }

  getDataSource(sec: any) {
    this.dataSource = [];
    this.ds();
  }

  checkFilter(key: string) {
    // if(key=='ind_desem'){
    //   this.currDataSource = this.oriDataSource.filter(x => x.ind_desem===1);
    // }
    // if(key=='dia_atr'){
    //   this.currDataSource = this.oriDataSource.filter(x => x.dia_atr>=8);
    // }
    // this.dataSource=this.currDataSource;
  }


}
