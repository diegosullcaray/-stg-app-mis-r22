import { Component, OnDestroy, OnInit } from "@angular/core";
import { MonImrService, } from "../compartido/servicios/mon-imr.service";
import { formatNumber } from "@angular/common";
import { cloneObject } from "app/core/shared/functions.util";
import { tblOpts,filter1 } from "./principal.util";
import { MatDialog } from "@angular/material/dialog";
import { LayoutService } from "app/system/admin/services/layout.service";
import { ActivatedRoute, Router } from "@angular/router"; 
import { DetalleDialogComponent } from "../detalle/detalle-dialog.component";
import { StgWindowConfig } from "app/core/screen/components/stg-window/stg-window.config";


@Component({
  selector: 'app-rep2-principal-imr-salidas',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit, OnDestroy {
  config: any;
  curr_hier: any;

  tblOpts: any;
  //tblHeaders: any;

 /**/
 filter1: any;
    selector1: any;
    firstload: boolean;
    showFilterFlagAsesor: boolean;
    showFilterBox: boolean;

    
  constructor(
    private sali: MonImrService,
    public layout: LayoutService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.tblOpts = cloneObject(tblOpts);
    //this.tblHeaders = cloneObject(tblHeaders);
  }

  ngOnInit(): void {
    this.config = this.sali.principal;
    this.curr_hier = this.sali.curr_hier;
 
    this.filter1 = filter1;
    this.firstload = true;
    this.selector1 = this.filter1[0]; 
    this.showFilterBox = false;
    this.showFilterFlagAsesor = true; 
    
    // ✅ AGREGAR ESTAS LÍNEAS para inicializar el servicio
    this.sali.filter1 = this.filter1;
    this.sali.firstload = this.firstload; // Importante: pasar el estado inicial
    
    this.sali.onToggleSelect(this.selector1); 
  }
/*ngOnInit(): void {
  this.sali.ngOnInit();
}*/

 onToggleSelect(selectedItem: any) { 
    // ✅ Solo procesar si es diferente al actual para evitar llamadas innecesarias
    if (this.selector1?.val !== selectedItem.val) {
      // ✅ Actualizar el selector local inmediatamente para UI responsiva
      this.selector1 = selectedItem;
      
      // ✅ Llamar al servicio que maneja el loader internamente
      this.sali.onToggleSelect(selectedItem);
    }
  }
  
  onTabChanged(evt: any) {
    this.sali.onTabChanged(evt);
  }

  ngOnDestroy(): void {
  }

  changeHier(item: any) {
    this.sali.changeHier(item);
  }

  loadData() {
    this.sali.loadData()
  }
   
  

  getFormatVal(val: number, typ: string) {
    /*if (cv == 1 && t=='pen') {
        return 'S/. ' + formatNumber(this.card.cie_real, 'en-US', '.0-0');
    } else */
    if (typ == 'number') {
      return formatNumber(val, 'en-US', '.0-0');
    } else if (typ == 'percent') {
      return formatNumber(val * 100, 'en-US', '.0-2') + '%';
    } else {
      return formatNumber(val, 'en-US', '.0-2');
    }
  }

  getCardValStyle(idx:number){
    /* para no pintar el link en cards especificos
    if ([0, 3].includes(idx)) {
      return {};
    }else{
      return {
        'text-decoration': 'underline'
      }
    }

    return {
        'text-decoration': 'underline'
      }*/
  }

  detCard(idx: number, item: any) {
    /* para que no se activen los links de los cards
    if ([0, 3].includes(idx)) {
      return;
    }*/
    this.sali.detalle = {
      loading: true,
      firstLoad: true,
      evt: {
        value: item.val,
        row: { tip_cod: this.sali.tip_cod, cod_rel: this.sali.cod_rel,desc:this.sali.curr_hier.des_rel},
        key: idx == 0 ? 'sali1' : idx == 1 ? 'sali2' : idx == 2 ? 'sali3': idx == 3 ? 'sali4'  : 'sali5'
      }
    }; 
    //activa el link de los cards
    /*if (this.layout.isMobile) {
      this.router.navigate(['./detalle'], { relativeTo: this.activatedRoute, skipLocationChange: true });
    } else {
      this.dialogDet();
    }*/
  }

  ddEvent(evt: any) {
    if (evt.key == "desc") {
      //console.log(evt.row);
      if (evt.row && evt.row.style !== 1) { 
      // El método ddHier que pertenece a un objeto llamado sali recibe como argumento evt.row. Esto indica que se está pasando la fila completa de datos asociada al evento.
            this.sali.ddHier(evt.row);
        } 
    } /* clic para levantar cards desde el cuerpo de la grilla*/
    /*else if (evt.key != "ret") { */
    else if (evt.key =='sali2'|| evt.key =='sali3') {
      if (evt.row && evt.row.style !== 1) { 
      this.ddCli(evt);
      }
    }
  }

  private ddCli(evt: any) {
    this.sali.detalle = {
      loading: true,
      firstLoad: true,
      evt: evt
    };
    if (this.layout.isMobile) {
      this.router.navigate(['./detalle'], { relativeTo: this.activatedRoute, skipLocationChange: true });
    } else {
      this.dialogDet();
    }
  }

  private dialogDet(): void {
    this.router.navigate(['./routed-detalle'], { relativeTo: this.activatedRoute, skipLocationChange: true });

    /*const dialogConfig = new StgWindowConfig();
    dialogConfig.width = '700px';
    dialogConfig.height = '480px';
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(DetalleDialogComponent, dialogConfig);*/
  }

  getMobileGroups() {
    let groups = [];
    for (let i = 0; i < this.config.dataCards.length; i += 2) {
        groups.push(this.config.dataCards.slice(i, i + 2));
    }
    return groups;
  }


   /*eventFilter(event: any) {
        this.selector1 = event.source.value
        if (!this.firstload && event.isUserInput) {
            this.ddCli();

        }

    }*/

}