import * as moment from 'moment';
import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { UserService } from "app/system/admin/services/user.service";
import { ModRepService } from "../../compartido/servicios/mod-rep.service";
import { ModSysAdminService } from 'app/core/data/remote/instances/mod-sys-admin.service'; 
import { cloneObject, isNullOrUndefined } from 'app/core/shared/functions.util';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { tableConfOPTS, tblHeaders } from './carterizacion-cap-com.util';
import { BehaviorSubject } from 'rxjs';
import { StgPaginatorComponent } from 'app/core/screen/components/stg-paginator/stg-paginator.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-carterizacion-cap-com.component',
    templateUrl: './carterizacion-cap-com.component.html',
    styleUrls: ['./carterizacion-cap-com.component.scss']
})
export class CarterizacionCapComComponent implements OnInit {

    dataSource: any;
    currentDate: any;
    Opts: any;
    headerDefs: any;

    loading: boolean;
    load0: BehaviorSubject<boolean>;
    firstload: boolean;

    // Variables de Jerarquía (Drill Down)
    tip_cod: number;
    cod_rel: string;
    hierBuffer: any[] = [];
    
    // Variables para las tarjetas
    kpiCards: any = [];
    kpiHeaders: any = { ant: '', act: '' };

    @ViewChild(TemplateRef, { static: true }) templateRef: TemplateRef<any>;
    @ViewChild("paginator", { "static": false }) paginatorVC: StgPaginatorComponent;

    constructor(
        public antRep: ModRepService,
        public user: UserService,
        public loader: StgAppLoaderService,
        private detector: ChangeDetectorRef,
        public dialog: MatDialog,
        private antAdmin: ModSysAdminService 
    ) { }

    async ngOnInit(): Promise<void> {
        this.firstload = true;
        this.loading = true;
        
        // 1. ABRIMOS EL LOADER SOLO 1 VEZ AL INICIAR LA PANTALLA
        this.loader.open(); 
        
        let profile = this.user.get('profile');
        this.currentDate = moment(profile.curr_fec).format("YYYY-MM-DD");
        this.Opts = cloneObject(tableConfOPTS);

        this.hierBuffer = [];
        this.load0 = new BehaviorSubject(false);

        try {
            await this.getBaseHierAsync();
        } catch (error) {
            console.error("Error crítico al inicializar la pantalla:", error);
            this.cerrarCargando();
        }
    } 

    cerrarCargando() {
        this.loading = false;
        if (this.firstload) {
            this.firstload = false;
        }
        this.load0.next(true);
        this.loader.close();
    }

    private getBaseHierAsync(): Promise<void> {
        return new Promise((resolve) => {
            let userEmail = this.user.get('email') || this.user.email;
            
            this.antAdmin.getBaseHierarchy(userEmail, 9).subscribe({
                next: (x) => {
                    let h = x?.body?.base_hierarchy;
                    
                    if (!isNullOrUndefined(h) && h.length > 0) {
                        this.tip_cod = h[0].tip_cod;
                        this.cod_rel = h[0].cod_rel;
                        
                        this.antAdmin.getLevelHierarchy(9, h[0].lvl, this.tip_cod, [this.cod_rel], { key: "fec", val: this.currentDate }).subscribe({
                            next: (res) => {
                                let lh = res?.body?.level_hierarchy;
                                if (lh && lh.length > 0) {
                                    let cl = lh[0];
                                    this.saveBuffer({ tip_cod: cl.tip_cod, cod_rel: cl.cod_rel, des_rel: cl.des_rel });
                                    this.loadData();
                                    resolve();
                                } else { 
                                    this.cerrarCargando(); 
                                    resolve(); 
                                }
                            },
                            error: (err) => {
                                console.error(err);
                                this.cerrarCargando();
                                resolve();
                            }
                        });
                    } else { 
                        this.cerrarCargando(); 
                        resolve(); 
                    }
                },
                error: (err) => {
                    console.error(err);
                    this.cerrarCargando();
                    resolve();
                }
            });
        });
    }

