import { Injectable } from "@angular/core";
import { AntService } from "app/core/data/remote/ant/ant-service.class";
import { IWinderResponse } from "app/core/data/remote/winder/winder.interface";
import { WinderService } from "app/core/data/remote/winder/winder.service";
import { StgAppLoaderService } from "app/core/screen/components/stg-app-loader/stg-app-loader.service";
import { isNullOrUndefined } from "app/core/shared/functions.util";
import { ReportType } from "app/modules/reportes/legacy/support/data/ant-mod-rep.service";
import { UserService } from "app/system/admin/services/user.service";
import { Observable } from "rxjs";  
import { ModRepService } from '../../../../reportes/compartido/servicios/mod-rep.service';

@Injectable()
export class ModProspectoCorService extends AntService {
    cod_bt: string;
    is_admin: number;

    constructor(private winderService: WinderService, private user: UserService, private loader: StgAppLoaderService, private datosReporte: ModRepService) {
        super({ 
            port: 5301,
            secret: "D4305E5943A377227C6BF78C8E3278AD",
            appId: "secciones"
        }, winderService);
        let profile = this.user.get('profile');
        this.cod_bt = profile.cod_bt; 
        this.is_admin = profile.tip_use === 0?1:0;
    }

    public getRegResultadosListProsp(cod_met:string): Observable<IWinderResponse> {
        return this.getSimpleResponseString("corresponsal.get_list_pro", { cod_bt: cod_met }, "resultado");
    } //

     
    public getConfiguracionMod(): Observable<IWinderResponse> {
        return this.getSimpleResponseString("corresponsal.cfg_mod", { cod_bt: this.cod_bt }, "resultado");
    }// 
    
    public postActualizaCor(cod_numdoc:number,cfg:any): Observable<IWinderResponse> {
        console.log(this.cod_bt,cod_numdoc,JSON.stringify(cfg))
        return this.postSimpleResponseString("corresponsal.act_corr", { cod_bt: this.cod_bt,cod_numdoc:cod_numdoc,cfg:JSON.stringify(cfg) });
    }//

    public postAddUsuarioCor(cod_numdoc:number,cfg:any): Observable<IWinderResponse> {
        console.log(this.cod_bt,cod_numdoc,JSON.stringify(cfg))
        return this.postSimpleResponseString("corresponsal.add_asesor", { cod_bt: this.cod_bt,cod_numdoc:cod_numdoc,cfg:JSON.stringify(cfg) });
    } //

     

}