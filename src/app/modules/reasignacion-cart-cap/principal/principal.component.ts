import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {  Router,ActivatedRoute } from '@angular/router';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { StgWindowConfig } from 'app/core/screen/components/stg-window/stg-window.config';
import { cloneObject } from 'app/core/shared/functions.util';
import { LayoutService } from 'app/system/admin/services/layout.service';
import { BehaviorSubject, combineLatest, Subject, Subscription } from 'rxjs'; 
import { ModRepService } from '../../reportes/compartido/servicios/mod-rep.service';
import { StgPaginatorComponent } from '../../../core/screen/components/stg-paginator/stg-paginator.component';
import { prepareDataForPagination } from '../../../core/screen/components/stg-paginator/stg-paginator.util';
// import { UsuariosDialogComponent } from '../usuarios/usuarios-dialog.component'; 
import { headOpt1, tblOpts1 } from './principal.util'; 
import { UserService } from '../../../system/admin/services/user.service'; 
import { ModReportesEService } from '../compartido/servicios/mod-reportes-e.service';
import { ReportesEService } from '../compartido/servicios/reportes-e.service';
import { EditarDialogPmComponent } from '../editar/editar-dialog-pm.component';
import { isNullOrUndefined } from '../../../core/shared/functions.util';
import { GuardarDialogPmComponent } from '../guardar/guardar-dialog-pm.component';
import { StgAppConfirmService } from '../../../core/screen/components/stg-app-confirm/stg-app-confirm.service';

