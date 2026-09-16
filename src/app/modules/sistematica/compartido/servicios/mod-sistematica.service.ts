import { Injectable } from "@angular/core";
import { AntService } from "app/core/data/remote/ant/ant-service.class";
import { ModSysAdminService } from "app/core/data/remote/instances/mod-sys-admin.service";
import { IWinderResponse } from "app/core/data/remote/winder/winder.interface";
import { WinderService } from "app/core/data/remote/winder/winder.service";
import { StgAppLoaderService } from "app/core/screen/components/stg-app-loader/stg-app-loader.service";
import { UserService } from "app/system/admin/services/user.service";
import { Observable } from "rxjs";

@Injectable()
export class ModSistematicaService extends AntService {
    profile: any;
    cod_bt: string;
    email: string;
    //isAdmin: boolean;

    constructor(private winderService: WinderService, private user: UserService, private antAdmin: ModSysAdminService,private loader:StgAppLoaderService) {
        super({
            port: 6303,
            secret: "AF2D32E4D26CCDCCE753ABA562C41D67",
            appId: "sis"
        }, winderService);
        let profile = this.user.get('profile');
        this.cod_bt = profile.cod_bt;
        this.email = this.email|| this.user.email//profile.email ; 
        //this.isAdmin = profile.tip_use === 0;
    }

    public getBaseHierarchy(cod_hierarchy: number): Observable<IWinderResponse> {
        //let currentDate = this.user.get('profile').curr_fec;
        return this.antAdmin.getBaseHierarchy(this.user.email, cod_hierarchy);
    }

    public getResumenCards(tip_cod:number,cod_rel:string): Observable<any> {
        let params = { tip_cod: tip_cod, cod_rel: cod_rel };
        return this.getSimpleResponseString("resumen.cards", { tip_cod: tip_cod,cod_rel:cod_rel,tipmet:1}, "resultado");
    }

    public getDesembolsos(tip_cod:number,cod_rel:string): Observable<any> {
        let params = { tip_cod: tip_cod, cod_rel: cod_rel };
        return this.getSimpleResponseString("desembolsos.tablas", { tip_cod: tip_cod,cod_rel:cod_rel,tipmet:1}, "resultado");
    }
}