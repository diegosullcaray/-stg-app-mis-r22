import * as moment from 'moment';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { UserService } from "app/system/admin/services/user.service";
import { ModRepService } from "../../compartido/servicios/mod-rep.service";
import { cloneObject, isNullOrUndefined, onNullOrUndefined } from 'app/core/shared/functions.util';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { filter1, tablaTab1, tableConfOPTS, tableConfOPTS2, trafficFnMap } from './ranking-comercial.util';
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { prepareDataForPagination } from 'app/core/screen/components/stg-paginator/stg-paginator.util';
import { StgPaginatorComponent } from 'app/core/screen/components/stg-paginator/stg-paginator.component';

@Component({
    selector: 'app-ranking-comercial.component',
    templateUrl: './ranking-comercial.component.html',
    styleUrls: ['./ranking-comercial.component.scss']
})
export class RankingComercialComponent implements OnInit {

  

    dataSource: any; 
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
avanceEsperado: number | string = 0;
originalDataSource: any;
filtrosBusqueda = {
  unidad: '',
  corredor: '',
  territorio: ''
};
territoriosDisponibles: string[] = [];

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
  this.colorActualVigente  = this.obtenerColorSegunPorcentaje(0);
  this.colorActualCartera  = this.obtenerColorSegunPorcentaje(0);
  this.colorActualOpeAcu   = this.obtenerColorSegunPorcentaje(0);
  this.colorActualMontoAcu = this.obtenerColorSegunPorcentaje(0);

        this.loader.open()
        let profile = this.user.get('profile');
        this.currentDate = moment(profile.curr_fec).format("YYYY-MM-DD");// moment().add(-1, 'days').format("YYYY-MM-DD");   
        console.log(this.currentDate)
        this.activeHier = false;
        this.loading = true;
        this.Opts = tableConfOPTS;
        this.Opts2 = tableConfOPTS;
        this.showPaginator =false;
        this.showFilterBox = false;
        this.showFilterFlagAsesor = true; 

        //this.iniHierarchy(4,1) //1 jerarquia 5 nivel maximo en la jerarquia, 5=admin
        this.iniHierarchy(9,6)
        this.load2 = new BehaviorSubject(false); 

        this.filter1 = filter1; 

        this.firstload = true;
        this.selector1 = this.filter1[0];  
 

        combineLatest([this.load2 ]).subscribe(([a]) => {
          if (a   ) {
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
            this.load2.next(false); 
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
 
  
    extraerTerritorios() {
      // Le indicamos a Set<string> el tipo de dato para que TypeScript no se queje
      this.territoriosDisponibles = [
        ...new Set<string>(
          this.originalDataSource.map((item: any) => String(item.des_uter)).filter(Boolean)
        )
      ].sort();
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
            
            
        }else{
            this.showPaginator =false;
           
        }
    }

    selectHier(evt: any) {
        this.lvh = evt[0];
        this.loadData();

    } 
 
 
    loadData() {
      const tipcod = '0';
      const codrel = '0';
      this.preLoad();
      this.mostrarCard= false;
  
      this.antRep.getRegularTableResult("RS_RANK_COM_01", {
        territorio: codrel, 
        corredor: tipcod,
        fecha: this.currentDate,   
      }).subscribe(x => {
          const r = x.body.resultado;
          
          // INTERCEPTAMOS LA DATA PARA CALCULAR SEMÁFOROS
          const dataProcesada = r.data.map((item: any) => {
              // Obtenemos los Días Transcurridos (Timing) como decimal (ej. 20.83 -> 0.2083)
              const diasTranscurridosDec = item.Timing ? Number(item.Timing) / 100 : 0;
  
              // Lógica exacta de tu imagen (Verde >= 100%, Amarillo >= 80%, Rojo < 80%)
              const calcularSemaforo = (valorAvanceCrudo: any) => {
                  if (valorAvanceCrudo == null || isNaN(Number(valorAvanceCrudo))) return '';
                  
                  // Formateamos nosotros el número a string (ej. 0.1528 -> "15.28%")
                  let valAvanceDec = Number(valorAvanceCrudo);
                  let formattedVal = (valAvanceDec * 100).toFixed(2) + '%';
                  
                  if (diasTranscurridosDec === 0) return formattedVal;
  
                  let icon = '🔴'; 
                  // Condición 1: Avance >= Días Transcurridos (Verde)
                  if (valAvanceDec >= diasTranscurridosDec) {
                      icon = '🟢'; 
                  } 
                  // Condición 2: (Avance / Días Transcurridos) >= 0.8 (Amarillo)
                  else if ((valAvanceDec / diasTranscurridosDec) >= 0.8) {
                      icon = '🟡'; 
                  }
  
                  return `${icon} ${formattedVal}`;
              };
  
              // Creamos los nuevos campos con el string ya armado y formateado
              item.Percent_Cumpl_Semaforo = calcularSemaforo(item.Percent_Cumpl);
              item.percent_cumpl_desemb_Semaforo = calcularSemaforo(item.percent_cumpl_desemb);
              item.percent_cumpl_varsalv_Semaforo = calcularSemaforo(item.percent_cumpl_varsalv);
  
              return item;
          });
  
          this.dataSource = dataProcesada; 
          this.originalDataSource = dataProcesada;
          this.extraerTerritorios();
          this.headerDefs = tablaTab1; 
  
          if (this.dataSource && this.dataSource.length > 0) {
              const primerRegistro = this.dataSource[0]; 
              this.avanceEsperado = primerRegistro.Timing; 
          } else {
              this.avanceEsperado = 0; 
          }
          
          this.load2.next(true);
      });
    } 
  
    aplicarFiltro(campo: 'unidad' | 'corredor' | 'territorio', event: any) {
      // Detecta si el valor viene de un input nativo o del mat-select
      const valor = event.target ? event.target.value : event.value;
      
      this.filtrosBusqueda[campo] = valor.toLowerCase();
  
      // Filtramos la data original
      this.dataSource = this.originalDataSource.filter((item: any) => {
          const valUnidad = item.des_uuni ? item.des_uuni.toLowerCase() : '';
          const valCorredor = item.des_ucor ? item.des_ucor.toLowerCase() : '';
          const valTerritorio = item.des_uter ? item.des_uter.toLowerCase() : '';
  
          return valUnidad.includes(this.filtrosBusqueda.unidad) &&
                 valCorredor.includes(this.filtrosBusqueda.corredor) &&
                 valTerritorio.includes(this.filtrosBusqueda.territorio);
      });
  }
      
}
  
  