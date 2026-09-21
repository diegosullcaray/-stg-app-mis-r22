import { ChangeDetectorRef, OnInit, ViewChild } from "@angular/core";
import { Component } from "@angular/core";
import { StgPaginatorComponent } from "app/core/screen/components/stg-paginator/stg-paginator.component";
import { IStgTableHeader } from "app/core/screen/components/stg-table/stg-table.interface";
import { prepareDataForPagination } from "app/core/screen/components/stg-table/stg-table.util";
import { UserService } from "app/system/admin/services/user.service";
import { ModRepService } from "../../compartido/servicios/mod-rep.service";
import { tableConf, loadingConf, tableHeaders } from "./segui-incentivos-sec.util";

@Component({
    selector: 'app-segui-incentivos-sec-rep',
    templateUrl: './segui-incentivos-sec.component.html',
    styleUrls: ['./segui-incentivos-sec.component.scss']
})
export class SeguiIncentivosSecComponent implements OnInit {
    activeHier: boolean;
    confHier: any;

    mainTitle: string;

    loadingObs: boolean;
    headerDefs: IStgTableHeader[];
    loadingConf: {};
    tableConf: {};
    dataSource: any[];
    showPaginator: boolean;
    dataSourceLenght: number;

    private currentDataSource: any[];
    private originalDataSource: any[];
    private pageSize = 25;

    @ViewChild('paginator', { static: false }) paginator: StgPaginatorComponent;

    constructor(private antRep: ModRepService, private user: UserService, private changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.mainTitle = "Seguimiento Incentivos Asesores"
        this.activeHier = false;
        let currentDate = this.user.get('profile').curr_fec;
        this.headerDefs = tableHeaders;
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
        this.antRep.getRegularData("SEGUI_INC_SEC_01", { tip_cod: lv.tip_cod, cod_rel: lv.cod_rel }).subscribe(
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

    filter(evt: any) {
        let v = evt.target.value.toLowerCase();
        if (v === "") {
            this.currentDataSource = this.originalDataSource;
        } else {
            this.currentDataSource = this.originalDataSource.filter(x => x.des_sec.toLowerCase().includes(v));
        }
        this.prepPagination();
    }

    customStyler(v:any,k:any,r:any,cfg:any){
        if(k.startsWith('cob')){
            if(v>=1){
                cfg['color']='#3bd136';
            }else{
                cfg['color']='#e91e2f';
            }
        }else if(k=='bot'){
            if(r.dis==1){
                cfg['color']='#3bd136';
            }else{
                cfg['color']='#e91e2f';
            }
        }else if(k=='bos'){
            if(v<0){
                cfg['color']='#e91e2f';
            }
        }
        return cfg;
    }
}