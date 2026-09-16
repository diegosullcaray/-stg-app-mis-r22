import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { IStgTableHeader } from "app/core/screen/components/stg-table/stg-table.interface";
import { ModRepService } from "../../compartido/servicios/mod-rep.service";
import { tableConf, loadingConf,tableConf2 } from "./rep01-movimiento-clientes.util";

@Component({
    selector: 'app-rep01-movimiento-clientes',
    templateUrl: './rep01-movimiento-clientes.component.html',
    styleUrls: ['./rep01-movimiento-clientes.component.scss']
})
export class Rep01MovimientoClientesComponent implements OnInit{
    mainTitle ="Movimiento de Clientes";

    //activeHier: boolean;
    confHier: any;

    loadingObs: boolean;
    headerDefs: IStgTableHeader[];
    loadingConf: {};
    tableConf: {};
    tableConf2: {};

    dataSource1: any;
    dataSource2: any;
    dataSource3: any;
    dataSource4: any;
    dataSource5: any;
    dataSource6: any;
    dataSource7: any;
    dataSource8: any;
    dataSource9: any;
    dataSource10: any;
    dataSource11: any;

    constructor(private antRep: ModRepService){
        this.loadingObs = true;
    }


    ngOnInit(): void {
        /*this.activeHier = false;

        this.antRep.getBaseHierarchy(2).subscribe(
            x=>{
                let bh: any = x.body.base_hierarchy;
                this.confHier = {
                    r_tip_cod: bh.tip_cod,
                    r_cod_rel: bh.cod_rel,
                    r_lvl_hier: bh.lvl,
                    cod_hier: 2,
                    //params_hier:{key:"fec",val:currentDate},
                    max_lvl: 3,
                    dlg_tlt: "JERARQUIA"
                }
                this.activeHier = true;
            }
        );*/

        this.loadingConf = loadingConf;
        this.tableConf = tableConf;
        this.tableConf2 = tableConf2;

        this.antRep.getRegularTableResult("MOVIMIENTO_CLIENTES_01",{}).subscribe(
            x=>{
                let d = x.body.resultado.data;
                let h = x.body.resultado.headers;
                
                this.headerDefs =JSON.parse(h);
                
                console.log(JSON.parse(h)); 
                console.log(h);


                this.dataSource1 = d.filter(x => x.gru === 1);
                this.dataSource2 = d.filter(x => x.gru === 2);
                this.dataSource3 = d.filter(x => x.gru === 3);
                this.dataSource4 = d.filter(x => x.gru === 4);
                this.dataSource5 = d.filter(x => x.gru === 5);
                this.dataSource6 = d.filter(x => x.gru === 6);
                this.dataSource7 = d.filter(x => x.gru === 7);
                this.dataSource8 = d.filter(x => x.gru === 8);
                this.dataSource9 = d.filter(x => x.gru === 9);
                this.dataSource10 = d.filter(x => x.gru === 10);
                this.dataSource11 = d.filter(x => x.gru === 11);
                
                this.loadingObs = false;
            }
        );
    }

    selectHier(evt:any){
        
    }

    customStyler(v:any,k:any,r:any,cfg:any){
        cfg['background-color']='rgb(197,217,241)';
        cfg['color']='rgb(0,32,96)';
        if(r.bold){
            cfg['font-weight']='bold';
        }
        return cfg;
    }
}