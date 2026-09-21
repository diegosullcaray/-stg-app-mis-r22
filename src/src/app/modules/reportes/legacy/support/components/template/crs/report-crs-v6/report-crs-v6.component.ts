import { Component,ChangeDetectorRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { TableMHService} from '../../../../services/table.service';
import { ComercialService } from '../../../../../comercial/comercial.service';
import { ReplaySubject, Subject,combineLatest, concat } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportT } from '../../../../services/report';
import { SelectService } from '../../../../../support/services/select.service';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog'; 
import { SecPickerDialogComponent } from 'app/modules/shared/components/sec-picker-dialog/sec-picker-dialog.component';
import { isNullOrUndefined } from 'app/core/shared/functions.util';
import { ModAppService } from 'app/core/data/remote/instances/mod-app-service';
import { UserService } from 'app/system/admin/services/user.service';
import { ModSysAdminService } from 'app/core/data/remote/instances/mod-sys-admin.service';
import { StgAlertService } from 'app/core/screen/components/stg-alert/stg-alert.service';
import { LayoutService } from 'app/system/admin/services/layout.service'; 
  import { IStgTableHeader } from 'app/core/screen/components/stg-table/stg-table.interface';
import { ModRepService } from 'app/modules/reportes/compartido/servicios/mod-rep.service';
import { loadingConf, tableConf } from 'app/modules/reportes/repositorio/movimiento-clientes/rep01-movimiento-clientes.util';
import { tableHeadersCliente } from "./report-crs-v6.util";
import { prepareDataForPagination, STG_GRID_STYLE } from 'app/core/screen/components/stg-table/stg-table.util';
import { StgPaginatorComponent } from 'app/core/screen/components/stg-paginator/stg-paginator.component';
@Component({
  selector: 'app-report-crs-v6',
  templateUrl: './report-crs-v6.component.html',
  styleUrls: ['./report-crs-v6.component.scss']
})
export class ReportCrsV6Component implements OnDestroy,OnInit {
  mainTitle ="Becas Financiera Confianza";
  headerDefs: IStgTableHeader[];
  title_module:string;
  private currentDataSource: any[];
  report:ReportT;
  config:string[];
  loadingObs: boolean;
  private pageSize = 10;
  config_table:TableMHService[]=[];
  filter$=new Subject<{}>();
  showPaginator:boolean; 
  private originalDataSource: any[];
  dataSourceLenght: number;
  level$=new Subject<{}>();
  page$ = new Subject<{}>();
  dataSource1: any;
  currentDate: string;
  loadingConf: {};
  tableConf: {};
  dataSource: any;
  dataSourceCalc: any;
  cardsSource: any;
  cardsSourceCalc: any;
  otherSource: any;
  dataLoadObs: boolean;
  calcDataLoadObs: boolean;
  activeBtnSecSelect: boolean;
  name: string;
  position: string;
  disableCalcTab: boolean;

  cod_bt: string;
  private tip_cod: number;
  private cod_rel: string; 
     
  config_select_multiple:SelectService[]=[];
  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

  @ViewChild('paginator',{ static: false }) paginator: StgPaginatorComponent;
  
  constructor(private cdr:ChangeDetectorRef,
              private cs:ComercialService,
              public dialog: MatDialog,
              private antApp: ModAppService,
              private antRep: ModRepService,
              public layout: LayoutService,
              public user: UserService,
              public routers: Router,
              private alertService: StgAlertService,
              private antAdmin: ModSysAdminService,
              private route:ActivatedRoute) 
          {
                this.showPaginator=false;
                this.dataLoadObs = true;
                this.calcDataLoadObs = true;
                this.router();
          }

