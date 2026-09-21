import * as moment from 'moment';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { UserService } from "app/system/admin/services/user.service";
import { ModRepService } from "../../compartido/servicios/mod-rep.service";
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { tableConfOPTS } from './mon-int-comer.util';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { StgPaginatorComponent } from 'app/core/screen/components/stg-paginator/stg-paginator.component';

@Component({
    selector: 'app-mon-int-comer.component',
    templateUrl: './mon-int-comer.component.html',
    styleUrls: ['./mon-int-comer.component.scss']
})
export class MonIntComerComponent implements OnInit {
 
    public dashboardData: any[] = [];
    
    // === REEMPLAZAMOS EL HISTORIAL POR TU HIERBUFFER ===
    public hierBuffer: any[] = []; 

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
    lvh: any;

    @ViewChild("paginator",{"static":false}) paginatorVC:StgPaginatorComponent;

    constructor(public antRep: ModRepService, public user: UserService, public loader: StgAppLoaderService, private detector:ChangeDetectorRef) { }

    ngOnInit(): void {
        this.loader.open();
        let profile = this.user.get('profile');
        this.currentDate = moment(profile.curr_fec).format("YYYY-MM-DD");
        this.activeHier = false;
        this.loading = true;
        this.Opts = tableConfOPTS;  

        this.iniHierarchy(9,6); 

        this.load0 = new BehaviorSubject(false);
        this.load1 = new BehaviorSubject(false); 
        this.load2 = new BehaviorSubject(false); 

        this.firstload = true; 

        combineLatest([this.load0]).subscribe(([a]) => { 
            if (a) {
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
        }
    }

    iniHierarchy(code: number, max_lvl: number) {
        this.antRep.getBaseHierarchy(code).subscribe(
            x => {
                let bh: any = x.body.base_hierarchy;
                this.confHier1 = {
                    roots: bh, 
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

    eventFilter2(event: any) { 
        if (!this.firstload && event.isUserInput) {
            this.loadData();
        }
    }
 
    selectHier(evt: any) {
        this.lvh = evt[0];
        this.loadData();
    }

    loadData() {
        let tipcod = this.lvh.tip_cod;
        let codrel = this.lvh.cod_rel; 
        let desrel = this.lvh.des_rel || 'General'; // Nombre para la raíz

        // Al seleccionar algo nuevo en el combo principal, reiniciamos el Breadcrumb (Buffer)
        this.hierBuffer = [{ tip_cod: tipcod, cod_rel: codrel, des_rel: desrel, idx: 0 }];

        // Llamamos a la función que trae los datos
        this.fetchDashboardData(tipcod, codrel);
    }

    // === FUNCIÓN DE TU BREADCRUMB (ADAPTADA) ===
    changeHier(item: any) { 
        // Si damos clic en el nivel donde ya estamos, no hace nada
        if (this.hierBuffer.length - 1 === item.idx) {
            return;
        }
        
        // Cortamos el buffer hasta el nivel donde el usuario hizo clic
        this.hierBuffer = this.hierBuffer.slice(0, item.idx + 1);
        
        // Cargamos la data de ese nivel
        this.fetchDashboardData(item.tip_cod, item.cod_rel);
    }

    // === CUANDO HACEMOS CLIC EN UN TÍTULO DEL DASHBOARD ===
    clickTitulo(columna: any) { 
        if(!columna.tip_cod || !columna.cod_rel) return;

        // 1. Agregamos el nuevo nivel al Breadcrumb
        let nextIdx = this.hierBuffer.length;
        this.hierBuffer.push({
            tip_cod: columna.tip_cod,
            cod_rel: columna.cod_rel,
            des_rel: columna.titulo, // Mostramos el título de la tarjeta en la miga de pan
            idx: nextIdx
        });

        // 2. Cargamos la nueva data
        this.fetchDashboardData(columna.tip_cod, columna.cod_rel);
    }

    fetchDashboardData(tipcod: number, codrel: number) {
        this.preLoad();
    
        this.antRep.getRegularTableResult("RS_MON_INT_COM_01", { "tip_cod": tipcod, "cod_rel": codrel, "fecha": this.currentDate}).subscribe(
            x => {
                let r = x.body.resultado;
                try {
                    if (r.headers) {
                        let parsedData = JSON.parse(r.headers);
                        if (Array.isArray(parsedData) && Array.isArray(parsedData[0])) {
                            this.dashboardData = parsedData[0]; 
                        } else {
                            this.dashboardData = parsedData;
                        }
                    } else {
                        this.dashboardData = [];
                    }
                } catch (error) {
                    console.error("Error al convertir el JSON del dashboard:", error);
                    this.dashboardData = [];
                }
                this.load0.next(true);
            },
            error => {
                console.error("Error en la petición:", error);
                this.load0.next(true); 
            }
        );
    }
}