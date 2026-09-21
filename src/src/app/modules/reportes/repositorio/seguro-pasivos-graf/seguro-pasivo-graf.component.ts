import * as moment from 'moment';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { UserService } from "app/system/admin/services/user.service";
import { ModRepService } from "../../compartido/servicios/mod-rep.service";
import { cloneObject, isNullOrUndefined, onNullOrUndefined } from 'app/core/shared/functions.util';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { BehaviorSubject, ReplaySubject, Subject, combineLatest } from 'rxjs';
import { prepareDataForPagination } from 'app/core/screen/components/stg-paginator/stg-paginator.util';
import { StgPaginatorComponent } from 'app/core/screen/components/stg-paginator/stg-paginator.component';
import { cra } from '../../legacy/comercial/rda/administracion/cra-map';
import { ReportT } from '../../legacy/support/services/report';
import { GraphicService } from '../../legacy/support/services/graphic.service';
import { takeUntil } from 'rxjs/operators';
import { ComercialService } from '../../legacy/comercial/comercial.service';
import * as Highcharts from "highcharts";  

@Component({
    selector: 'app-seguro-pasivo-graf.component',
    templateUrl: './seguro-pasivo-graf.component.html',
    styleUrls: ['./seguro-pasivo-graf.component.scss']
})
export class SeguroPasivoGrafComponent implements OnInit { 
    dataSource: any;
    dataSource2: any;
    dataSource3: any;
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

    loading: boolean;

    load0: BehaviorSubject<boolean>;
    load1: BehaviorSubject<boolean>;
    load2: BehaviorSubject<boolean>;
    load3: Subject<boolean>;
    firstload: boolean;

    filter1: any;
    selector1: any;

    filter2: any;
    selector2: any;

    filter3: any;
    selector3: any;

    showPaginator: boolean;
    showFilterBox: boolean;
    showFilterNivelFuga: boolean;
    showFilterRangoFecha: boolean;

    report = new ReportT(cra('GREPROSPCORRE'));
    config_graphic9: any = [];  
    var615 :any;
    var616 :any;

    lvh: any;
    @ViewChild("paginator",{"static":false}) paginatorVC:StgPaginatorComponent;
    private destroy$: ReplaySubject<boolean> = new ReplaySubject(1); 
    mapsschartOptions: Highcharts.Options = {}; 
    @ViewChild('charts1') public chartEl: ElementRef;
    @ViewChild('charts2') public chartE2: ElementRef;  

    filter$ = new Subject<any>();
    level$ = new Subject<any>();
    activeFilters: boolean; 
    data: any;

    constructor(public antRep: ModRepService, public user: UserService, 
                public loader: StgAppLoaderService,private detector:ChangeDetectorRef,
                private cs: ComercialService
            ) { }
             
    ngOnInit(): void {
        //this.loader.open()
        let profile = this.user.get('profile');
        this.currentDate = moment(profile.curr_fec).format("YYYY-MM-DD");
        this.activeHier = false;
        this.loading = true; 
        this.showPaginator =false;
        this.showFilterBox = false;
        this.showFilterNivelFuga= true;
        this.showFilterRangoFecha= false;

        this.iniHierarchy(14, 4) //1 jerarquia 5 nivel maximo en la jerarquia, 5=admin

        this.load0 = new BehaviorSubject(false);
        this.load1 = new BehaviorSubject(false);
        this.load2 = new BehaviorSubject(false);
        this.load3 = new Subject();
  
        this.firstload = true;  
        this.selector1 = this.filter1;
        this.selector2 = this.filter2;
        this.selector3 = this.filter3;

        combineLatest([this.load0, this.load1]).subscribe(([a, b]) => { 
            if (a && b) {
                this.loading = false;
                this.loader.close();
                this.firstload = false;
            }
        });
      //  this.combineSelections(); 
  

    }


    onTabChanged(evt:any){
        this.showFilterBox = evt.index==2?true:false;
        this.showFilterNivelFuga = evt.index==2?false:true;
        this.showFilterRangoFecha = evt.index==2?true:false; 
    }


    