  load(r){
    this.level$.next(r) 
  }
  loadAjax(r) {
    this.page$.next(r);
  }
  page(p: number) {
    this.dataSource1 = this.currentDataSource.filter(x => x.pk === p); 
  }
changePage(evt: any) {
  this.page(evt.page);
}
filterss(evt: any) { 
  let v = evt.target.value.toLowerCase();
  if (v === "") {
      this.currentDataSource = this.originalDataSource;
  } else {
      this.currentDataSource = this.originalDataSource.filter(x => x.col_4.toLowerCase().includes(v) || x.col_6.toLowerCase().includes(v));
  }
  this.prepPagination();
}
  private prepPagination() {
    
    let l = this.currentDataSource.length; 
    if (l > this.pageSize) {
        this.showPaginator=true;
        this.cdr.detectChanges();
        prepareDataForPagination(this.pageSize, this.currentDataSource, 'pk');
        this.dataSourceLenght = l; 
        this.paginator.toFirstPage();
        this.page(1);
    } else {
        this.showPaginator=false;
        this.dataSource1 = this.currentDataSource;
    }
}
  loadFilter(r){
    this.filter$.next(r)
  }
  private baseHierObs() {
    return this.antAdmin.getBaseHierarchy(this.user.email, 1);
}
  ngOnInit(){
    this.headerDefs = tableHeadersCliente;
    this.tableConf = {
      table:{
          grid: STG_GRID_STYLE
      }
  }
    this.page$.next({ pagen: 1 });
    this.mergeParams();
    const filters:any=this.report.getFilters();
    filters.forEach(f=>{
      const confS=new SelectService();
      confS.labelName(f.label);
      confS.getVariable(f.variable); 
      confS.selectedVAlue(f.selected);
      confS.adddata(f.data);
      
      this.config_select_multiple.push(confS);
    })
    let profile = this.user.get('profile');
    this.activeBtnSecSelect = false; 
    /*if (profile.cla_use == 2) {
      this.alertService.open(
          "Atención!",
          "Si eres asesor de negocio inclusivo grupal, te informamos que el módulo estará desactivado hasta nuevo aviso, debido a las modificaciones vigentes de acuerdo a la Directiva 071-2021. Gracias por tu comprensión.",
          { width: '400px' }
      ).subscribe(x => {
          this.routers.navigateByUrl(environment.homePage);
      });
  }
   else {*/
      if (profile.tip_use === 1) {
          this.name = profile.nombre;
          this.position = profile.cargo;
          this.cod_bt = profile.cod_bt;
          concat(this.resObs(), this.baseHierObs()).subscribe(x => {
              let br: any = x.body;
              let r = br.resumen;
              if (!isNullOrUndefined(r)) { 
                  this.router();
            this.config.forEach((find,index)=>{
              let params={tip_cod: 2, cod_rel: this.cod_bt} 
              this.renderTable(params,{find:find,index:index})
            })
              }
              let h = br.base_hierarchy;
              if (!isNullOrUndefined(h)) { 
              }
          });
          this.disableCalcTab = false;
      } else {
          this.name = '--';
          this.position = '--';
          this.baseHierObs().subscribe(x => {
              let br: any = x.body;
              let h = br.base_hierarchy;
              if (!isNullOrUndefined(h)) {
                  this.proHier(h[0]);
              }
              this.openSecSelector(true);
          });

      }
  //}  
  }

  mergeParams(){
    combineLatest(this.filter$,this.level$)
    .subscribe(([filter,level])=>{
      this.router();
      this.config.forEach((find,index)=>{
        let params={...filter,...level} 
        this.renderTable(params,{find:find,index:index})
      })
    })
  }

  private router():void{
    this.route.data.subscribe(d =>{
      console.log(d)
      /*this.report=new ReportT(crs(d.report));
      this.title_module=d.title;*/
      this.config=this.report.getCount();  
    }); 
  }

  private renderTable(r,add):void{
    const table=this.report.getTableFind(add.index);
    const report=this.report.getRNameCompleted(add.find);
    const confT= new TableMHService(table);
    confT.results(true,true,false);
    this.config_table[add.index]=confT;
    const params={...confT.getParamsAdd(),...r}
    //const reportType=this.report.getReportType(); 
    this.loadingConf = loadingConf;
    this.tableConf = tableConf; 
    this.antRep.getRegularTableResult(report,params).subscribe(
      x=>{
          let d = x.body.resultado.data;
          let h = x.body.resultado.headers; 
          this.dataSourceLenght=d.length;
          this.originalDataSource = d;  
          this.currentDataSource = d;
          this.prepPagination();
          this.loadingObs = false;
      }
  ) 

 
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
  private proHier(h: any) {
    this.tip_cod = h.tip_cod;
    this.cod_rel = h.cod_rel;
}
customStyler(v:any,k:any,r:any,cfg:any){
  cfg['background-color']='rgb(197,217,241)';
  cfg['color']='rgb(0,32,96)';
  if(r.bold){
      cfg['font-weight']='bold';
  }
  return cfg;
}
  openSecSelector(dc: boolean) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
        tip_cod: this.tip_cod,
        cod_rel: this.cod_rel,
        showCloseBtn: !dc
    };
    dialogConfig.disableClose = dc;
    const dialogRef = this.dialog.open(SecPickerDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(v => {
        if (v) {
            this.name = v.des_sec;
            this.position = v.des_car;
            this.cod_bt = v.cod_sec; 
            this.dataLoadObs = true;
            this.calcDataLoadObs = true;
            this.router();
            this.config.forEach((find,index)=>{
              let params={tip_cod: 2, cod_rel: this.cod_bt} 
              this.renderTable(params,{find:find,index:index})
            })
            this.activeBtnSecSelect = true;
               
        }
    });
} 

private resObs() {
  return this.antApp.getIncentivosResumen(this.cod_bt);
}
}
