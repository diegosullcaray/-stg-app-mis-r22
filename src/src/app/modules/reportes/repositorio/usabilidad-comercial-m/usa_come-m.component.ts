import * as moment from 'moment';
import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { IStgTableHeader } from "app/core/screen/components/stg-table/stg-table.interface";
import { UserService } from "app/system/admin/services/user.service";
import { ModRepService } from "../../compartido/servicios/mod-rep.service";
import { cloneObject, isNullOrUndefined, onNullOrUndefined } from 'app/core/shared/functions.util';
import { formatNumber } from '@angular/common';
import { Console } from 'console';
import { tableConf3 } from '../esg/esg.util';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import {  tableConfOPTS, tblHeaders } from './usa_come-m.util';
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { prepareDataForPagination } from 'app/core/screen/components/stg-paginator/stg-paginator.util';
import { StgPaginatorComponent } from 'app/core/screen/components/stg-paginator/stg-paginator.component';
import { StgWindowConfig } from 'app/core/screen/components/stg-window/stg-window.config';
import { MatDialog } from '@angular/material/dialog';
import { DetalleDialogMComponent } from './detalle/detalle-dialog-m.component';

@Component({  
    selector: 'app-usa-come-m.component',
    templateUrl: './usa_come-m.component.html',
    styleUrls: ['./usa_come-m.component.scss']
})
export class UsaComeMComponent implements OnInit {
 
    dataSource: any;
    dataSource2: any; 
    dataSource3: any;  
    dataSource4: any;    

    currentDate: any;
    uni_cfg: any;
    confHier1: any;
    activeHier: boolean;
    showHier: any;
    Opts: any;
 
    headerDefs: any;
    headerDefs2: any; 
    headerDefs3: any; 
    headerDefs4: any; 


    loading: boolean;

    load0: BehaviorSubject<boolean>;
    load1: BehaviorSubject<boolean>;
    load2: BehaviorSubject<boolean>; 
    firstload: boolean;

    filter1: any; 

    filter2: any; 
    tblHeaders: any;
    ftipCod: number;
    lvh: any;
    isNav: boolean;
    buffer: any;
    pointer: number;
    disNavLeft: boolean;
    disNavRight: boolean;
    vars: any;
    subs: any;
    varsDataRows: any
    @ViewChild(TemplateRef, { static: true }) templateRef: TemplateRef<any>;
    @ViewChild("paginator",{"static":false}) paginatorVC:StgPaginatorComponent;

    // 
    isDropdownOpen: boolean = false;
    fechaMensual: any;
    @ViewChild('dropdownContainer', { static: false }) dropdownContainer: ElementRef;


    constructor(public antRep: ModRepService, 
        public user: UserService, 
        public loader: StgAppLoaderService,
        private detector:ChangeDetectorRef,
        public dialog: MatDialog) { 
            this.tblHeaders = cloneObject(tblHeaders);
        }

    ngOnInit(): void {
        this.loader.open()
        this.subs = {};
        this.buffer = [];
        this.pointer = 0;
        let profile = this.user.get('profile');
        this.currentDate = moment(profile.curr_fec).format("YYYY-MM-DD");
        this.activeHier = false;
        this.loading = true;
        this.Opts = tableConfOPTS; 
        //console.log(this.Opts.tip_cod) 

        this.iniHierarchy(9, 6) //1 jerarquia 5 nivel maximo en la jerarquia, 5=admin

        this.load0 = new BehaviorSubject(false);
        this.load1 = new BehaviorSubject(false); 
        this.load2 = new BehaviorSubject(false); 
        this.loadFilter();

        this.firstload = true; 

        combineLatest([this.load0]).subscribe(([a]) => { 
            if (a ) {
                this.loading = false;
                this.loader.close();
                this.firstload = false;
            }
        }); 
    }

    preLoad() {
        if (!this.firstload) {
            this.loading = true;
            this.loader.open();
            this.load0.next(false);
           // this.load2.next(false);

        }
    }
    onFechaChange(item: any) {
        console.log('Fecha seleccionada:', item);
        // Tu lógica existente (eventFilter)
        this.eventFilter({
          source: {
            value: item,
            selected: true
          },
          isUserInput: true
        });
      }
    private dialogDet(): void {
        const dialogConfig = new StgWindowConfig();
        /*const dialogConfig = new StgWindowConfig();
        dialogConfig.width = '450px';
        dialogConfig.height = '700px'; 
        dialogConfig.disableClose = true;
        const dialogRef = this.dialog.open(DetalleDialogComponent, dialogConfig);
        */
        //const dialog = this.dialog.open(DetalleDialogComponent, dialogConfig)
        const dialogRef = this.dialog.open(DetalleDialogMComponent, {
            width: '700px',
            height: '700px', 
            disableClose: true,
            panelClass : 'stg-window-dialog',
            data: {
                vars: this.varsDataRows,
                tip_cod: this.ftipCod,
                cod_rel: this.lvh?.cod_rel,
                des_rel: this.lvh?.des_rel
            }
        });
        
        
      }
      // MÉTODO ACTUALIZADO: toggleDropdown
    toggleDropdown(event?: Event): void {
        if (event) {
            event.stopPropagation();
        }
        this.isDropdownOpen = !this.isDropdownOpen;
    }
    
