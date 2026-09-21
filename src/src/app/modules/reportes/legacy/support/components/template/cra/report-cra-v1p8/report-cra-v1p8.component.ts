import { Component,ChangeDetectorRef, OnDestroy, OnInit, ViewChild} from '@angular/core';

import { ReplaySubject, Subject,combineLatest,BehaviorSubject } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { takeUntil, map, switchMap } from 'rxjs/operators';
import { ReportT } from '../../../../services/report';
import { SelectService } from '../../../../services/select.service';
import { MatTableDataSource } from '@angular/material/table';
import { GraphicService } from '../../../../services/graphic.service';
import { TableMHService } from '../../../../services/table.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ComercialService } from 'app/modules/reportes/legacy/comercial/comercial.service';
import { cra } from 'app/modules/reportes/legacy/comercial/rda/administracion/cra-map';
import { isNull, isNullOrUndefined } from 'app/core/shared/functions.util';
import { ModRepService } from 'app/modules/reportes/compartido/servicios/mod-rep.service';
import { UserService } from 'app/system/admin/services/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BuscadorKaypachaComponent } from 'app/modules/Kaypacha2/buscador/buscador.component';


@Component({
  selector: 'app-report-cra-v1p8',
  templateUrl: './report-cra-v1p8.component.html',
  styleUrls: ['./report-cra-v1p8.component.scss']
})
export class ReportCraV1p8Component implements OnInit, OnDestroy {
  report: ReportT;
  activeHier: boolean;
  confHier1: any;

  activeFilters: boolean;

  configFilters: SelectService[];

  
  configG:string[];
  configT:string[];
  
  config_graphic:any;
  config_table:TableMHService[]=[];
 
  filter$=new Subject<{}>();
  level$=new Subject<any>();
  
  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private cdr:ChangeDetectorRef,
    private cs:ComercialService,
    private user:UserService,
    private antRep: ModRepService,
    private route:ActivatedRoute,
    public dialog: MatDialog,) {
  }

  ngOnInit() {
    this.activeHier = false;
    this.activeFilters = false;
    this.configFilters = []; 
    this.route.data.subscribe(d => {
      this.report = new ReportT(cra(d.report));
      this.configT = this.report.getCount();
      this.configG = this.report.getCountG();
      this.processFilters();
      this.combineSelections();
      this.iniHierarchy();
    });
    
  }

  private processFilters() {
    const filters: any = this.report.getFilters();
    filters.forEach(f => {
      const confS = new SelectService();
      confS.labelName(f.label);
      confS.getVariable(f.variable);
      confS.selectedVAlue(f.selected);
      confS.adddata(f.data);
      this.configFilters.push(confS);
    });
    this.activeFilters = true;
  }

  private iniHierarchy() {
    let cfg = this.antRep.getHierarchyConfig(this.report.getJerar());
    console.log(cfg)//{code: 4, max_lvl: 1}
    this.antRep.getBaseHierarchy(cfg.code).subscribe(
      x => {
        let bh: any = x.body.base_hierarchy;
        console.log(bh)
        this.confHier1 = {
          roots: bh, 
          cod_hier: cfg.code, 
          max_lvl: cfg.max_lvl,
          dlg_tlt: "JERARQUIA UNIDAD"
        }
        if (!isNullOrUndefined(cfg.params)) {
          this.confHier1["params_hier"] = cfg.params;
        }
        this.activeHier = true;
      }
    ); 
  }

  loadFilter(r){
    this.filter$.next(r)
  }

  selectHier(evt: any) {
    let lv: any = evt[0];
    this.level$.next(lv);
  }
  
  private combineSelections() {  
    combineLatest([this.filter$])
    .subscribe(([filter])=>{ 
      this.configT.forEach((find,index)=>{ 
        let datoUsuario = this.user.get("profile");  
        console.log(datoUsuario)
        let params={}
        params={...filter} 
        params = { 
          //secuency: '[{"tip_cod":2,"cod_rel":"'+datoUsuario.cod_bt+'","order":0}]', 
          secuency: '[{"tip_cod":2,"cod_rel":"'+datoUsuario.cod_bt+'","order":0}]', 
          tip_cod: 2, 
          cod_rel: datoUsuario.cod_bt, 
          Ter: filter['Ter'],
          fec: filter['fec']
        }
        console.log(params)
        this.renderTable(params,{find:find,index:index})
      })
    })
    /*let datoUsuario = this.user.get("profile"); 
    let params={}
        params={...filter,...lp} 
        params = { 
          secuency: '[{"tip_cod":2,"cod_rel":"'+datoUsuario.cod_bt+'","order":0}]', 
          tip_cod: 2, 
          cod_rel: datoUsuario.cod_bt, 
          Ter: filter['Ter'],
          fec: filter['fec']
        }
    this.renderTable(params,{find:find,index:index})    
    */ 
    /*combineLatest([this.filter$,this.level$])
    .subscribe(([filter,level])=>{
      console.log(filter)
      let lp = { tip_cod: level.tip_cod, cod_rel: level.cod_rel };
      this.configG.forEach((find,index)=>{
        let params={...filter,...lp}
        console.log(params)

        this.renderGrafico(params,{find:find,index:index})
      }) 
      this.configT.forEach((find,index)=>{
        console.log("piero")
        let datoUsuario = this.user.get("profile"); 
        //console.log(datoUsuario)
        //console.log(datoUsuario[0].cod_bt);
        let params={}
        params={...filter,...lp} 
        params = { 
          //secuency: '[{"tip_cod":2,"cod_rel":"'+datoUsuario.cod_bt+'","order":0}]', 
          secuency: '[{"tip_cod":2,"cod_rel":"'+datoUsuario.cod_bt+'","order":0}]', 
          tip_cod: 2, 
          cod_rel: datoUsuario.cod_bt, 
          Ter: filter['Ter'],
          fec: filter['fec']
        }
        console.log(params)
        this.renderTable(params,{find:find,index:index})
      })
    })*/
  }
  
