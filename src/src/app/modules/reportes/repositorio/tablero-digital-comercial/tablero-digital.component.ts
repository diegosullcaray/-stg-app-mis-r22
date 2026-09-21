import * as moment from 'moment';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { UserService } from "app/system/admin/services/user.service";
import { ModRepService } from "../../compartido/servicios/mod-rep.service";
import { cloneObject, isNullOrUndefined, onNullOrUndefined } from 'app/core/shared/functions.util';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { filter1, tableConfOPTS, tableConfOPTS2 } from './tablero-digital.util';
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { prepareDataForPagination } from 'app/core/screen/components/stg-paginator/stg-paginator.util';
import { StgPaginatorComponent } from 'app/core/screen/components/stg-paginator/stg-paginator.component';

@Component({
    selector: 'app-tablero-digital.component',
    templateUrl: './tablero-digital.component.html',
    styleUrls: ['./tablero-digital.component.scss']
})
export class tableroDigitalComponent implements OnInit {

  

    dataSource: any;
    dataSource2: any;
    dataSource3: any;
    dataSource4: any;
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
        this.Opts2 = tableConfOPTS2;
        this.showPaginator =false;
        this.showFilterBox = false;
        this.showFilterNivelFuga= true;
        this.showFilterRangoFecha= false;

        this.iniHierarchy(9, 6) //1 jerarquia 5 nivel maximo en la jerarquia, 5=admin

        this.load0 = new BehaviorSubject(false);
        this.load1 = new BehaviorSubject(false);
        this.load2 = new BehaviorSubject(false);
        this.load3 = new Subject();

        this.filter1 = filter1; 

        this.firstload = true;
        this.selector1 = this.filter1[0]; 

        combineLatest([this.load0, this.load1, this.load2]).subscribe(([a]) => { 
            if (a) {
                this.loading = false;
                this.loader.close();
                this.firstload = false;
            }
        });

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

    loadData() {

        let tipcod = this.lvh.tip_cod;
        let codrel = this.lvh.cod_rel;
        let prod = this.selector1.val; 

        //this.load3.next(true);
        this.preLoad();

        this.antRep.getRegularTableResult("TABDIGITAL_COMERCIAL_01", { "tip_cod": tipcod, "cod_rel": codrel }).subscribe(

            x => {
                let r = x.body.resultado;
                
                 console.log((r.headers))
                this.dataSource = r.data;
                this.headerDefs = JSON.parse(r.headers);
                this.load0.next(true);
            }

        );
        
    }

}