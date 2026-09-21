import { formatNumber } from "@angular/common";
import { Input, OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { ModAppService } from "app/core/data/remote/instances/mod-app-service";
import { StgAppLoaderService } from "app/core/screen/components/stg-app-loader/stg-app-loader.service";
import { IStgTableHeader } from "app/core/screen/components/stg-table/stg-table.interface";
import { STG_GRID_STYLE } from "app/core/screen/components/stg-table/stg-table.util";
import { printLog } from "app/core/shared/debug.util";
import { cloneObject } from "app/core/shared/functions.util";
import { LayoutService } from "app/system/admin/services/layout.service";
import { UserService } from "app/system/admin/services/user.service";
import { tableHeaders } from "./calc-incentivos.util";

@Component({
    selector: 'calc-incentivos',
    templateUrl: './calc-incentivos.component.html',
    styleUrls: ['./calc-incentivos.component.scss']
})
export class CalculadoraIncentivosComponent implements OnInit {
    loadingConf: {};
    tableConf: {};
    headerDefs: IStgTableHeader[];
    @Input() dataSource: any;
    @Input() cards: any;
    @Input() cod_bt: string;
    @Input() loadingObs: boolean;
    dataSourcePub:any;
    cardsPub:any;

    extVar1:any={};
    extVar2:any={};

    constructor(public layout: LayoutService, private antApp: ModAppService, 
        public user: UserService,private loader:StgAppLoaderService) { }

    ngOnInit(): void {
        this.loadingConf = {
            height: '320px'
        };
        this.tableConf = {
            table: {
                height: '320px',
                grid: STG_GRID_STYLE
            },
            header: {
                'min-width': '115px',
                'color': 'white',
                background: 'black'
            }
        };
        this.headerDefs = tableHeaders;
        this.dataSourcePub=cloneObject(this.dataSource);
        this.cardsPub={
            ...this.cards
        }
        
        this.extVars();
    }

    private extVars(){
        let v = this.cards.tipo_sec;
        if(v=='GRUPAL'){
            this.extVar1['label']='Grupos Cierre Mes anterior';
            this.extVar2['label']='Grupos Cierre Mes actual';
            this.extVar1['uni']=' (unid.)';
            this.extVar2['uni']=' (unid.)';
            this.extVar1['val']=this.cardsPub.gru_ini;
            this.extVar2['val']=this.cardsPub.gru_fin;
        }else{
            this.extVar1['label']='Saldo Cartera Inicial';
            this.extVar2['label']='Stock Clientes Inicial';
            this.extVar1['uni']=' (soles)';
            this.extVar2['uni']=' (unid.)';
            this.extVar1['val']=this.cardsPub.saldo_ini;
            this.extVar2['val']=this.cardsPub.cli_ini;
        }
    }

    private getKey(o:number):string{
        switch(o){
            case 1: return "saldo";
            case 2: return "cli_nuevos";
            case 3: return "operaciones";
            case 4: return "seguros";
            case 5: return "gru_desem";
            case 6: return "reuniones";
            case 7: return "efec_m30_0";
            default: return "efec_1_30";
        }
    }

    inputStyler(t:string,k:string){
        return {
            background: 'rgb(220, 230, 241)'
        }
    }

    customFormatter(v:any,k:any,r:any){
        if(k==='monetizacion'){
            return formatNumber(v,'en-US','.0-2');
        }else{
            if(!v){
                return v;
            }else if(r.orden===1){
                return formatNumber(v,'en-US','.0-2');
            }else if(r.orden>=2 && r.orden<=6){
                return formatNumber(v,'en-US','.0-0');
            }else{
                return formatNumber(v*100,'en-US','.2-2')+'%';
            }
        }
    }

    reiniciar(){
        this.dataSourcePub=cloneObject(this.dataSource);
        this.cardsPub={
            ...this.cards
        }
        this.extVars();
    }

    calcular() {
        let params = {};
        this.dataSourcePub.forEach(e => {
            let k:string = this.getKey(e.orden);
            params[k]=e.res_real;
        });
        if(this.cards.tipo_sec=='GRUPAL'){
            params['gru_ini']=this.extVar1.val;
            params['gru_fin']=this.extVar2.val;
        }else{
            params['saldo_ini']=this.extVar1.val;
            params['cli_ini']=this.extVar2.val;
        }
        printLog(this.cod_bt,params);
        this.loader.open("Calculando...");
        this.loadingObs=true;
        this.antApp.getIncentivosCalculadora(this.cod_bt,params).subscribe(x => {
            let res: any = x.body;
            this.dataSourcePub=res.calculadora.res;
            this.cardsPub=res.calculadora.cards;
            this.extVars();
            this.loadingObs=false;
            this.loader.close();
        });
    }

    parametros(evt:any,id:number){
        if(id==1){
            this.extVar1.val=evt.target.value;
        }else{
            this.extVar2.val=evt.target.value;
        }
    }
}