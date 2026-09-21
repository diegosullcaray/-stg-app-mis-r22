import * as moment from 'moment';
import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { UserService } from "app/system/admin/services/user.service";
import { ModRepService } from "../../compartido/servicios/mod-rep.service";
import { cloneObject, isNullOrUndefined, onNullOrUndefined } from 'app/core/shared/functions.util';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { filter1, tableConfOPTS, tableConfOPTS2, trafficFnMap } from './cmg-cartera-m.util';
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { prepareDataForPagination } from 'app/core/screen/components/stg-paginator/stg-paginator.util';
import { StgPaginatorComponent } from 'app/core/screen/components/stg-paginator/stg-paginator.component';

@Component({
    selector: 'app-cmg-cartera-m.component',
    templateUrl: './cmg-cartera-m.component.html',
    styleUrls: ['./cmg-cartera-m.component.scss']
})
export class CmgCarteraMComponent implements OnInit {

  
  isDropdownOpen: boolean = false;
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
    load4: BehaviorSubject<boolean>;
    firstload: boolean;
    fechaMensual: any;
    filter1: any; 
    selector1: any;

    filter2: any;
    selector2: any;

    filter3: any;
    selector3: any;
    filter4: any;

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
@ViewChild('dropdownContainer', { static: false }) dropdownContainer: ElementRef;

private datosCompletos = { cartera01: false, cartera02: false }


obtenerColorSegunPorcentaje(porcentaje: number): string {
    
    if (porcentaje <= 0) {
        return 'transparent';
      }
       
      //if (porcentaje >= 1 && porcentaje <= 30) {
        if (porcentaje >= 1 && porcentaje < 95) {
        return '#dc3545';  
      }
       
      //if (porcentaje > 30 && porcentaje <= 70) {
      if (porcentaje >= 95 && porcentaje <= 100) {
        return '#ffc107';  
      }
       
      return '#28a745'; 
  }
   
  actualizarColorDinamico(tipo: 'cartera' | 'vigente' | 'opeAcu' | 'montoAcu', porcentajeActual: number) {
    const nuevoColor = this.obtenerColorSegunPorcentaje(porcentajeActual);
    
    if (tipo === 'cartera') {
      this.colorActualCartera = nuevoColor;
    } else if (tipo === 'vigente') {
        this.colorActualVigente = nuevoColor;
      } else if (tipo === 'opeAcu') { 
        this.colorActualOpeAcu = nuevoColor;
      }
     else if (tipo === 'montoAcu') { 
        this.colorActualMontoAcu = nuevoColor;
      }
  }
   
animarPorcentaje(tipo: 'cartera' | 'vigente' | 'opeAcu' | 'montoAcu', objetivo: number) {
 
    if (tipo === 'cartera') {
      this.porcentSaldoCartera = 0;
      this.colorActualCartera = this.obtenerColorSegunPorcentaje(0);
    } else if (tipo === 'vigente') {
      this.porcentSaldoVigente = 0;
      this.colorActualVigente = this.obtenerColorSegunPorcentaje(0);
    } else if (tipo === 'opeAcu') {
        this.porcentopeAcu = 0;
      this.colorActualOpeAcu = this.obtenerColorSegunPorcentaje(0);
    }
    else if (tipo === 'montoAcu') {
        this.porcentmontoAcu = 0;
      this.colorActualMontoAcu = this.obtenerColorSegunPorcentaje(0);
    }
    
    const duracion = 2000;  
    const pasos = 100; 
    const incremento = objetivo / pasos;
    const tiempoPorPaso = duracion / pasos;
    
    let valorActual = 0;
    let paso = 0;
    
    const interval = setInterval(() => {
      paso++;
       
      const progreso = paso / pasos;
      const easeOut = 1 - Math.pow(1 - progreso, 3);
      valorActual = Math.round(objetivo * easeOut * 100) / 100;
       
      if (tipo === 'cartera') {
        this.porcentSaldoCartera = valorActual;
        this.actualizarColorDinamico('cartera', valorActual);
      } else if (tipo === 'vigente') {
        this.porcentSaldoVigente = valorActual;
        this.actualizarColorDinamico('vigente', valorActual);
      }else if (tipo === 'opeAcu') {
        this.porcentopeAcu = valorActual;
        this.actualizarColorDinamico('opeAcu', valorActual);
      }else if (tipo === 'montoAcu') {
        this.porcentmontoAcu = valorActual;
        this.actualizarColorDinamico('montoAcu', valorActual);
      }
        
      if (paso >= pasos) {
        clearInterval(interval);
        
        // Valor final exacto
        if (tipo === 'cartera') {
          this.porcentSaldoCartera = objetivo;
          this.actualizarColorDinamico('cartera', objetivo);
        } else if (tipo === 'vigente') {
          this.porcentSaldoVigente = objetivo;
          this.actualizarColorDinamico('vigente', objetivo);
        } else if (tipo === 'opeAcu') {
            this.porcentopeAcu = objetivo
            this.actualizarColorDinamico('opeAcu', objetivo);
        }else if (tipo === 'montoAcu') {
            this.porcentmontoAcu = objetivo
            this.actualizarColorDinamico('montoAcu', objetivo);
        }
         
      }
    }, tiempoPorPaso);
  } 
   
