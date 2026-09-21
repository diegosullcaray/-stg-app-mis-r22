import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
//import { ModActividadesService } from '../../servicios/mod-actividades.service';
//import { tableHeaders, loadingConf, tableConf } from "./destino-credito.util";
import { IStgTableHeader } from "app/core/screen/components/stg-table/stg-table.interface";
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { DestinoCreditoPopupComponent } from '../../destino-credito-popup/destino-credito-popup.component';
import { Subscription } from 'rxjs';
import { baseAnimations } from "../../../core/screen/animations/animations.util";
import { isNullOrUndefined } from 'app/core/shared/functions.util';
import { StgPaginatorComponent } from 'app/core/screen/components/stg-paginator/stg-paginator.component';
import { prepareDataForPagination, STG_GRID_STYLE } from "app/core/screen/components/stg-table/stg-table.util";
import { DestinoCreditoPopupComponent } from '../../actividades/destino-credito/destino-credito-popup/destino-credito-popup.component';
//import { tableHeaders, loadingConf, tableConf } from '../../actividades/destino-credito/destino-credito.util';
//import { ModActividadesService } from '../../actividades/servicios/mod-actividades.service';
//import { ModCorresponsalService } from '../servicio/mod-corresponsal.service';
import { tableHeaders, loadingConf, tableConf } from './transaccion.util';
import { TransaccionPopupComponent } from './transaccion-popup/transaccion-popup.component';
import { ModCorresponsalService } from '../../corresponsales/servicio/mod-corresponsal.service';

@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.scss'],
  animations: baseAnimations
})
export class TransaccionComponent implements OnInit {
    loadingConf: {};
    tableConf: {};
    iconColMap: {};
    showPaginator: boolean = true;
    dataSourceLenght: number;
  
    //hierarchy props
    confHier: any;
    mainTitle = 'Seguimiento de Destino de Crédito';
    headerDefs2: any;
    headerDefs3: any;
    csSource: any;
    private bcsSource: any;
    tableCfgStyle: any;
    activeHier: boolean;
    tableMeta: any = {};
    wsSource: any;
    dataSource: any;
    headerDefs: IStgTableHeader[];
    loadingObs: boolean;
  
    private paramsHier: any;
    private cod_bt: string;
    private tip_cod: string;
    private cod_rel: string;
    private originalDataSource: any[];
    private currentDataSource: any[];
    private pageSize = 15;
  
    //class props
    //backKey:string;
    resFunctions: any;
    actSave: boolean = true;
    actVeri: boolean;
    cod_sec: string;
   
    public items: any[];
    public getItemSub: Subscription;
  
    @ViewChild('paginator', { static: false }) paginator: StgPaginatorComponent;
  
    constructor(
      private dialog: MatDialog,
      private snack: MatSnackBar,
      private antTareasService: ModCorresponsalService,
      private changeDetectorRef: ChangeDetectorRef
    ) { }
  
    ngAfterViewInit(): void {
      this.antTareasService.getRegResultadosListProsp().subscribe(x => {
        let r: any;
        let ds = x.body['resultado']['result'];
        this.dataSourceLenght = ds.length;
        this.originalDataSource = ds;
        this.currentDataSource = ds;
        this.prepPagination();
        //this.dataLoadObs = false;
      });
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
        this.dataSource = this.currentDataSource;
      }
    }
    ngOnInit(): void {
      this.tableCfgStyle = tableConf;
      this.baseInit(
        "Seguimiento de Destino de Crédito",
        tableHeaders,
        { code: 5, max_lvl: 5, dlg_tlt: "JERARQUIA ADMIN. COMER." },
        ['HFECVIS', 'HCUMPLDC'],
        { get: 'getRegResultadosListProsp' }
      );
    }
  
  
    customComponent(v: any, k: any, r: any, m: any) {
      //this no funciona en este contexto ya que se ejecuta en el ambito de la clase StgTable
      let bb: boolean = false;
      if (typeof m.inputCols == "string") {
        bb = m.inputCols == "all";
      } else {
        bb = m.inputCols.includes(k);
      }
  
      return 'input';
    }
  
    inputStyler(t: string, k: string) {
      return {
        background: 'rgb(220, 230, 241)'
      }
    }
  
    baseInit(mainTitle: string, headersDef: any[], paramsHier: any, inputCols: any, resFunctions: any): void {
      this.resFunctions = resFunctions;
      this.headerDefs = headersDef;
      this.paramsHier = paramsHier;
      this.mainTitle = mainTitle;
      this.tableMeta['inputCols'] = inputCols;
      this.loadingConf = loadingConf;
      this.tableConf = tableConf;
      this.changeDetectorRef.detectChanges();
    }
  
    public action(event, context) {
      const dialogConfig = new MatDialogConfig();
      let i = event.row.orden;
      dialogConfig.data = {
        data1: event.row
      };
      context.dialog.open(TransaccionPopupComponent, dialogConfig);
    }
  
    changePage(evt: any) {
      this.page(evt.page);
    }
  
    page(p: number) {
      this.dataSource = this.currentDataSource.filter(x => x.pk === p);
    }
  
    formatBoolean(v: any, k: any, r: any): string {
      if (v == '0') {
        return 'No';
      }
      else if (v == '1') {
        return 'Si';
      }
      else return null;
    }
  
    filter(evt: any) {
      let v = evt.target.value.toLowerCase();
      if (v === "") {
        this.currentDataSource = this.originalDataSource;
      } else {
        this.currentDataSource = this.originalDataSource.filter(x => x.HAPENOMB.toLowerCase().includes(v));
      }
      this.prepPagination();
    }
}
