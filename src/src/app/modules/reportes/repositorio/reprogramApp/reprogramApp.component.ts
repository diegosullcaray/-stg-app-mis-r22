import { OnInit, ChangeDetectorRef } from '@angular/core';
import { Component } from "@angular/core";
import { IStgTableHeader } from "app/core/screen/components/stg-table/stg-table.interface";
import { ModRepService } from "../../compartido/servicios/mod-rep.service";
import {  loadingConf, tableOptions, tableHeaders } from './reprogramApp.util'; 
import { UserService } from '../../../../system/admin/services/user.service';
import { Subject } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';

@Component({
    selector: 'app-reprogramApp',
    templateUrl: './reprogramApp.component.html',
    styleUrls: ['./reprogramapp.component.scss']
})


export /*abstract*/ class reprogramAppComponent {

 
    activeHier: boolean;
    confHier: any;
    maxIdx: number;
    loadingObs: boolean;
    headerDefs: any;
    loadingConf: {};
    tableOpts: any;
    dataSources: any; 
    headersOpts:any;
    currentDate_:any;

    options: any; 
    dataSource: any[]; 
    dataSourceOri: any[]; 
    headers: any;
    optObs = new Subject<any>();

    constructor(private antRep: ModRepService, private user: UserService, private changeDetectorRef: ChangeDetectorRef){
        this.loadingObs = true;
    }


    ngOnInit(): void {
        this.activeHier = false;
        let currentDate = this.user.get('profile').curr_fec;
        this.antRep.getBaseHierarchy(9).subscribe(
            x => {
                let bh : any = x.body.base_hierarchy;
                this.confHier = {
                    roots: bh,
                    cod_hier: 9,
                    params_hier: {key:"fec",val:currentDate},
                    max_lvl: 6,
                    dlg_tlt: "JERARQUIA"
                }
                this.activeHier = true;
      
            }

        );
        this.headers = tableHeaders;
        this.options = tableOptions;

    }


    selectHier(evt: any){
        let lv: any = evt[0];
        this.loadingObs = true;
        this.currentDate_ = this.user.get('profile').curr_fec;
        this.headers = tableHeaders;
        this.options = tableOptions;
        console.log(lv);
        this.antRep.getRegularTableResult("ING_APPFC",{tip_cod: lv.tip_cod, cod_rel: lv.cod_rel, fec: this.currentDate_}).subscribe(
            x => {
                this.dataSource = x.body.resultado.data;
                this.loadingObs = false;
            }
        );

    }




}

