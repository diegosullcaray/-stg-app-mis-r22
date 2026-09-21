import { StgAppLoaderService } from "app/core/screen/components/stg-app-loader/stg-app-loader.service";
import { Incentivos3Service } from "../compartido/servicios/incentivos3.service";
import { cloneObject, isNullOrUndefined } from "app/core/shared/functions.util";
import { ModIncentivos3Service } from "../compartido/servicios/mod-incentivos3.service";
import { detalle2Config } from "./detalle2.util";

export abstract class Detalle2BaseComponent {
    config: any;
    item: any;
    tip_cod: number;
    cod_rel: string;

    head1: any;

    dataSource: any;
    totSource: any;

    constructor(public inc3: Incentivos3Service, public loader: StgAppLoaderService, public ant: ModIncentivos3Service) { }

    init() {
        this.config = cloneObject(detalle2Config);
        this.tip_cod = this.inc3.perfil.usu.tip_cod;
        this.cod_rel = this.inc3.perfil.usu.cod_rel;

        this.data();
    }
    abstract navMain(): void;

    private data() {
        this.config.loading = true;
        this.loader.open();

        let idx = this.inc3.detalle.idx;
        let params = this.inc3.detalle.params;

        this.item = detalle2Config.items[idx - 1];
        this.ant[params.req](this.tip_cod, this.cod_rel,this.inc3.curr_fec).subscribe((x: any) => {
            let res = x.body.resultado;
            this.dataSource = res.det;
            if (!isNullOrUndefined(res.tot.tot_m)) {
                this.totSource = res.tot;
            }
            this.config.loading = false;
            this.loader.close();
        });
    }


    trCls(i: number) {
        if (i == 1) {
            return "rt";
        } else if (i == 2) {
            return "rh";
        }
        return "";
    }

    iconCls(x: any) {
        if (x == 1) {
            return "material-icons state-1 i";
        }
        return "material-icons state-2 i";
    }






}