//   openSearch(): void {
//     const dialogConfig = new MatDialogConfig();
//     dialogConfig.data = {
//         showCloseBtn: true
//     }; 
//     const dialogRef = this.dialog.open(BuscadorKaypachaComponent, dialogConfig);
//     dialogRef.afterClosed().subscribe(v => {
//         if (v) {
//             this.getServerData(v.cod_bt);
//         }
//     });
// }

  private renderTable(r,add):void{
    const table=this.report.getTableFind(add.index);
    const report=this.report.getRNameCompleted(add.find);
    //console.log(this.report);
    const confT= new TableMHService(table);
    confT.results(true,true,false);
    this.config_table[add.index]=confT;
    const params={...confT.getParamsAdd(),...r};
    const reportType=this.report.getReportType();
    this.cs.getMixData(report,reportType,params)
    .pipe(takeUntil(this.destroy$)
    )
    .subscribe(
    (data)=>{
      let result=data.body['result'];
      const confT=new TableMHService(table);
      confT.results(true,false,false);
      confT.addColumns(result.headers);
      confT.addELEMENT_DATA(result.body);
      confT.addExt(result.additional);
      this.config_table[add.index]=confT;
      this.cdr.detectChanges();
    },
    ()=>{
      const confT= new TableMHService(table);
      confT.results(true,false,true);
      this.config_table[add.index]=confT;
     
      this.cdr.detectChanges();
    });
  }

  private renderGrafico(r,add):void{
    const graphic=this.report.getGraphicFind(add.index);
    const report=this.report.getRNameCompleted(add.find);
    const params={...r};
    this.cs.getGraphicData(report,params)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
    (data)=>{
      let result=data.body['result'];
      let global:GraphicService[]=[];
      result.forEach((gf)=>{
        const confG=new GraphicService(graphic);
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
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}