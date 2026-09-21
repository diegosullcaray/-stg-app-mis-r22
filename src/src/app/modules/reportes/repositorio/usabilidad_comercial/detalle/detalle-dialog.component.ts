import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DetalleBaseComponent } from './detalle-base.component'; 
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
 
import { animate, style, transition, trigger } from '@angular/animations';
import { LayoutService } from 'app/system/admin/services/layout.service';
import { Incentivos3Service } from 'app/modules/incentivos3/compartido/servicios/incentivos3.service';
import { ModIncentivos3Service } from 'app/modules/incentivos3/compartido/servicios/mod-incentivos3.service';
import { ModRepService } from 'app/modules/reportes/compartido/servicios/mod-rep.service';
//import { tableConfOPTS, tblHeaders } from '../usa_come.util';
import { cloneObject } from 'app/core/shared/functions.util';
import { tblHeaders } from '../detalle/detalle.util';
import { prepareDataForPagination } from 'app/core/screen/components/stg-paginator/stg-paginator.util';
import { StgPaginatorComponent } from 'app/core/screen/components/stg-paginator/stg-paginator.component';
import { BehaviorSubject, combineLatest } from 'rxjs';

@Component({
  selector: 'app-detalle-dialog-usabilidad',
  templateUrl: './detalle-dialog.component.html',  
  styleUrls: ['./detalle-dialog.component.scss'],
})
export class DetalleDialogComponent extends DetalleBaseComponent implements OnInit {
datas:any;
fechaConsulta: any;
dataSource: any;
headerDefs: any;
  tblHeaders: any;
  Opts: any;
  name:string;
  cartera: string;
  enrolado: string;
  usabilidad: string;
  dataSource3Length: number;
  dataSource3Page: any;
  showPaginator: boolean;
  firstload: boolean; 
  loading: boolean;
  load0: BehaviorSubject<boolean>;
  @ViewChild("paginator",{"static":false}) paginatorVC:StgPaginatorComponent;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public antRep: ModRepService,
    public loader: StgAppLoaderService,
    private dialogRef: MatDialogRef<DetalleDialogComponent>,
    public layout: LayoutService,
    public dialog: MatDialog,
    private detector:ChangeDetectorRef
  ) {
    super(antRep,loader,layout);
    this.tblHeaders = cloneObject(tblHeaders);
    //super(inc3,loader,ant);
  }
  preLoad() {
    if (!this.firstload) {
        this.loading = true;
        this.loader.open();
        this.load0.next(false);
       // this.load2.next(false);

    }
}
  ngOnInit(): void {
    this.loading = true;
    this.load0 = new BehaviorSubject(false);
    //this.firstload = true; 
    combineLatest([this.load0]).subscribe(([a]) => { 
      if (a ) {
          this.loading = false;
          this.loader.close();
          this.firstload = false;
      }
  }); 
    // Cargar los datos del padre
  this.vars = this.data?.vars;
  this.tip_cod = this.data?.tip_cod;
  this.cod_rel = this.data?.cod_rel;
  this.des_rel = this.data?.des_rel;
  console.log(this.vars)

  this.showVars = true; // Activar visibilidad
this.datas = this.vars.row.cod_ugru
this.name= this.vars.value 
this.cartera = this.vars.row.num_cli_stock_2
this.enrolado = this.vars.row.num_enro_2
this.usabilidad = this.vars.row.num_usab_2
this.fechaConsulta = this.vars.row.fec

console.log(this.fechaConsulta)

//console.log(this.vars)
 // console.log("Datos recibidos en el hijo:", this.vars.row.cod_ugru);
 //this.Opts = tableConfOPTS; 
 this.preLoad();
 this.antRep.getRegularTableResult("RS_TAB_COM_02", { "usuariobt": this.datas, "fecha": this.fechaConsulta }).subscribe(

  x => {
      //console.log(x.body.resultado)
      let r = x.body.resultado;
      this.dataSource = r.data;
      this.dataSource3Page = r.data; // ✅ Asignación necesaria
      this.headerDefs = this.tblHeaders; 
      this.load0.next(true);
      this.preparePagination();
      
  }

);
  this.init();

  

  }
  preparePagination() {
    if (!this.dataSource3Page || this.dataSource3Page.length === 0) {
      this.showPaginator = false;
      this.dataSource = [];
      this.dataSource3Length = 0;
      return;
    }
  
    this.dataSource3Length = this.dataSource3Page.length;
    if (this.dataSource3Length > 10) {
      this.showPaginator = true;
      prepareDataForPagination(10, this.dataSource3Page, "idPage");
      this.dataSource3Length = this.dataSource3Page.length;
this.showPaginator = this.dataSource3Length > 10;
if (this.paginatorVC) {
  this.paginatorVC.toFirstPage();
}

this.filterPage(1); // Ahora sí, ya con idPage generado
    } else {
      this.showPaginator = false;
      this.dataSource = this.dataSource3Page;
    }
  }
  eventChangePage(event:any) {
    this.filterPage(event.page)
}
filterPage(page:number){  
  this.dataSource = this.dataSource3Page.filter( p => p.idPage == page );
}

  navMain() {
    this.dialogRef.close();
  }

}