    // MÉTODO ACTUALIZADO: selectItem
    selectItem(item: any, event?: Event): void {
        if (event) {
            event.stopPropagation();
        }
        
        this.fechaMensual = item;
        this.isDropdownOpen = false;
        
        // Simular el evento de onSelectionChange como en mat-select
        const mockEvent = {
            source: {
                value: item,
                selected: true
            },
            isUserInput: true
        };
        
        this.eventFilter(mockEvent);
    }

    // NUEVO: HostListener para detectar clicks fuera del dropdown
    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent): void {
        if (this.isDropdownOpen && this.dropdownContainer) {
            const targetElement = event.target as HTMLElement;
            const dropdownElement = this.dropdownContainer.nativeElement;
            
            // Si el click no fue dentro del dropdown, cerrarlo
            if (!dropdownElement.contains(targetElement)) {
                this.isDropdownOpen = false;
            }
        }
    }
    loadFilter() { 
        this.antRep.getRegularTableResult("RS_FECH", { 
            "fec": this.currentDate
        }).subscribe(x => { 
            let r = x.body.resultado; 
            
            if (r.meta1 && r.meta1.length > 0 && r.meta1[0]["json_result"]) {
                try { 
                    this.filter1 = JSON.parse(r.meta1[0]["json_result"]);
                     
                    if (this.filter1 && this.filter1.length > 0) {
                        this.fechaMensual = this.filter1[0];
                    } else {
                        this.fechaMensual = null;
                    }
                     
                    this.detector.detectChanges();
                    
                } catch (error) { 
                    this.filter1 = [];
                    this.fechaMensual = null;
                }
            } else {
                this.filter1 = [];
                this.fechaMensual = null;
            }
             
            
        }, error => {
            this.filter1 = [];
            this.fechaMensual = null;
            this.load0.next(true);  
        });
    }
      ddEventV(evt?: any) {
        if (!evt || !evt.row || evt.key !== 'descripcion') return;
    
        // Solo abrir si tip_cod es 17
        if (this.ftipCod !== 17) {
            console.log('Modal bloqueado: tip_cod != 17');
            return;
        }
     
        // No abrir si es el primer registro (ajusta esto según el log)
        if (evt.row.fila === 1) {
            console.log('Modal bloqueado: es el primer registro');
            return;
        }
    
        console.log('Abriendo modal:', evt);
    
        this.varsDataRows = evt;
        this.pointer += 1;
        for (let i = this.pointer; i < this.buffer.length; i++) {
            this.buffer.pop();
        }
    
        this.disNavLeft = false;
        this.disNavRight = true;
    
        const s = evt.row.fila + '';
        this.vars = this.subs[s];
    
        this.buffer[this.pointer] = {
            event: 'ddv',
            body: {
                vars: this.subs[s]
            }
        };
    
        this.dialogDet();
    }
    
    
    
    
    

    iniHierarchy(code: number, max_lvl: number) {
        this.antRep.getBaseHierarchy(code).subscribe(
            x => {

                let bh: any = x.body.base_hierarchy;
                //console.log(bh)
                this.confHier1 = {
                    roots: bh, //antes r_tip_cod: bh.tip_cod,
                    cod_hier: code,
                    params_hier: { key: "fec", val: this.currentDate },
                    max_lvl: max_lvl,
                    dlg_tlt: "JERARQUIA UNIDAD"

                }
                this.activeHier = true;
            }
        );
    }

    eventFilter(event: any) { 
        if (!this.firstload && event.isUserInput) {
            this.loadData();

        }

    }
 

    selectHier(evt: any) {
        this.lvh = evt[0];
        this.ftipCod= this.lvh.tip_cod
        
        this.loadData();

    }

    loadData() {
 
        let tipcod = this.lvh.tip_cod;
        let codrel = this.lvh.cod_rel; 

        //this.load3.next(true);
        this.preLoad();
        console.log(this.fechaMensual.val)
        //console.log({ "tip_cod": tipcod, "cod_rel": codrel, "fec": this.currentDate})
        this.antRep.getRegularTableResult("RS_TAB_COM_01", { "tip_cod": tipcod, "cod_rel": codrel, "fec": this.fechaMensual.val}).subscribe(

            x => {
                //console.log(x.body.resultado)
                let r = x.body.resultado;
                this.dataSource = r.data;
                this.headerDefs = this.tblHeaders; 
                this.load0.next(true);
            }

        );
         
         

         
    }

}