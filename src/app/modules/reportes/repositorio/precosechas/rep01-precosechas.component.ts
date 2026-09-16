import { ChangeDetectorRef, OnInit, ViewChild } from "@angular/core";
import { Component } from "@angular/core";
import { StgPaginatorComponent } from "app/core/screen/components/stg-paginator/stg-paginator.component";
import { IStgTableHeader } from "app/core/screen/components/stg-table/stg-table.interface";
import { prepareDataForPagination } from "app/core/screen/components/stg-table/stg-table.util";

import { UserService } from "app/system/admin/services/user.service";
import { Subject } from "rxjs";
import { ModRepService } from "../../compartido/servicios/mod-rep.service";
import { ComercialService } from "../../legacy/comercial/comercial.service";
import { SelectService } from "../../legacy/support/services/select.service";
import { tableConf, loadingConf,tableConf2 } from "./rep01-precosechas.util";

@Component({
    selector: 'app-rep01-precosechas',
    templateUrl: './rep01-precosechas.component.html',
    styleUrls: ['./rep01-precosechas.component.scss']
})
export class Rep01PrecosechasComponent implements OnInit{
    mainTitle ="Precosechas";

    activeHier: boolean;
    confHier: any;

    loadingObs: boolean;
    headerDefs: IStgTableHeader[];
    loadingConf: {};
    tableConf: {};
    tableConf2: {};
    config_select;
    filterF$ = new Subject<{}>();
    dataSource: any;
    showPaginator: boolean;
    dataSourceLenght: number;

    private currentDataSource: any[];
    private originalDataSource: any[];
    private pageSize = 25;

    reaccion: { label: string, variable: string, data: any} = {
        label: 'Reacción',
        variable: 'reaccion',
        data: [
          { id: 'Aceptó', desc: 'Aceptó' },
          { id: 'No Aceptó', desc: 'No Aceptó' },
          { id: 'No Califica', desc: 'No Califica' },
          { id: 'Postergar', desc: 'Postergar' }
        ]
      }

    @ViewChild('paginator', { static: false }) paginator: StgPaginatorComponent;

    constructor(private antRep: ModRepService, private user: UserService, private changeDetectorRef: ChangeDetectorRef){
        this.loadingObs = true;
    }

    ngOnInit(): void {
        this.mainTitle = "Precosechas"
        this.activeHier = false;
        let currentDate = this.user.get('profile').curr_fec;
        //this.headerDefs = tableHeaders;
        this.loadingObs = true;

        this.antRep.getBaseHierarchy(10).subscribe(
            x => {
                let bh: any = x.body.base_hierarchy;
                this.confHier = {
                    roots: bh,
                    cod_hier: 10,
                    params_hier: { key: "fec", val: currentDate },
                    max_lvl: 4,
                    dlg_tlt: "JERARQUIA"
                }
                this.activeHier = true;
            }
        );

        this.loadingConf = loadingConf;
        this.tableConf = tableConf;


    }


    selectHier(evt: any) {
        let lv: any = evt[0];
        this.loadingObs = true;
        this.showPaginator = false;
        this.antRep.getRegularData("PRECOSECHAS_01", { tip_cod: lv.tip_cod, cod_rel: lv.cod_rel }).subscribe(
            x => {

                this.dataSource = x.body.result.body;

                let ds = x.body.result.body;
                this.dataSourceLenght = ds.length;
                this.originalDataSource = ds;
                this.currentDataSource = ds;
                this.prepPagination();
                this.loadingObs = false;
            }
        );
    }

    loadF(r) {
        this.filterF$.next(r);
      }

      
    private prepPagination() {
        let l = this.currentDataSource.length;
        if (l > this.pageSize) {
            this.showPaginator = true;
            this.changeDetectorRef.detectChanges();
            prepareDataForPagination(this.pageSize, this.currentDataSource, 'pk');
            this.dataSourceLenght = l;
            this.paginator.toFirstPage();
            this.page(1);
        } else {
            this.showPaginator = false;
            this.dataSource = this.currentDataSource;
        }
    }

    changePage(evt: any) {
        this.page(evt.page);
    }

    page(p: number) {
        this.dataSource = this.currentDataSource.filter(x => x.pk === p);
    }

    /*ngOnInit(): void {

        this.loadingConf = loadingConf;
        this.tableConf = tableConf;
        this.tableConf2 = tableConf2;

        this.antRep.getRegularTableResult("PRECOSECHAS_01",{}).subscribe(
            x=>{
                let d = x.body.resultado.data;
                let h = x.body.resultado.headers;
                
                this.headerDefs =JSON.parse(h);
                
                this.dataSource1 = d.filter(x => x.gru === 1);
                
                this.loadingObs = false;
            }
        );
    }*/

    
    

    customStyler(v:any,k:any,r:any,cfg:any){
        cfg['background-color']='rgb(197,217,241)';
        cfg['color']='rgb(0,32,96)';
        if(r.bold){
            cfg['font-weight']='bold';
        }
        return cfg;
    }
}