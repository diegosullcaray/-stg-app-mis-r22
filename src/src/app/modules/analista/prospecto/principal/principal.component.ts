import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { StgWindowConfig } from 'app/core/screen/components/stg-window/stg-window.config';
import { cloneObject, isNullOrUndefined } from 'app/core/shared/functions.util';
import { LayoutService } from 'app/system/admin/services/layout.service';
import { UserService } from 'app/system/admin/services/user.service';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';  
import { tblOpts1, tblOpts2, headOpt1, headOpt2 } from '../prospecto-cor.util'; 
import { ProspectoCorService } from '../compartido/servicios/prospecto-cor.service';
import { ModProspectoCorService } from '../compartido/servicios/mod-prospecto-cor.service';
import { EditarDialogCorComponent } from '../editar/editar-dialog-cor.component';
import { GuardarDialogCorComponent } from '../guardar/guardar-dialog-cor.component';
import { StgPaginatorComponent } from '../../../../core/screen/components/stg-paginator/stg-paginator.component';
import { prepareDataForPagination } from '../../../../core/screen/components/stg-paginator/stg-paginator.util';

@Component({
  selector: 'app-principal-prospecto-cor',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  tableOpts: any;
  headersOpts: any;
  dataSources: any;

  load0: BehaviorSubject<boolean>;
  load1: BehaviorSubject<boolean>;
  load2: BehaviorSubject<boolean>;
  load3: BehaviorSubject<boolean>;
  load4: BehaviorSubject<boolean>;
  load5: BehaviorSubject<boolean>;


  disableEditMet:boolean;
  disableDetMet:boolean;
  arrOrd:any;
  isAdmin:boolean;
  canEdit:boolean;
  dataSourceLenght: number;
  private originalDataSource: any[];
  private currentDataSource: any[];
  private pageSize = 10;
  showPaginator: boolean;

  @ViewChild('paginator', { static: false }) paginator: StgPaginatorComponent;

  constructor(
    private loader: StgAppLoaderService,
    private antService: ModProspectoCorService,
    private esgService: ProspectoCorService,
    private layout: LayoutService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private user:UserService,
    private changeDetectorRef: ChangeDetectorRef
  ) { 
    this.showPaginator = false;

  }

  ngOnInit(): void {
    this.disableEditMet=true;
    this.disableDetMet=true;

    this.isAdmin=false;

     this.tableOpts = cloneObject(tblOpts1) 
     this.headersOpts = cloneObject(headOpt1)
     this.dataSources = undefined;
    // this.loader.open();
     this.load0 = new BehaviorSubject(false);
     this.load1 = new BehaviorSubject(false);
     this.load2 = new BehaviorSubject(false);
     this.load3 = new BehaviorSubject(false);
     this.load4 = new BehaviorSubject(false);
     this.load5 = new BehaviorSubject(false);


    this.headersOpts = cloneObject(headOpt1) 
    this.tableOpts = cloneObject(tblOpts1);
   let profile = this.user.get('profile');   

   this.antService.getConfiguracionMod().subscribe(x => {
    let r = x.body.resultado;  
    console.log(r)
    this.esgService.dep = JSON.parse(r.dep.Departamento); 
    this.esgService.prov = JSON.parse(r.provincia.Provincia); 
    this.esgService.dist = JSON.parse(r.distrito.Distrito);  
    this.esgService.ciiu = JSON.parse(r.ciuu.Ciiu);   
    this.esgService.ctalicenc = JSON.parse(r.ctalic.CtaLicenc); 

    this.esgService.terr = JSON.parse(r.territorio.Territorio); 
    this.esgService.corr = JSON.parse(r.corredor.Corredor); 
    this.esgService.agen = JSON.parse(r.agencia.Agencia);  
    this.esgService.canalcap = JSON.parse(r.canalCap.CanalCap); 

    this.esgService.apertCta = JSON.parse(r.ctalic.CtaLicenc); 
    this.esgService.estadCorr = JSON.parse(r.estadcorre.ESTCOR); 
    this.esgService.instalado = JSON.parse(r.ctalic.CtaLicenc); 
    this.esgService.zona = JSON.parse(r.zona.Zona); 
    this.esgService.prospecto = JSON.parse(r.prospecto.Prospecto); 
    this.esgService.tipAgente = JSON.parse(r.tipAgente.TipAgente); 
    this.esgService.tipVinculo = JSON.parse(r.tipVinculo.TipVinculo); 
    this.esgService.vincFamil = JSON.parse(r.ctalic.CtaLicenc); 
 
  });

    this.antService.getRegResultadosListProsp(profile.cod_bt).subscribe(x => { 
        let r = x.body.resultado;     
      this.dataSources = r.result;
      console.log(this.dataSources)
      this.dataSourceLenght=r.result.length;
      this.originalDataSource = r.result;
      this.currentDataSource = r.result;
      this.prepPagination();
      //console.log(r)
        });  
        this.loader.close();

        this.isAdmin = true
        this.canEdit = true
    }
 
   private mergeCols(cols: string, hOpts: any) {
     let ek = [];
     cols.split(',').forEach(x => {
       let k = {
         key: x,
         label: x,
       };
       ek.push(k);
       let c = {
         key: x,
         label: x,
         style: {
           'background': '#4472c4'
         },
         format:{
           type:'truncate',
           params:{
             limit:24   
           }
       }
       };
       hOpts.push(c);
     });
     this.esgService.histEditKeys = ek;

     
  
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

      this.esgService.selectedRow = evt;
    }

   private showE(){
      if (this.layout.isMobile) {
        this.router.navigate(['./editar'], { relativeTo: this.activatedRoute, skipLocationChange: true });
      } else {
        this.dialogEdit();
     }
    }
    private prepPagination() {
      let l = this.currentDataSource.length;
      if (l > this.pageSize) {
        this.showPaginator = true;
        this.changeDetectorRef.detectChanges();
        prepareDataForPagination(this.pageSize, this.currentDataSource, 'pk');
        this.dataSourceLenght = l;
        this.paginator.toFirstPage();
        this.page(1);
      } else {
        this.showPaginator = false;
        this.dataSources = this.currentDataSource;
      }
    }
    filter(evt: any) {
      let v = evt.target.value.toLowerCase();
      console.log(v)
      if (v === "") {
        this.currentDataSource = this.originalDataSource;
      } else {
        console.log(this.originalDataSource)
        this.currentDataSource = this.originalDataSource.filter(x => x.HFECPRO?.toString().toLowerCase().includes(v)|| x.HAPENOMB.toLowerCase().includes(v) || x.HNUMDOC.toString().toLowerCase().includes(v) || x.HNOMCOM.toLowerCase().includes(v)|| x.HESTDCORE?.toLowerCase().includes(v) || x.HFECESTA?.toString().toLowerCase().includes(v) || x.HCANACAP?.toLowerCase().includes(v) || x.HDESTER?.toLowerCase().includes(v) || x.HDESCOR?.toLowerCase().includes(v)  || x.HDESAGE?.toLowerCase().includes(v) )//x => x.HFECPRO.toLowerCase().includes(v) || x.HAPENOMB.toLowerCase().includes(v)|| x.HNUMDOC.toLowerCase().includes(v)|| x.HNOMCOM.toLowerCase().includes(v)|| x.HESTDCORE.toLowerCase().includes(v)  || x.HFECINSTAL.toLowerCase().includes(v)  || x.HCANACAP.toLowerCase().includes(v)  || x.HDESTER.toLowerCase().includes(v) || x.HDESCOR.toLowerCase().includes(v) || x.HDESAGE.toLowerCase().includes(v));
      }
      this.prepPagination();
    }
    page(p: number) {
      this.dataSources = this.currentDataSource.filter(x => x.pk === p);
    }

    private showA(){
      if (this.layout.isMobile) {
        //this.router.navigate(['./agregar'], { relativeTo: this.activatedRoute, skipLocationChange: true });
        this.router.navigate(['./guardar'], { relativeTo: this.activatedRoute, skipLocationChange: true });
      } else {
        this.dialogAdd();
     }
    }

    showEdit() {
      this.esgService.editMode=true;
      this.showE();
   }
   showAdd(){  
    this.esgService.addMode=true;
    this.showA();
   }
   
   changePage(evt: any) {
    this.page(evt.page);
  }

    showView() {
     this.esgService.editMode=false;
     this.showE();
    }

   private dialogEdit(): void {
     const dialogConfig = new StgWindowConfig();
   const dialogRef = this.dialog.open(EditarDialogCorComponent, dialogConfig);
     
   }

   private dialogAdd(): void {
    const dialogConfig = new StgWindowConfig();
  const dialogRef = this.dialog.open(GuardarDialogCorComponent, dialogConfig);
    
  }

  showUse(){
     if (this.layout.isMobile) {
       this.router.navigate(['./usuarios'], { relativeTo: this.activatedRoute,skipLocationChange: true  });
     } else {
        this.dialogUse();
    }
    }

   private dialogUse(): void {
      const dialogConfig = new StgWindowConfig();
    //  const dialogRef = this.dialog.open(UsuariosDialogComponent, dialogConfig);
    }

}
