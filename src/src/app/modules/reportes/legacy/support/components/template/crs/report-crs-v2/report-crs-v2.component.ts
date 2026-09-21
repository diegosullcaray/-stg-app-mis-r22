import { Component,ChangeDetectorRef, OnDestroy} from '@angular/core';
import { TableMHService} from '../../../../services/table.service';
import { ComercialService } from '../../../../../comercial/comercial.service';
import { ReplaySubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ReportT } from '../../../../../support/services/report';
import { crs } from '../../../../../comercial/rda/sectorista/crs-map';
import { GraphicService } from '../../../../services/graphic.service';
//import { RegistrarVisitaService } from '../../../../../services/registrar-visita.service';

@Component({
  selector: 'app-report-crs-v2',
  templateUrl: './report-crs-v2.component.html',
  styleUrls: ['./report-crs-v2.component.scss']
})
export class ReportCrsV2Component implements OnDestroy {
  title_module:string;
  report:ReportT;
  config:string[];
  config_graphic:any=[];
  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private cdr:ChangeDetectorRef,
              private cs:ComercialService,
              private route:ActivatedRoute/*,private registro: RegistrarVisitaService*/) {
               // registro.registrar('Analista/'+this.route.snapshot.url.join(''));
                this.route.data.subscribe(d =>{
                  this.report=new ReportT(crs(d.report));
                  this.title_module=d.title;
                  this.config=this.report.getCountG();
                }); 
  }

  load(r){
    this.config.forEach((find,index)=>this.renderGrafico(r,{find:find,index:index}))
  }

  private renderGrafico(r,add):void{
    const graphic=this.report.getGraphicFind(add.index);
    const report=this.report.getRNameCompleted(add.find);
    const confG= new GraphicService(graphic);
    confG.results(true,true,false);
    this.config_graphic=[confG,confG,confG,confG,confG,confG,confG,confG];
    const params={...confG.getParamsAdd(),...r};
    this.cs.getGraphicData(report,params)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
    (data)=>{
      let result=data.body['result'];
      let global:GraphicService[]=[];
      result.forEach((gf)=>{
        const confG=new GraphicService();
        confG.results(true,false,false);
        confG.setSerie(gf.series);
        confG.setCategorie(gf.categories[0].columnDef);
        confG.setTitle(gf.graphName);
        confG.setsubTitle(gf.graphSubName);
        confG.setTitleyAxis(gf.getUnitGraph);
        global.push(confG);
      })
      this.config_graphic=global;
      this.cdr.detectChanges();
      
    },
    ()=>{
      const confG= new GraphicService();
      confG.results(true,false,true);
      this.config_graphic=[confG,confG,confG,confG,confG,confG,confG,confG];
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
