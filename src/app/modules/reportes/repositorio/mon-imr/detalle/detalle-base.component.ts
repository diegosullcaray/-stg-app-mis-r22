import { StgAppLoaderService } from "app/core/screen/components/stg-app-loader/stg-app-loader.service";
import { MonImrService } from "../compartido/servicios/mon-imr.service";
import { LayoutService } from "app/system/admin/services/layout.service";

export abstract class DetalleBaseComponent {
    config: any;
    title: string;

    constructor(
        public imr: MonImrService,
        public loader: StgAppLoaderService,
        public layout: LayoutService
    ) { }
//LINK EN CARDS
    init() {
        this.config = this.imr.detalle;
        let key = this.config.evt.key;
        //console.log(key);
        if (key == "sali1") {
            this.title = "IMR en el Mes";
        } else if (key == "sali2") {
            this.title = "Entradas";
        } else if (key == "sali3") {
            this.title = "Salidas";
        } else if (key == "sali4") {
            this.title = "Salidas hasta s/600";
        } else {
            this.title = "Salidas mayor a s/600";
        }
        this.config.loading=false;
    }

    


}
