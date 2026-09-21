import { Injectable } from "@angular/core";
import { AntService } from "app/core/data/remote/ant/ant-service.class";
import { IWinderResponse } from "app/core/data/remote/winder/winder.interface";
import { WinderService } from "app/core/data/remote/winder/winder.service";
import { StgAppLoaderService } from "app/core/screen/components/stg-app-loader/stg-app-loader.service";
import { UserService } from "app/system/admin/services/user.service";
import { Observable } from "rxjs";

@Injectable()
export class ModSecService extends AntService {
    cod_bt: string;
    //email: string;
    //isAdmin: boolean;

    constructor(private winderService: WinderService, private user: UserService, private loader: StgAppLoaderService) {
        super({
            port: 5301,
            secret: "D4305E5943A377227C6BF78C8E3278AD",
            appId: "secciones"
        }, winderService);
        let profile = this.user.get('profile');
        this.cod_bt = profile.cod_bt;
        //this.email = profile.email;
        //this.isAdmin = profile.tip_use === 0;
    }

    public getResumenDashboard(cod_bt:string): Observable<IWinderResponse> {
        return this.getSimpleResponseString("dashboard.resumen", { cod_bt: cod_bt }, "resultado");
    }

    public getHistoricoVariable(cod_bt:string,cod_var:string): Observable<IWinderResponse> {
        return this.getSimpleResponseString("dashboard.historico", { cod_bt: cod_bt,cod_var:cod_var }, "resultado");
    }

    public getDetalleCliente(cod_bt:string,num_doc:string,tip_doc:number,pais:number): Observable<IWinderResponse> {
        return this.getSimpleResponseString("dashboard.cliente", { cod_bt: cod_bt,num_doc:num_doc,tip_doc:tip_doc,pais:pais }, "resultado");
    }


    /****************************************************/

    public getListaPrioLeads(cod_bt:string): Observable<IWinderResponse> {
        return this.getSimpleResponseString("listas.prio_leads", { cod_bt: cod_bt }, "resultado");
    }

    public getListaBecas(cod_bt:string): Observable<IWinderResponse> {
        return this.getSimpleResponseString("listas.pro_becas", { cod_bt: cod_bt }, "resultado");
    }

    public postProsBecas(cod_bt:string,num_doc:string,com:string){
        return this.postSimpleResponseString("listas.post_becas",{cod_bt:cod_bt,num_doc:num_doc,com:com});
    }

    /****************************************************/

    public getDetalleCategorizacion(cod_bt:string): Observable<IWinderResponse> {
        return this.getSimpleResponseString("categorizacion.detalle", { cod_bt: cod_bt }, "resultado");
    }


}