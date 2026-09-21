import { Component, OnInit } from '@angular/core';
import { models } from 'powerbi-client';
import { ReportesEService } from '../compartido/servicios/reportes-e.service';
//import { ModReportesEService } from '../compartido/servicios/mod-reportes-e.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModKaypachaService } from '../../kaypacha/compartido/servicio/mod-kaypacha.service';
import { Subject } from 'rxjs';
import { tableHeaders, tableOptions } from './detallek.util';
import { StgAppLoaderService } from '../../../core/screen/components/stg-app-loader/stg-app-loader.service';
 
@Component({
  selector: 'app-detallek',
  templateUrl: './detallek.component.html',
  styleUrls: ['./detallek.component.scss']
})
export class DetalleKComponent implements OnInit { 
  options: any; 
  dataSource: any[];  
  dataSourceObtenido: any[];  
  dataSourceOri: any[]; 
  headers: any;
  optObs = new Subject<any>();
  reportTitle = "--"
  loading = true;
  dataSourceByHdester = {} 
  letfortable: any;
  isTable: any;
  fechaMax: any;
  loadingObs: boolean;
  constructor(
    private antRepE: ReportesEService,  
    private activatedRoute: ActivatedRoute,
    private ant: ModKaypachaService,
    private router:Router,
    private loader: StgAppLoaderService) { 

      this.loadingObs = true;
    }
     
  ngOnInit(): void { 
    
    this.letfortable = []
    this.dataSource = []
    this.dataSourceByHdester = []
    this.headers = tableHeaders;
    this.options = tableOptions;  
    this.loader.open();
      this.antRepE.selectedReportObs$.subscribe(x => {  
   
       this.reportTitle='Ranking Kaypacha 2026 - Categoria: ' + x.name; 
       this.ant.getDetalleRanking(x.rdestip).subscribe(x => { 
        //this.loader.open();
        let r = x.body.resultado;   
        this.letfortable=r.datTable 
        this.fechaMax=this.letfortable[0].fechaMax
        this.isTable =  (eval(r.datTable)).length
        //console.log((eval(r.datTable)).length) 
        this.dataSource=eval(r.list[0].JSONLIST)
        //console.log(this.dataSource)
        this.dataSourceByHdester = this.GroupBy(this.dataSource , 'hdester')
        this.loader.close()
         
       //this.letfortable=r.datTable 
        });  
        //this.loading = false; 
        
      });  
     // this.loader.close()
      //this.loadingObs = false;  
     // this.loader.close()
  } 

  GroupBy = (arr,prop)=>{
   
    return arr.reduce((groups,item)=>{
      this.loader.close()
      let val = item[prop];
      groups[val] = groups[val]||[];
      groups[val].push(item);
      return groups
     
    },{});
    this.loader.close()
  }
  
  backToList() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute, skipLocationChange: true });
  }
   
  removeDuplicates(certification): any {
    certification.forEach((item) => {
      var filteredResults = new Map();

      item['hdester'].forEach((value) => {
        if (!filteredResults.has(value.certification)) {
          filteredResults.set(value.certification, value);
        }
      });

      item['hdester'] = [];

      filteredResults.forEach((value, key) => {
        item['hdester'].push(value);
      }); 
    });

    return certification;
  }
    
  filtrarSalmos( tipoSalmo) {

    // Podemos filtrarlos mediante JavaScript
    // y retornar un nuevo arreglo filtrado
    // el cual es el que usará el ngFor
    let oraciones = this.dataSource.filter( salmo => {
      
      return salmo.hdester === tipoSalmo
    });

    console.log(oraciones)
    
     
    this.dataSourceObtenido=oraciones; 
    console.log(Array.from(new Set(this.dataSourceObtenido)))
    console.log(this.dataSourceObtenido)
    return oraciones;
  }
}
