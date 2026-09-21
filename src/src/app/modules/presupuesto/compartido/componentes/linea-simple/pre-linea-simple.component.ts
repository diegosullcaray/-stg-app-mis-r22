
import { IStgTableHeader } from "app/core/screen/components/stg-table/stg-table.interface";
import { printLog } from "app/core/shared/debug.util";
import { UserService } from "app/system/admin/services/user.service";
import { ModBudgetService } from "../../servicios/mod-budget.service";
import { loadingConf, tableConf } from "./pre-linea-simple.util";
import * as moment from 'moment';
import { cloneObject } from "app/core/shared/functions.util";


export abstract class PreLineaSimpleComponent {
    //hierarchy props
    confHier: any;
    private paramsHier: any;

    //table props
    activeHier: boolean;
    tableMeta: any = {};
    wsSource: any;
    private bwsSource: any;
    loadingConf: {};
    tableConf: {};
    //iconColMap: {};
    headerDefs: IStgTableHeader[];
    loadingObs: boolean;

    //class props
    mainTitle: string;
    //backKey:string;
    resFunctions: any;
    actSave:boolean;
    actVeri:boolean;
    cod_sec:string;

    //calculate props
    maxIdx: number;

    constructor(
        public antBudget: ModBudgetService, private user2: UserService 
    ) {
        this.loadingObs = true;
    }

    baseInit(mainTitle: string, headersDef: any[], paramsHier: any, inputCols: any, resFunctions: any): void {
        this.resFunctions = resFunctions;

        this.headerDefs = headersDef;
        //console.log(this.headerDefs)
        this.paramsHier = paramsHier;
        //console.log(this.paramsHier);
        this.mainTitle = mainTitle;
        //console.log(inputCols)
        this.tableMeta['inputCols'] = inputCols;

        this.loadingConf = loadingConf;
        this.tableConf = tableConf;
        this.wsSource = [];

        this.activeHier = false;

        this.antBudget.getBaseHierarchy(this.paramsHier.code).subscribe(
            x => {
                let bh: any = x.body.base_hierarchy;   
                //console.log(x.body)
                const hoy = Date.now();    
                let profile = this.user2.get('profile');
                let currentDate = moment(profile.curr_fec).format("YYYY-MM-DD"); 
                //let currentDate = moment(hoy).format("YYYY-MM-DD");  
               // let currentDate = moment(profile.curr_fec).format("YYYY-MM-DD");
                //console.log(currentDate) 
                this.confHier = {
                    roots: bh, 
                    //r_tip_cod: bh.tip_cod, 
                    //r_cod_rel: bh.cod_rel,
                    //r_lvl_hier: bh.lvl,
                    cod_hier: this.paramsHier.code,
                    params_hier:{key:"fec",val:currentDate},
                    max_lvl: this.paramsHier.max_lvl,
                    dlg_tlt: this.paramsHier.dlg_tlt
                }
                //console.log(this.confHier);
                this.activeHier = true;
            }
            
        ); 
    }

    beforeSelectHierMain(evt: any){
        let lv: any = evt[0];
        //console.log(lv)
        this.tableMeta['currHier'] = lv;
        this.loadingObs = true;
        this.actSave=false;
        this.actVeri=false;
    }

    onSelectHierMain(x: any, evt: any) {
        let lv: any = evt[0];
        //console.log(lv)
        //console.log(x.body)
        let bp = x.body.resumen.bp;
        let adm = bp.act_res || this.antBudget.isAdmin;
        this.tableMeta['bp'] = bp;
        this.tableMeta['adm'] = adm;
        this.actSave = lv.tip_cod == bp.tip_cod_edi && adm;
        this.actVeri = !this.actSave && adm;
        this.cod_sec = bp.cod_sec
        this.wsSource = x.body.resumen.ws;
        this.bwsSource = cloneObject(this.wsSource);
        this.maxIdx = this.wsSource.length - 1;
        this.loadingObs = false;
        //console.log(lv)
        //console.log(bp)
    }

    beforeSelectHier(evt: any){
        this.beforeSelectHierMain(evt);
    }

    onSelectHier(x: any, evt: any) {
        this.onSelectHierMain(x,evt);
    }

    selectHier(evt: any) { 
        let lv: any = evt[0];   
        this.beforeSelectHier(evt);
        //console.log(this.resFunctions.get)
        this.antBudget[this.resFunctions.get](lv.tip_cod, lv.cod_rel).subscribe(
            x => { 
                this.onSelectHier(x,evt);
                //this.fixScroll()
            }
        )

    }

    public abstract calculateRow(idx: number, key: string): void;

    protected calculate(idx: number, key: string) {
        for (let i = idx; i <= this.maxIdx; i++) {
            this.calculateRow(i, key);
        }
    }

    verify(){
        let ch = this.tableMeta['currHier'];
        this.antBudget.openMsg("Verificando...");
        this.antBudget.postLogVerificaciones(ch.tip_cod, ch.cod_rel,this.cod_sec).subscribe(
            x=>{
                printLog(x);
                printLog("Verificado...");
                this.antBudget.closeMsg();
            }
        );
    }

    restart() {
        this.wsSource = cloneObject(this.bwsSource);
    }

    save() {
        let bp = this.tableMeta['bp'];
        let ch = this.tableMeta['currHier'];
        let s = this.wsSource.filter(x => {
            return x.ord >= bp.ord_ini_edi;
        });
        this.antBudget.openMsg("Guardando...");
        this.antBudget[this.resFunctions.post](ch.tip_cod, ch.cod_rel, s).subscribe(
            x => {
                printLog(x);
                printLog("Guardado...");
                this.antBudget.closeMsg();
            }
        );
    }

    editCell(evt: any) {
        let idx = evt.row.ord - 1;
        let k = evt.key;
        this.calculate(idx, k);
    }

    customComponent(v: any, k: any, r: any, m: any) {
        //this no funciona en este contexto ya que se ejecuta en el ambito de la clase StgTable
        let bb: boolean = false;
        if (typeof m.inputCols == "string") {
            bb = m.inputCols == "all";
        } else {
            bb = m.inputCols.includes(k);
        }
       // console.log(k)
        //console.log(m.inputCols[3])
        let ro = r['ord'];
        //console.log(ro)
        /*console.log(m.bp.ord_ini_edi)
        console.log(m.bp.ord_ini_edi_ASESPROD)
        */
        let ch = m.currHier ? m.currHier.tip_cod : 7;
        //console.log(ch)
       //  console.log(m.adm )
         if(bb && m.adm && ch == m.bp.tip_cod_edi && k==m.inputCols[3] &&  ro >=m.bp.ord_ini_edi && ro<=m.bp.ord_ini_edi_ASESPROD  ){
            return 'input';
        }
        else if(bb && m.adm && ch == m.bp.tip_cod_edi && k==m.inputCols[0] &&  ro >=m.bp.ord_ini_edi && ro<=m.bp.ord_ini_edi_ASESPROD ){
            return 'number';
        }
         else if (bb && m.adm && ro >= m.bp.ord_ini_edi && ch == m.bp.tip_cod_edi && k!== m.inputCols[3]) {
            return 'input';
        } 
        else {
            return 'number';
        }
        
         
    }

    inputStyler(t: string, k: string) {
        return {
            background: 'rgb(220, 230, 241)'
        }
    }

}