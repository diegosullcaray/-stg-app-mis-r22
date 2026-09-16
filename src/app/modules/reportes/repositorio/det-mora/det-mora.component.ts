import * as moment from 'moment';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { UserService } from "app/system/admin/services/user.service";
import { ModRepService } from "../../compartido/servicios/mod-rep.service";
import { cloneObject, isNullOrUndefined, onNullOrUndefined } from 'app/core/shared/functions.util';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { filter1, tableConfOPTS, tableConfOPTS2, trafficFnMap } from './det-mora.util';
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { prepareDataForPagination } from 'app/core/screen/components/stg-paginator/stg-paginator.util';
import { StgPaginatorComponent } from 'app/core/screen/components/stg-paginator/stg-paginator.component';
import { log } from 'console';

@Component({
    selector: 'app-det-mora.component',
    templateUrl: './det-mora.component.html',
    styleUrls: ['./det-mora.component.scss']
})
export class DetMoraComponent implements OnInit {

  

    dataSource: any;
    dataSource2: any;
    dataSource3: any;
    dataSource4: any;
    dataSource5: any;
    dataSource3Ori: any;
    dataSource3Length: number;
    dataSource3Page: any;

    currentDate: any;
    uni_cfg: any;
    confHier1: any;
    activeHier: boolean;
    showHier: any;
    Opts: any;
    Opts2: any;


    headerDefs: any;
    headerDefs2: any;
    headerDefs3: any;
    headerDefs4: any;
    headerDefs5: any;

    loading: boolean;
 
    load2: BehaviorSubject<boolean>;
    load3: BehaviorSubject<boolean>;
    
    firstload: boolean;

    filter1: any;
    selector1: any;

    filter2: any;
    selector2: any;

    filter3: any;
    selector3: any;

    showPaginator: boolean;
    showFilterBox: boolean;
    
    showFilterFlagAsesor: boolean;

    saldoCartera: any;
    metasaldoCartera: any | undefined;
    porcentSaldoCartera: any;
    varsaldomediocarteravigente: any;

    saldoVigente:  any;
    metasaldoVigente: any;
    porcentSaldoVigente: any= 0;

    operAcu: any;
    metaOpeAcu: any | undefined;
    porcentopeAcu: any=0

    montoAcu: any;
    metaMontoAcu: any | undefined;
    porcentmontoAcu: any=0


    // Nuevas propiedades para almacenar los porcentajes reales
    porcentajeRealCartera: number = 0;
    porcentajeRealVigente: number = 0;
    porcentajeRealOpeAcu: number =0;
    porcentajeRealMontAcu: number =0;
    
    colorActualVigente: string = '#dc3545'; // Color inicial (rojo)
    colorActualCartera: string = '#dc3545';  
    colorActualOpeAcu: string = '#dc3545'; 
    colorActualMontoAcu: string = '#dc3545';  
    
    porcentSaldoCarteraCirculo: number = 0;   
    porcentSaldoVigenteCirculo: number = 0;   
    porcentOpeAcuCirculo: number = 0; 
    porcentMontoAcuCirculo: number = 0; 
    dataSaldoMedioVigente:number=0;
    dataTasaMinima :  any;
    resultdataTasaMinima:number=0;
    varsaldomediovigente: any;
    resultadoPDB: any;
    mostrarCard : boolean;
    load0: BehaviorSubject<boolean>;

    private datosCompletos = { cartera01: false, cartera02: false }
  
   
    lvh: any;
    @ViewChild("paginator",{"static":false}) paginatorVC:StgPaginatorComponent;

    constructor(public antRep: ModRepService, public user: UserService, public loader: StgAppLoaderService,private detector:ChangeDetectorRef) { }

     
      
    ngOnInit(): void { 

        this.loader.open()
        let profile = this.user.get('profile');
        this.currentDate = moment(profile.curr_fec).format("YYYY-MM-DD");
        this.activeHier = false;
        this.loading = true;
        this.Opts = tableConfOPTS;
        this.Opts2 = tableConfOPTS;
        this.showPaginator =false;
        this.showFilterBox = false;
        this.showFilterFlagAsesor = true; 

        this.iniHierarchy(9, 6) //1 jerarquia 5 nivel maximo en la jerarquia, 5=admin
 
        this.load2 = new BehaviorSubject(false);
        this.load3 = new BehaviorSubject(false);

        this.filter1 = filter1; 

        this.firstload = true;
        this.selector1 = this.filter1[0];  
 

                
        combineLatest([this.load2, this.load3]).subscribe(([a, b]) => {

          if (a && b ) {
            this.loading = false;
            this.firstload = false;
            this.loader.close();
          }
        })
          

    }
   
    

    preLoad() {        
        if (!this.firstload) {
            this.loading = true;
            this.loader.open(); 

            this.load2.next(false);
            this.load3.next(false);
        }
    }


    iniHierarchy(code: number, max_lvl: number) {
        this.antRep.getBaseHierarchy(code).subscribe(
            x => {

                let bh: any = x.body.base_hierarchy;
                this.confHier1 = {
                    roots: bh, //antes r_tip_cod: bh.tip_cod,
                    cod_hier: code,
                    params_hier: { key: "fec", val: this.currentDate },
                    max_lvl: max_lvl,
                    dlg_tlt: "JERARQUIA UNIDAD"

                }
                this.mostrarCard=false;
                this.activeHier = true;
            }
        );
    }
 
  


    selectHier(evt: any) {
        this.lvh = evt[0];

        this.loadData();               
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
 
    loadData() {
        const tipcod = this.lvh.tip_cod;
        const codrel = this.lvh.cod_rel;
        const fase = this.selector1.val; 
    
        this.preLoad();
        this.mostrarCard= false;
        this.antRep.getRegularTableResult("DETALLE_MORA_01", {
        codrel: codrel,
        Fecha: this.currentDate,
        tipcod: tipcod,
        met: '1',
        prod:fase     
        }).subscribe(x => { 
            let r = x.body.resultado;
            this.dataSource = r.data;
            this.dataSource3Page = r.data; 
            this.headerDefs = JSON.parse(r.headers);
            
            this.load2.next(true);
            this.load3.next(true);
            this.preparePagination();
        });
    }

}