  calcularYAnimarCartera() {
    const saldoLimpio = this.saldoCartera?.toString().replace(/,/g, '')  || '0';
    const metaLimpia = this.metasaldoCartera?.toString().replace(/,/g, '')  || '1';

    const saldo = Number(saldoLimpio);
    const meta = Number(metaLimpia);
    
    if (meta === 0 || isNaN(saldo) || isNaN(meta)) {
        this.porcentajeRealCartera = 0;
      } else {
        const porcent = (saldo / meta) * 100;
        this.porcentajeRealCartera = Math.round(porcent * 10) / 10;
      }
    
    
      this.animarPorcentaje('cartera', this.porcentajeRealCartera);
  }
  calcularYAnimarOpeAcu() {
    const saldoLimpio = this.operAcu?.toString().replace(/,/g, '') || '0';
    const metaLimpia = this.metaOpeAcu?.toString().replace(/,/g, '') || '1';
    const saldo = Number(saldoLimpio);
    const meta = Number(metaLimpia);
    if (meta === 0 || isNaN(saldo) || isNaN(meta)) {
        this.porcentajeRealOpeAcu = 0;
      } else {
        const porcent = (saldo / meta) * 100;
        this.porcentajeRealOpeAcu = Math.round(porcent * 10) / 10;
      }
      this.animarPorcentaje('opeAcu', this.porcentajeRealOpeAcu);
  }
  calcularYAnimarMontoAcu(){
    const saldoLimpio = this.montoAcu?.toString().replace(/,/g, '') || '0';
    const metaLimpia = this.metaMontoAcu?.toString().replace(/,/g, '') || '1';
    const saldo = Number(saldoLimpio);
    const meta = Number(metaLimpia);
    if (meta === 0 || isNaN(saldo) || isNaN(meta)) {
        this.porcentajeRealMontAcu = 0;
      } else {
        const porcent = (saldo / meta) * 100;
        this.porcentajeRealMontAcu = Math.round(porcent * 10) / 10;
      }
      this.animarPorcentaje('montoAcu', this.porcentajeRealMontAcu);
  }
  calcularYAnimarVigente() {
    const saldoLimpio = this.saldoVigente?.toString().replace(/,/g, '') || '0';
    const metaLimpia = this.metasaldoVigente?.toString().replace(/,/g, '') || '1';
    
    const saldo = Number(saldoLimpio);
    const meta = Number(metaLimpia);
     
    
    if (meta === 0 || isNaN(saldo) || isNaN(meta)) {
      this.porcentajeRealVigente = 0;
    } else {
      const porcent = (saldo / meta) * 100;
      this.porcentajeRealVigente = Math.round(porcent * 10) / 10;
    }
     
     
    this.animarPorcentaje('vigente', this.porcentajeRealVigente);
  } 
reiniciarAnimaciones() { 
    this.porcentSaldoCartera = 0;
    this.porcentSaldoVigente = 0;
    this.porcentopeAcu=0;
    this.porcentmontoAcu=0;
    this.dataSaldoMedioVigente=0;
    this.varsaldomediovigente=0;
    this.resultadoPDB=0;
    this.mostrarCard= false;
     
    this.colorActualCartera = this.obtenerColorSegunPorcentaje(0);
    this.colorActualVigente = this.obtenerColorSegunPorcentaje(0);
    this.colorActualOpeAcu = this.obtenerColorSegunPorcentaje(0);
    this.colorActualMontoAcu = this.obtenerColorSegunPorcentaje(0);
     
    this.detector.detectChanges();
     
    setTimeout(() => {
      this.calcularYAnimarCartera();
      this.calcularYAnimarVigente();
      this.calcularYAnimarMontoAcu();
      this.calcularYAnimarOpeAcu();
    }, 100);
  }
  
   
    lvh: any;
    @ViewChild("paginator",{"static":false}) paginatorVC:StgPaginatorComponent;

