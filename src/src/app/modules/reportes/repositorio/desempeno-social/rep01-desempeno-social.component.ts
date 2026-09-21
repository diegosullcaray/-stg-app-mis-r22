import * as moment from 'moment';
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { IStgTableHeader } from "app/core/screen/components/stg-table/stg-table.interface";
import { UserService } from "app/system/admin/services/user.service";
import { ModRepService } from "../../compartido/servicios/mod-rep.service";
import { tableConf, loadingConf } from "./rep01-desempeno-social.util";
import { isNullOrUndefined, onNullOrUndefined } from 'app/core/shared/functions.util';
import { formatNumber } from '@angular/common';

@Component({
    selector: 'app-rep01-desempeno-social',
    templateUrl: './rep01-desempeno-social.component.html',
    styleUrls: ['./rep01-desempeno-social.component.scss']
})
export class Rep01DesempenoSocialComponent implements OnInit{
    
    mainTitle:string = "Desempeno Social";
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
    
    headerDefs: IStgTableHeader[];
    loadingObs: boolean;
    dataSource: any;
    showTable: boolean;

    uni_cfg:any;

    currentDate:any;

    constructor(public antRep: ModRepService,public user:UserService){
        this.loadingObs = true;
        this.showTable = false;
    }

    ngOnInit(): void { 

        let profile = this.user.get('profile');
        this.currentDate = moment(profile.curr_fec).format("YYYY-MM-DD");
 
        this.uni_cfg = {"tip_cod":7,"cod_rel":"231"};
          
        this.iniHierarchy(9,6)
        //1 jerarquia 5 nivel maximo en la jerarquia, 5=admin

        this.loadingConf = loadingConf;
        this.tableConf = tableConf;
        this.dataSource = [];

        this.headerDefs = [];
 
        
        
    }

    customStyler(v:any,k:any,r:any,cfg:any){

        let a = [3,5,7,9];
        if(a.includes(r.id)){
            cfg['color']="rgb(0,176,80)";
        }else{
            let b = [2,4,6,8];
            if(b.includes(r.id)){
                cfg['color']="rgb(226,107,10)";
            }else{
                cfg['color']="rgb(0,112,192)";
                cfg['font-weight']="bold";
                cfg['font-size']="15px";
                cfg['background-color']="rgb(240, 248, 255)";
            }
        }
        if(k=="descripcion"){
            cfg['font-weight']="bold";
        }
        return cfg;


    }

    customFormatter(v: any, k: any, r: any) {
         
        //console.log(r);
        let a = [3,5,7,9];
        if(a.includes(r.id)){
            return formatNumber(v * 100, 'en-US', '.2-2') + '%';
        }else{
            return v;
        }
        

    }
  
    iniHierarchy(code:number,max_lvl:number){
        this.antRep.getBaseHierarchy(code).subscribe(
            x => {
                //console.log(x)
                let bh: any = x.body.base_hierarchy;
                this.confHier1 = {
                    r_tip_cod: bh.tip_cod,
                    r_cod_rel: bh.cod_rel,
                    r_lvl_hier: bh.lvl,
                    cod_hier: code,
                    params_hier:{key:"fec",val:this.currentDate},
                    max_lvl:  max_lvl,
                    dlg_tlt: "JERARQUIA UNIDAD"
                    
                } 
                this.activeHier = true;
            }
        );
    }

    
    selectHier(evt: any) {
        let lv: any = evt[0];
        //console.log(lv);
        this.uni_cfg.tip_cod=lv.tip_cod;
        this.uni_cfg.cod_rel=lv.cod_rel;

        let u = JSON.stringify(this.uni_cfg); 
        this.showTable=true;
        this.loadingObs = true;

        //console.log(u);

        this.antRep.getRegularTableResult("DESE_SOC_01",{uni_cfg:u}).subscribe(
            
            x=>{
                let d = x.body.resultado.data;
                let h = x.body.resultado.headers;
                //console.log(d);

                for(let i=0;i<d.length;i++){
                    let a1 =d[i]["descripcion"];
                    let b1 = onNullOrUndefined(+d[i]["1"],0);
                    let c1 = onNullOrUndefined(+d[i]["2"],0);
                    let d1 = onNullOrUndefined(+d[i]["3"],0);
                    let e2 = onNullOrUndefined(+d[i]["4"],0);
                    let meta = onNullOrUndefined(+d[i]["hvalvar"],0);
                    let tmm = onNullOrUndefined(+d[i]["tmm"],0);
                    let tam = onNullOrUndefined(+d[i]["tam"],0);
                    let dm = onNullOrUndefined(+d[i]["distancia"],0);
                   
                    d[i]["var_des"]=a1;
                    d[i]["1"]=b1;
                    d[i]["2"]=c1;
                    d[i]["3"]=d1;
                    d[i]["4"]=e2; 
                    d[i]["hvalvar"]=meta;
                    d[i]["tmm"]=tmm; 
                    d[i]["tam"]=tam; 
                    d[i]["distancia"]=dm;  
                }
                this.headerDefs =JSON.parse(h); 
                 this.dataSource = d;
                
                this.loadingObs = false;
            }
        );

    } 

 

}