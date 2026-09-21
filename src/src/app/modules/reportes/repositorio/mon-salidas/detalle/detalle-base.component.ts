import { StgAppLoaderService } from "app/core/screen/components/stg-app-loader/stg-app-loader.service";
import { MonSalidasService } from "../compartido/servicios/mon-salidas.service";
import { LayoutService } from "app/system/admin/services/layout.service";

export abstract class DetalleBaseComponent {
    config: any;
    title: string;

    constructor(
        public sali: MonSalidasService,
        public loader: StgAppLoaderService,
        public layout: LayoutService
    ) { }

    init() {
        this.config = this.sali.detalle;
        let key = this.config.evt.key;
        if (key == "sali1") {
            this.title = "Salidas en el Mes";
        } else if (key == "sali3") {
            this.title = "Salidas en los Útimos 3 Meses";
        } else {
            this.title = "Clientes Por Vencer al Cierre de Mes";
        }
        this.config.loading=false;
    }

    


}