    constructor(public antRep: ModRepService, public user: UserService, public loader: StgAppLoaderService,private detector:ChangeDetectorRef) { }

     
      
    ngOnInit(): void { 
  this.porcentSaldoVigente = 0;
  this.porcentSaldoCartera = 0;
  this.porcentopeAcu=0;
  this.porcentmontoAcu=0;
  this.dataSaldoMedioVigente=0
  this.varsaldomediovigente=0;
  this.resultadoPDB=0;
  this.mostrarCard=false;
   
  
  // Inicializar colores
  this.colorActualVigente = this.obtenerColorSegunPorcentaje(0);
  this.colorActualCartera = this.obtenerColorSegunPorcentaje(0);
  this.colorActualOpeAcu= this.obtenerColorSegunPorcentaje(0);
  this.colorActualMontoAcu= this.obtenerColorSegunPorcentaje(0);
  
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
        this.load0 = new BehaviorSubject(false);
        this.load2 = new BehaviorSubject(false);
        this.load3 = new BehaviorSubject(false);
        this.load4 = new BehaviorSubject(false);

        this.filter1 = filter1; 

        this.firstload = true;
        this.selector1 = this.filter1[0]; 
        this.loadFilter()

        combineLatest([this.load0,this.load2, this.load3]).subscribe(([a, b,c]) => {
          if (a && b && c) {
            this.loading = false;
            this.firstload = false;
            this.loader.close();
          }
        })

        // combineLatest([this.load2]).subscribe(([a]) => { 
        //     if (a ) {
        //         this.loading = false;
        //         this.loader.close();
        //         this.firstload = false;
        //     }
        // });

    }
    onToggleSelect(selectedItem: any) { 
        if (this.selector1?.val !== selectedItem.val) {
          this.selector1 = selectedItem;
          
          if (!this.firstload) {
            this.loadData();
          }
        }
      }
    onTabChanged(evt:any){
        this.showFilterBox = evt.index==2?true:false;
        this.showFilterFlagAsesor = evt.index==2?false:true 
    }