@Component({
  selector: 'app-principal-reportes-k',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export   class PrincipalComponent implements OnInit {
  options: any; 
  dataSource: any[]; 
  dataSourceOri: any[]; 
  headers: any;
  optObs = new Subject<any>();
  dataSourceLenght: number;
  private originalDataSource: any[];
  private currentDataSource: any[];
  private pageSize = 10;
  showPaginator: boolean;
  dataSources: any;
  disableEditMet:boolean;
  disableDetMet:boolean;

  @ViewChild('paginator', { static: false }) paginator: StgPaginatorComponent;

  constructor( 
    private loader: StgAppLoaderService,  
    private antService: ModReportesEService,
    private panelservice: ReportesEService,
    private activatedRoute: ActivatedRoute,
    private layout:LayoutService,
    public dialog: MatDialog,
    public user: UserService, 
    private router: Router,
    private antRep: ModRepService,
    private confirm: StgAppConfirmService,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {    
    this.headers = headOpt1;
    this.options = tblOpts1;
   let profile = this.user.get('profile');   
   this.loader.open();
   this.antService.getRegResultadosPanelMarcas(profile.cod_bt).subscribe(x => { 
    let r = x.body.resultado;    
  this.dataSources = r.result;
  console.log(this.dataSources)
  this.dataSourceLenght=r.result.length;
  this.originalDataSource = r.result;
  this.currentDataSource = r.result;
  //this.prepPagination();

  this.antService.getConfiguracionModPM().subscribe(x => {
    let r = x.body.resultado;   
    this.panelservice.asesor = JSON.parse(r.asesor.asesor); 
    this.panelservice.canal = JSON.parse(r.canal.canal);  
    this.panelservice.agencia = JSON.parse(r.agencia.agencia);  
    this.panelservice.TipoDocumento = JSON.parse(r.TipoDocumento.TipoDocumento);  
    this.panelservice.pais = JSON.parse(r.pais.pais);  
    this.loader.close();
 
  });
  //console.log(r)
    }); 
    // this.ant.getListRanking(profile.cod_bt).subscribe(x => { 
    //     let r = x.body.resultado;    
    //     console.log(r.list[0].JSONLIST)
    //     console.log(eval(r.list[0].JSONLIST))
    //     this.dataSource=eval(r.list[0].JSONLIST)
    //     });  
    
         
    } 
    page(p: number) {
      this.dataSources = this.currentDataSource.filter(x => x.pk === p);
    }
    // private prepPagination() {
    //   let l = this.currentDataSource.length;
    //   if (l > this.pageSize) {
    //     this.showPaginator = true;
    //     this.changeDetectorRef.detectChanges();
    //     prepareDataForPagination(this.pageSize, this.currentDataSource, 'pk');
    //     this.dataSourceLenght = l;
    //     this.paginator.toFirstPage();
    //     this.page(1);
    //   } else {
    //     this.showPaginator = false;
    //     this.dataSources = this.currentDataSource;
    //   }
    // }

    // filter(evt: any) {
    //   let v = evt.target.value.toLowerCase();
    //   console.log(v)
    //   if (v === "") {
    //     this.currentDataSource = this.originalDataSource;
    //   } else {
    //     console.log(this.originalDataSource)
    //     this.currentDataSource = this.originalDataSource.filter(x => x.RFECPRO?.toString().toLowerCase().includes(v)|| x.RNUMDOC.toLowerCase().includes(v) || x.RTIPDOC.toString().toLowerCase().includes(v) || x.RPAIS.toString().toLowerCase().includes(v)  )//x => x.HFECPRO.toLowerCase().includes(v) || x.HAPENOMB.toLowerCase().includes(v)|| x.HNUMDOC.toLowerCase().includes(v)|| x.HNOMCOM.toLowerCase().includes(v)|| x.HESTDCORE.toLowerCase().includes(v)  || x.HFECINSTAL.toLowerCase().includes(v)  || x.HCANACAP.toLowerCase().includes(v)  || x.HDESTER.toLowerCase().includes(v) || x.HDESCOR.toLowerCase().includes(v) || x.HDESAGE.toLowerCase().includes(v));
    //   }
    //  // this.prepPagination();
    // }
    showView() {
      this.panelservice.editMode=false;
      this.showE();
     }

     showEdit() {
      this.panelservice.editMode=true;
      this.showE();
   }
 
 private showE(){
       if (this.layout.isMobile) {
         this.router.navigate(['./editar'], { relativeTo: this.activatedRoute, skipLocationChange: true });
       } else {
         this.dialogEdit();
      }
     }

     private dialogEdit(): void { 
      const dialogConfig = new StgWindowConfig();
    const dialogRef = this.dialog.open(EditarDialogPmComponent, dialogConfig);
      
    }
    showAdd(){  
      this.panelservice.addMode=true;
      this.showA();
     }
     private showA(){
      if (this.layout.isMobile) {
        //this.router.navigate(['./agregar'], { relativeTo: this.activatedRoute, skipLocationChange: true });
        this.router.navigate(['./guardar'], { relativeTo: this.activatedRoute, skipLocationChange: true });
      } else {
        this.dialogAdd();
     }
    }
    private refreshData() {
      //console.log("reload")
      window.location.reload(); 
    } 

    showDelete(){
      let r = this.panelservice.selectedRow;
      console.log(r)
      this.confirm.open("¿Está seguro que desea eliminar el cliente con DNI:  " + r.RNUMDOC + '?').subscribe(x => {
          if (x.result == 1) { 
            console.log(r.ROWID)

            this.antService.postDeletePM(r.ROWID).subscribe(x => {
              let res = x.body.result;
              //console.log(sd)
              //console.log(res.code)
              if(res.code==200){
                 this.refreshData();
                   
              } 
               
          });   
               
          }
      });
    }
    private dialogAdd(): void {
      const dialogConfig = new StgWindowConfig();
    const dialogRef = this.dialog.open(GuardarDialogPmComponent, dialogConfig);
      
    }

    setSelectedRow(evt: any) {
      if(isNullOrUndefined(evt.is_edit) || evt.is_edit===0){
       this.disableEditMet=true;
     }else{
      this.disableEditMet=false;
    }



     
    if(evt.is_nod===1){ 
        this.disableDetMet=true;
     }else{
        this.disableDetMet=false;
     }

      this.panelservice.selectedRow = evt;
    }
 
}
