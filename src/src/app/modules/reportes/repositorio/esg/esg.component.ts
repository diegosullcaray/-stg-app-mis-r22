import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { IStgTableHeader } from "app/core/screen/components/stg-table/stg-table.interface";
import { ModRepService } from "../../compartido/servicios/mod-rep.service";
import { tableConf, loadingConf,tableConf2 } from "./esg.util";

@Component({
    selector: 'app-esg',
    templateUrl: './esg.component.html',
    styleUrls: ['./esg.component.scss']
})
export /*abstract*/ class EsgComponent {
    mainTitle ="Movimiento de Clientes";

    //activeHier: boolean;
    confHier: any;
    maxIdx: number;
    loadingObs: boolean;
    headerDefs: IStgTableHeader[];
    loadingConf: {};
    tableConf: {};
    tableConf2: {};
    tableConf3: {};
    tableConf4: {};

    dataSource1: any;
    dataSource2: any;
    dataSource3: any;
    dataSource4: any;
      
    constructor(private antRep: ModRepService){
        this.loadingObs = true;
    }


    ngOnInit(): void {
         
        this.loadingConf = loadingConf;
        this.tableConf = tableConf;
        this.tableConf2 = tableConf2;

        this.antRep.getRegularTableResult("RESG_01",{}).subscribe(
            x=>{
                let d = x.body.resultado.data;
                let h = x.body.resultado.headers;
                
                this.headerDefs =JSON.parse(h);
                
                this.dataSource1 = d.filter(x => x.RCODCAT === 1);
                this.dataSource2 = d.filter(x => x.RCODCAT === 2);
                this.dataSource3 = d.filter(x => x.RCODCAT === 3);
                this.dataSource4 = d.filter(x => x.RCODCAT === 4);
                 
                
                this.loadingObs = false;
            }
        );
    }

    selectHier(evt:any){
        
    }
    public editCell(evt: any) {
        console.log(evt.row)
        let idx = evt.row.ord - 1;
        if (evt.key == 'RVALOR') { 
            for (let i = idx+2; i <= this.maxIdx; i++) { 
                let RVALOR: number = +this.dataSource1[i - 1]['RVALOR'];
                this.dataSource1[i]['RVALOR'] = RVALOR;
                
            }
            this.calculate(idx + 2, null);
        } else {
            this.calculate(idx, null);
        }
    }

    public calculateRow(idx: number,key:string) {
        let RVALOR: number = +this.dataSource1[idx]['RVALOR'];
    }
    protected calculate(idx: number, key: string) {
        for (let i = idx; i <= this.maxIdx; i++) {
            this.calculateRow(i, key);
        }
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