    preLoad() {
        if (!this.firstload) {
            this.loading = true;
            this.loader.open(); 
            this.load0.next(false);
            this.load2.next(false);
            this.load3.next(false);
            //this.load4.next(false);
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
 
  

    eventChangePage(event:any) {
        this.filterPage(event.page)
    }
    filterPage(page:number){  
        this.dataSource3 = this.dataSource3Page.filter( p => p.idPage == page );
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
      
      this.selector2 = item;
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
  eventFilter(event: any) {
    if (!this.firstload && event.isUserInput) {
        this.loadData();
    }
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
    preparePagination() {
        this.dataSource3Length = this.dataSource3Page.length; 
        if(this.dataSource3Length > 10){
            this.showPaginator =true;
            prepareDataForPagination(10,this.dataSource3Page,"idPage");
            this.detector.detectChanges(); 
            if(this.paginatorVC){
                this.paginatorVC.toFirstPage(); 
            }
            this.filterPage(1);
            
        }else{
            this.showPaginator =false;
            this.dataSource3 = this.dataSource3Page;
        }
    }

    selectHier(evt: any) {
        this.lvh = evt[0];
        this.loadData();

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
    loadFilter() { 
      this.antRep.getRegularTableResult("RS_FECH", { 
        "fec": this.currentDate
      }).subscribe(x => { 
        let r = x.body.resultado; 
        
        if (r.meta1 && r.meta1.length > 0 && r.meta1[0]["json_result"]) {
          try { 
            this.filter4 = JSON.parse(r.meta1[0]["json_result"]);
            
            if (this.filter4 && this.filter4.length > 0) {
              this.fechaMensual = this.filter4[0];
            } else {
              this.fechaMensual = null;
            }
            
          } catch (error) { 
            this.filter4 = [];
            this.fechaMensual = null;
          }
        } else {
          this.filter4 = [];
          this.fechaMensual = null;
        }
      }, error => {
        this.filter4 = [];
        this.fechaMensual = null;
      });
    }
  
    getStatusClass2(status: number): string {
      switch (status) {
        case 1:
          return 'status-green';    // Verde para estado positivo
        case 0:
          return 'status-orange';   // Naranja para estado neutral  
        case -1:
          return 'status-red';      // Rojo para estado negativo
        default:
          return '';                // Sin clase si no hay estado
      }
    }

    getStatusClass(value: number): string { return value >= 0 ? 'positive' : 'negative'; } 
getTrendClass(value: number): string { return value >= 0 ? 'trend-up' : 'trend-down'; } 
 
loadData() {
    const tipcod = this.lvh.tip_cod;
    const codrel = this.lvh.cod_rel;
    const fase = this.selector1.val; 
 
    this.preLoad();
  this.mostrarCard= false;

  console.log(tipcod)
  console.log(codrel)
  console.log(this.fechaMensual.val )
  console.log(fase)

    this.antRep.getRegularTableResult("CMG_CARTERA_01", {
      codrel: codrel,
      Fecha: this.fechaMensual.val,//this.currentDate,
      tipcod: tipcod,
      met: '1',
      prod:fase     
    }).subscribe(x => {
      const r = x.body.resultado;
      const semaforoKeys = ["8", "10","12"]; 
      console.log(r.data) 
      this.saldoCartera=r.data[18][6]  //saldomediocierreayer
      this.metasaldoCartera=r.data[18][5]  ?? 0//saldomediomesante 
      console.log(r.data[18][6])
      console.log(r.data[18][5])
      this.varsaldomediovigente= ((Number((r.data[18][6] || '0').toString().replace(/,/g, '')) - 
      Number((r.data[18][5] || '0').toString().replace(/,/g, ''))) )
      .toLocaleString('en-US', { maximumFractionDigits: 3 });//r.data[18][9]  ?? 0
      console.log(this.saldoCartera)
      console.log(this.metasaldoCartera)
      this.dataSaldoMedioVigente=this.saldoCartera > this.metasaldoCartera ? 1 : -1;
      //console.log(this.dataSaldoMedioVigente)
      this.getTrendClass(this.dataSaldoMedioVigente)
      const porcent1 =(this.saldoCartera?.toString().replace(/,/g, '') / this.metasaldoCartera?.toString().replace(/,/g, '') ?? 1) * 100
      this.porcentSaldoCartera = Math.round((porcent1)) * 10 / 10 
      this.datosCompletos.cartera01 = true;
       this.saldoVigente = r.data[16][6];
       this.metasaldoVigente = r.data[2][7];  
      const porcent = (this.saldoVigente?.toString().replace(/,/g, '') / this.metasaldoVigente?.toString().replace(/,/g, '') ?? 1) * 100
      this.porcentSaldoVigente = Math.round((porcent)) * 10 / 10
      // this.montoAcu  = r.data[4][6]
      // this.metaMontoAcu = r.data[4][7] || '0'

      // this.operAcu = r.data[6][6]
      // this.metaOpeAcu= r.data[6][7] || '0'
 
    setTimeout(() => {
        this.calcularYAnimarCartera();
        this.calcularYAnimarVigente(); 
      }, 100);
      this.verificarYComparar();
 
        
      this.dataSource = r.data.map(row => {
        const newRow = { ...row };
  
        for (const controlKey of semaforoKeys) {
          const parsed = parseInt(row[controlKey]);
          let icon = '';
 
          let iconClass = '';
          let iconColor = '';
          switch (parsed) {
            case 1:
              iconClass = 'green-icon';
              iconColor = '#4caf50';
              break;
            case 0:
              iconClass = 'orange-icon';
              iconColor = '#ff9800';
              break;
            case -1:
              iconClass = 'red-icon';
              iconColor = '#f44336';
              break;
            default:
              iconClass = '';
          }
           if (controlKey === "8" && iconClass) {
            // TMM - Generar HTML centrado
            newRow["9"] = `
              <div class="cell-content">
                <span class="material-icons ${iconClass}" style="color: ${iconColor};">lens</span>
                <span class="number">${row["9"] || ''}</span>
              </div>
            `;
          } else if (controlKey === "10" && iconClass) {
            // TAM - Generar HTML centrado
            newRow["11"] = `
              <div class="cell-content">
                <span class="material-icons ${iconClass}" style="color: ${iconColor};">lens</span>
                <span class="number">${row["11"] || ''}</span>
              </div>
            `;
          } else if (controlKey === "12" && iconClass) {
            // Tercera columna - Generar HTML centrado
            newRow["13"] = `
              <div class="cell-content">
                <span class="material-icons ${iconClass}" style="color: ${iconColor};">lens</span>
                <span class="number">${row["13"] || ''}</span>
              </div>
            `;
          }
    
        }
  
        return newRow;
      });
   
      const parsedHeaders = JSON.parse(r.headers);
      const headersProcesados = parsedHeaders.filter(
        h => !(h.cellStyle?.display?.toLowerCase() === 'none')
      );
      console.log(headersProcesados)
      this.headerDefs = headersProcesados; 
      this.load2.next(true);
    });

    this.antRep.getRegularTableResult("CMG_CARTERA_02", { "tipcod": tipcod, "cod_rel": codrel,tipmet: '1',prod:fase , fec: this.fechaMensual.val }).subscribe(

        x => {
            let r = x.body.resultado; 
            this.datosCompletos.cartera02 = true; 
              this.operAcu = r.data[0]['ope_acum_'] || '0';
              this.metaOpeAcu = r.data[0]['meta_ope_acum_'] || '0';
             this.dataTasaMinima =r.data[0]['tasaminima']  
             this.verificarYComparar();
             this.porcentopeAcu = parseFloat(r.data[0]['cumpl_ope_acum'].toFixed(2));
             //
             this.montoAcu = r.data[0]['des_acum'] || '0';
              this.metaMontoAcu = r.data[0]['meta_des_acum'] || '0';  
             this.porcentmontoAcu = parseFloat(r.data[0]['cumpl_des_acum'].toFixed(2));
              
              setTimeout(() => {
                this.calcularYAnimarOpeAcu();
              }, 100); 
              this.load3.next(true);
//
this.load0.next(true);
              setTimeout(() => { 
                         this.calcularYAnimarMontoAcu();
                        }, 100);
                        this.mostrarCard=true;
               
        }

    );
     
  }
  getSaldoVigenteNum(): number {
    return parseFloat(this.saldoVigente?.toString().replace('%', '') || '0');
  }
  
  
  getDataTasaMinimaNum(): number {
    return parseFloat(this.dataTasaMinima?.toString().replace('%', '') || '0');
  } 
   private verificarYComparar(): void { 
    
    if (this.datosCompletos.cartera01 && this.datosCompletos.cartera02) { 
      if (this.saldoVigente && this.dataTasaMinima) { 
        const resultado = this.compararPorcentajes();  
        this.resultdataTasaMinima=resultado; 
      }
    }
  }
  
  private compararPorcentajes(): number { 
    if (!this.saldoVigente || !this.dataTasaMinima) return 0;
    
 
    const num1 = parseFloat(this.saldoVigente.toString().replace(/,/g, ''));  
 
    const num2 = parseFloat(this.dataTasaMinima.toString().replace(/,/g, ''));
     
    this.resultadoPDB = (num1 - num2) * 100     
    this.resultadoPDB = Math.round(this.resultadoPDB).toLocaleString('es-PE') + ' pbs'
   
    
    if (isNaN(num1) || isNaN(num2)) { 
      return 0;
    }
    
    const resultado = num1 > num2 ? 1 : -1; 
    return resultado;
  }
  
   
      
}
  
  