    ddHier(evt: any) { 
        let key = evt.key; 
        let tip_cod = evt.row.htipcod || evt.row.HTIPCOD || evt.row.tip_cod;
        let cod_rel = evt.row.hcodrel || evt.row.HCODREL || evt.row.cod_rel; 
        let descripcion = evt.value || evt.row.descripcion || evt.row.DESCRIPCION || 'Detalle';
        if (tip_cod == 999 || tip_cod == 2) {
            return;
          }
        if (key !== 'descripcion') { return; }
        if (tip_cod == null || cod_rel == null) { return; }
        if (tip_cod === 7 || tip_cod === '7') { return; }

        this.tip_cod = tip_cod;
        this.cod_rel = cod_rel;

        this.saveBuffer({ tip_cod: tip_cod, cod_rel: cod_rel, des_rel: descripcion }); 
        this.loadData(); 
    }

    changeHier(item: any) { 
        if (this.hierBuffer.length - 1 === item.idx) {
            return;
        }
        
        this.tip_cod = item.tip_cod;
        this.cod_rel = item.cod_rel; 
        
        this.hierBuffer = this.hierBuffer.slice(0, item.idx + 1);
        this.loadData();
    }

    private saveBuffer(obj: any) {
        obj['idx'] = this.hierBuffer.length;
        this.hierBuffer.push(obj); 
    } 

    loadData() {
        if (!this.firstload) {
            this.loader.open();
        }

        this.antRep.getRegularTableResult("RS_MON_SALCAP_COM_01", {
            "tipcod": this.tip_cod,
            "codrel": this.cod_rel,
            "fecha":  this.currentDate
        }).subscribe({
            next: (x) => {
                try {
                    let r = x?.body?.resultado;
                    if (!r) return;
                    
                    // 1. Parseamos las cabeceras
                    let parsedHeaders = JSON.parse(r.headers); 
                    
                    // 2. INYECTAMOS EL COLOR A LA TABLA
                    const aplicarEstilos = (columnas: any[]) => {
                        columnas.forEach(col => {
                            if (col.subs && col.subs.length > 0) {
                                aplicarEstilos(col.subs);
                            } else {
                                if (col.key && String(col.key).toLowerCase().includes('var')) {
                                    col.cellStyleFn = (params: any) => {
                                        let val = Number(params.value);
                                        if (isNaN(val)) return {};
                                        
                                        if (val > 0) {
                                            return { 'color': '#10B981', 'font-weight': 'bold' }; 
                                        } else if (val < 0) {
                                            return { 'color': '#EF4444', 'font-weight': 'bold' }; 
                                        }
                                        return { 'color': '#64748B', 'font-weight': 'bold' }; 
                                    };
                                }
                            }
                        });
                    };
                    
                    aplicarEstilos(parsedHeaders);
                    this.headerDefs = parsedHeaders;
                    this.dataSource = r.data;
                    
                    // 3. TARJETAS Y VARIACIONES
                    if (r.meta1 && r.meta1.length > 0) {
                        this.kpiCards = [];
                        let meta1Data = typeof r.meta1 === 'string' ? JSON.parse(r.meta1) : r.meta1;
                        
                        let totalRow = this.dataSource && this.dataSource.length > 0 ? this.dataSource[0] : {};
                        
                        this.kpiCards = meta1Data.map((kpi: any) => {
                            let varKey = '';
                            let prodName = String(kpi.PRODUCTO).toUpperCase();
                            
                            if (prodName === 'AHORROS') varKey = 'var-ahorros';
                            else if (prodName === 'PLAZO FIJO') varKey = 'var-DPF';
                            else if (prodName === 'CTS') varKey = 'var-CTS';
                            
                            let varValue = totalRow[varKey] ? Number(totalRow[varKey]) : 0;
                            
                            kpi.variacionNum = varValue;
                            kpi.variacionAbs = Math.abs(varValue);
                            
                            return kpi;
                        });
                    } else {
                        this.kpiCards = []; 
                    }
                    
                } catch (e) {
                    console.error("Error procesando los datos de la tabla:", e);
                }
            },
            error: (err) => {
                console.error("Error en la petición a la BD:", err);
                this.cerrarCargando(); 
            },
            complete: () => {
                this.cerrarCargando(); 
            }
        });
    }
}