    preLoad() {
        if (!this.firstload) {
            this.loading = true;
            this.loader.open();
            this.load0.next(false);
            this.load1.next(false); 
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
                this.activeHier = true;
            }
        );
    }

    eventFilter(event: any) {
        this.selector1 = event.source.value
        if (!this.firstload && event.isUserInput) {
            this.loadData();

        }

    }

    eventFilter2(event: any) {
        this.selector2 = event.source.value
        if (!this.firstload && event.isUserInput) {
            this.loadData();
        }
    }

    eventFilter3(event: any) {
        this.selector3 = event.source.value
        if (!this.firstload && event.isUserInput) {
            this.loadData();
        }
    }

    eventSearch(event: any) { 
        let val = event.target.value.toLowerCase().trim();
        let cf = [
            "HDESCLI", "RDESSEC", "RDESUNI"
        ];
        if (val == '') {
            this.dataSource3Page = this.dataSource3Ori;
        } else {
            this.dataSource3Page = this.dataSource3Ori.filter(
                x => {
                    let r = false;
                    cf.forEach(
                        f => {
                            r = r || x[f].toLowerCase().trim().includes(val);
                        }
                    );
                    return r;
                }
            );
            this.preparePagination();
        }

    }

    eventChangePage(event:any) {
        this.filterPage(event.page)
    }
    filterPage(page:number){  
        this.dataSource3 = this.dataSource3Page.filter( p => p.idPage == page );
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
    private renderGraficov2(r, add): void { 
        const graphic = this.report.getGraphicFind(add.index);
        const report = 'GRAFSEGPAS_01'; //this.report.getRNameCompleted(add.find);
        const confG = new GraphicService(graphic);
        confG.results(true, true, false);
        this.config_graphic9 = [confG, confG, confG, confG, confG, confG, confG, confG];
        //const params = { ...confG.getParamsAdd(), ...r }; 
      
        let tipcod = this.lvh.tip_cod;
        let codrel = this.lvh.cod_rel; 
        const params ={ "tip_cod": tipcod, "cod_rel": codrel,"fec": this.currentDate}
         
        //let h =[49, 71, 106,129,144,176,135,148,216,194,95,54] 
        this.cs.getRegularData(report, params)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            (data) => {
              this.loader.close();
              let result = data.body['result'];
              this.var615 = result.body[0].result615
              this.var616 = result.body[0].result616
               console.log(result.body[0].series)
              let categoriesT = result.body[0].categories 
               
              this.mapsschartOptions = { 
                chart: {
                  type: "column"  
                },
                title: {
                  text: 'Microseguro Oncológico'
                },
                credits: {
                    enabled: false
                  },
                xAxis: {
                  categories: eval(categoriesT)//['30', '35', '40', '45', '50', '55']
                },
                yAxis: { 
                  title: {
                      text: 'Nro Polizas', 
                       
                  }
              },
                series: eval(result.body[0].series) 
               /* [{
                  name: 'Polizas',
                  data: [12,50,20,40,60,120],
                  color: "#89A54E"
                } as Highcharts.SeriesPieOptions
                ,
                {
                  name: 'monto',
                  data: [122,501,202,401,610,1120],
                  color: "#a5744e"
                } as Highcharts.SeriesPieOptions
              ]  */
              } 
    
              let opts = this.mapsschartOptions; 
              let e = document.createElement('div');
          
              this.chartEl.nativeElement.appendChild(e);
    
              Highcharts.chart(this.chartEl.nativeElement, opts);
              this.load0.next(true);
            },
            () => {
              
            });
            
      }
    
      private renderGraficov3(r, add): void {
        const graphic = this.report.getGraphicFind(add.index);
        const report =  'GRAFSEGPAS_02'//this.report.getRNameCompleted(add.find);
        const confG = new GraphicService(graphic);
        confG.results(true, true, false);
        this.config_graphic9 = [confG, confG, confG, confG, confG, confG, confG, confG];
        //const params = { ...confG.getParamsAdd(), ...r }; 
        let tipcod = this.lvh.tip_cod;
        let codrel = this.lvh.cod_rel; 
        const params ={ "tip_cod": tipcod, "cod_rel": codrel,"fec": this.currentDate}
        //let h =[49, 71, 106,129,144,176,135,148,216,194,95,54] 
        this.cs.getRegularData(report, params)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            (data) => {
              let result = data.body['result']; 
              let categoriesT = result.body[0].categories 
              console.log(result.body[0].series)
              this.mapsschartOptions = { 
                chart: {
                  type: "column"  
                },     
                title: {
                  text: 'Multiple Ahorro'
                },
                credits: {
                    enabled: false
                  },
                xAxis: {
                  categories: eval(categoriesT)//['30', '35', '40', '45', '50', '55']
                },
                yAxis: { 
                  title: {
                      text: 'Nro Polizas', 
                       
                  }
              },
                series: eval(result.body[0].series)  
              } 
    
              let opts = this.mapsschartOptions;  
              let e = document.createElement('div');
          
              this.chartE2.nativeElement.appendChild(e);
    
              Highcharts.chart(this.chartE2.nativeElement, opts);
              this.load1.next(true);
            },
            () => {
              
            });
            
      }

    loadData() { 
        this.preLoad()
        this.combineSelections()
        //this.preLoad();

         
    }
    private combineSelections() {    

        let tipcod = this.lvh.tip_cod;
        let codrel = this.lvh.cod_rel;
 
        this.renderGraficov2({ "tip_cod": tipcod, "cod_rel": codrel},{find:'_01',index:0})
        this.renderGraficov3({ "tip_cod": tipcod, "cod_rel": codrel},{find:'_02',index:0})
        
      }

}