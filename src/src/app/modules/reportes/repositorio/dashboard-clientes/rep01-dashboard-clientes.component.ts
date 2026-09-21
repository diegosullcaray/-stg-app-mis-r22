import * as moment from 'moment';
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { IStgTableHeader } from "app/core/screen/components/stg-table/stg-table.interface";
import { UserService } from "app/system/admin/services/user.service";
import { ModRepService } from "../../compartido/servicios/mod-rep.service";
import { selEdadData, selEntData, selGenData, selPaisData, selUniData, tableConf, loadingConf } from "./rep01-dashboard-clientes.util";
import { isNullOrUndefined, onNullOrUndefined } from 'app/core/shared/functions.util';
import { formatNumber } from '@angular/common';

@Component({
    selector: 'app-rep01-dashboard-clientes',
    templateUrl: './rep01-dashboard-clientes.component.html',
    styleUrls: ['./rep01-dashboard-clientes.component.scss']
})
export class Rep01DashboardClientesComponent implements OnInit{
    
    mainTitle:string = "Dashboard Clientes";
    selUniData:any;
    selGenData:any;
    selPaisData:any;
    selEdadData:any;
    selEntData:any;

    activeHier: any;
    showHier: any;
    confHier0: any;
    confHier1: any;
    confHier2: any;
    confHier3: any;

    loadingConf: {};
    tableConf: {};
    //iconColMap: {};
    headerDefs: IStgTableHeader[];
    loadingObs: boolean;
    dataSource: any;
    showTable: boolean;

    uni_cfg:any;
    sel_cfg:any;

    currentDate:any;

    constructor(public antRep: ModRepService,public user:UserService){
        this.loadingObs = true;
        this.showTable = false;
    }

    ngOnInit(): void {
        this.selUniData = selUniData;
        this.selGenData = selGenData;
        this.selPaisData = selPaisData;
        this.selEdadData = selEdadData;
        this.selEntData = selEntData;

        let profile = this.user.get('profile');
        this.currentDate = moment(profile.curr_fec).format("YYYY-MM-DD");

        this.activeHier = [false,false,false,false];
        this.showHier = [false,true,false,false];

        this.uni_cfg = {"uni":1,"tip_cod":7,"cod_rel":"231"};
        this.sel_cfg = {"gen":"T","pais":-1,"edad":0,"ent":0};

        //this.iniHierarchy(0,2,3,null);
        this.iniHierarchy(1,1,5,{key:"fec",val:this.currentDate});
        //this.iniHierarchy(2,2,4,null);
        //this.iniHierarchy(3,4,4,null);

        this.loadingConf = loadingConf;
        this.tableConf = tableConf;
        this.dataSource = [];

        this.headerDefs = [];
        
    }

    customStyler(v:any,k:any,r:any,cfg:any){
        if(r.var_niv==3){
            cfg['color']="rgb(0,176,80)";
        }else if(r.var_niv==2){
            cfg['color']="rgb(226,107,10)";
        }else if(r.var_niv==1){
            cfg['color']="rgb(0,112,192)";
        }
        if(k=="var_des"){
            cfg['font-weight']="bold";
        }
        return cfg;
    }


    customFormatter(v: any, k: any, r: any) {
        let a = [1,2];
        if(a.includes(r.var_niv) && a.includes(r.var_ord)){
            return formatNumber(v, 'en-US', '.0-0');
        }else if(r.var_niv==3 && a.includes(r.var_ord)){
            return formatNumber(v * 100, 'en-US', '.2-2') + '%';
        }else{
            return formatNumber(v, 'en-US', '.0-3');
        }
    }

    selectUni(evt:any){
        this.uni_cfg.uni=evt.cod_rel;

        this.showHier = [false,false,false,false];

        this.showHier[evt.cod_rel]=true;
        
    }

    selectGen(evt:any){
        this.sel_cfg.gen=evt.cod_rel;
    }

    selectPais(evt:any){
        this.sel_cfg.pais=evt.cod_rel;
    }

    selectEdad(evt:any){
        this.sel_cfg.edad=evt.cod_rel;
    }

    selectEnt(evt:any){
        this.sel_cfg.ent=evt.cod_rel;
    }

    iniHierarchy(idx:number,code:number,max_lvl:number,params:any){
        this.antRep.getBaseHierarchy(code).subscribe(
            x => {
                let bh: any = x.body.base_hierarchy;
                this["confHier"+idx] = {
                    r_tip_cod: bh.tip_cod,
                    r_cod_rel: bh.cod_rel,
                    r_lvl_hier: bh.lvl,
                    cod_hier: code,
                    //params_hier:{key:"fec",val:currentDate},
                    max_lvl: max_lvl,
                    dlg_tlt: "JERARQUIA UNIDAD"
                }
                if(!isNullOrUndefined(params)){
                    this["confHier"+idx]["params_hier"]=params;
                }
                this.activeHier[idx] = true;
            }
        );
    }


    selectHier(evt: any) {
        let lv: any = evt[0];
        this.uni_cfg.tip_cod=lv.tip_cod;
        this.uni_cfg.cod_rel=lv.cod_rel;
    }

    filter(){
        let u = JSON.stringify(this.uni_cfg);
        let s = JSON.stringify(this.sel_cfg);
        this.showTable=true;
        this.loadingObs = true;
        this.antRep.getRegularTableResult("DASHBOARD_CLIENTES_01",{uni_cfg:u,sel_cfg:s}).subscribe(
            x=>{
                let d = x.body.resultado.data;
                let h = x.body.resultado.headers;
                for(let i=0;i<d.length;i++){
                    let h1 = onNullOrUndefined(+d[i]["col_6"],0);
                    let m1 = onNullOrUndefined(+d[i]["col_5"],0);
                    let d1 = onNullOrUndefined(+d[i]["col_2"],0);
                    let m2 = onNullOrUndefined(+d[i]["col_1"],0);
                    d[i]["var_mensual"]=h1-m1;
                    d[i]["var_anual"]=h1-d1;
                    d[i]["var_interanual"]=h1-m2;
                }
                this.headerDefs =JSON.parse(h);
                
                this.dataSource = d;
                
                this.loadingObs = false;
            }
        );
    }


}