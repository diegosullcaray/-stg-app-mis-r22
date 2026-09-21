import { Injectable } from "@angular/core";
import { ClientSummaryAntService } from "./client-summary-ant.service";
import { StgAppLoaderService } from "app/core/screen/components/stg-app-loader/stg-app-loader.service";
import { loadingConf } from '../../../actividades/transaccion/transaccion.util';

@Injectable()
export class ClientSummaryService {
    config: any;

    constructor(private antCliSum: ClientSummaryAntService, private loader: StgAppLoaderService) {
        this.config = {
            loading: true,
            base: undefined,
            blocks: undefined
        }
    }

    clean(){
        this.config = {
            loading: true,
            base: undefined,
            blocks: undefined
        }
    }

    loadData() {
        this.loader.open();
        this.antCliSum.getSummary('123456789', 1, 1).subscribe(res => {
            let x = res.body.resultado;
            
            let contact = x.contact;
            let blocks = x.blocks?x.blocks:[];
            //let blocks = []
            blocks.unshift({title:'Contacto',lab_flex:35,items:contact});
            this.config.base = x.base;
            this.config.blocks = blocks;
            this.config.loading = false;
            this.loader.close();
        });
    }

}