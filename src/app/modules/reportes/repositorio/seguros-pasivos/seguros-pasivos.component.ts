import * as moment from 'moment';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { IStgTableHeader } from "app/core/screen/components/stg-table/stg-table.interface";
import { UserService } from "app/system/admin/services/user.service";
import { ModRepService } from "../../compartido/servicios/mod-rep.service";
import { cloneObject, isNullOrUndefined, onNullOrUndefined } from 'app/core/shared/functions.util';
import { formatNumber } from '@angular/common';
import { Console } from 'console';
import { tableConf3 } from '../esg/esg.util';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import {  tableConfOPTS } from './seguros-pasivos.util';
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { prepareDataForPagination } from 'app/core/screen/components/stg-paginator/stg-paginator.util';
import { StgPaginatorComponent } from 'app/core/screen/components/stg-paginator/stg-paginator.component';

@Component({
    selector: 'app-seguros-pasivos.component',
    templateUrl: './seguros-pasivos.component.html',
    styleUrls: ['./seguros-pasivos.component.scss']
})
export class SegurosPasivosComponent implements OnInit {
 
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

    constructor(public antRep: ModRepService, public user: UserService, public loader: StgAppLoaderService,private detector:ChangeDetectorRef) { }

    ngOnInit(): void {
        this.loader.open()
        let profile = this.user.get('profile');
        this.currentDate = moment(profile.curr_fec).format("YYYY-MM-DD");
        this.activeHier = false;
        this.loading = true;
        this.Opts = tableConfOPTS;  

        this.iniHierarchy(14, 3) //1 jerarquia 5 nivel maximo en la jerarquia, 5=admin

        this.load0 = new BehaviorSubject(false);
        this.load1 = new BehaviorSubject(false); 
        this.load2 = new BehaviorSubject(false); 
 

        this.firstload = true; 

        combineLatest([this.load0, this.load1, this.load2]).subscribe(([a, b, c]) => { 
            if (a && b && c ) {
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
            this.load1.next(false);
           // this.load2.next(false);

        }
    }


    iniHierarchy(code: number, max_lvl: number) {
        this.antRep.getBaseHierarchy(code).subscribe(
            x => {

                let bh: any = x.body.base_hierarchy;
                console.log(bh)
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

        //this.load3.next(true);
        this.preLoad();

        this.antRep.getRegularTableResult("RS_SEG_PAS_01", { "tip_cod": tipcod, "cod_rel": codrel, "fec": this.currentDate}).subscribe(

            x => {
                
                let r = x.body.resultado;
                this.dataSource = r.data;
                this.headerDefs = JSON.parse(r.headers); 
                this.load0.next(true);
            }

        );
        // Segunda Tabla 
        this.antRep.getRegularTableResult("RS_SEG_PAS_02", { "tip_cod": tipcod, "cod_rel": codrel, "fec": this.currentDate  }).subscribe(

            x => {
                let r2 = x.body.resultado;
                this.dataSource2 = r2.data;
                this.headerDefs2 = JSON.parse(r2.headers);
                this.load1.next(true);
               // this.load2.next(true);
            }

        );

        this.antRep.getRegularTableResult("RS_SEG_PAS_03", { "tip_cod": tipcod, "cod_rel": codrel, "fec": this.currentDate  }).subscribe(

            x => {
                let r3 = x.body.resultado;
                this.dataSource3 = r3.data;
                this.headerDefs3 = JSON.parse(r3.headers);
                this.load2.next(true);
               // this.load2.next(true);
            }

        );

        this.antRep.getRegularTableResult("RS_SEG_PAS_04", { "tip_cod": tipcod, "cod_rel": codrel, "fec": this.currentDate  }).subscribe(

            x => {
                let r4 = x.body.resultado;
                this.dataSource4 = r4.data;
                this.headerDefs4 = JSON.parse(r4.headers);
                this.load2.next(true);
               // this.load2.next(true);
            }

        );

         
    }

}