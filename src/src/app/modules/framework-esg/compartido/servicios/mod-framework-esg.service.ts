import { Injectable } from "@angular/core";
import { AntService } from "app/core/data/remote/ant/ant-service.class";
import { IWinderResponse } from "app/core/data/remote/winder/winder.interface";
import { WinderService } from "app/core/data/remote/winder/winder.service";
import { StgAppLoaderService } from "app/core/screen/components/stg-app-loader/stg-app-loader.service";
import { isNullOrUndefined } from "app/core/shared/functions.util";
import { UserService } from "app/system/admin/services/user.service";
import { Observable } from "rxjs";

@Injectable()
export class ModFrameworkEsgService extends AntService {
    cod_bt: string;
    //email: string;
    is_admin: number;

    constructor(private winderService: WinderService, private user: UserService, private loader: StgAppLoaderService) {
        super({
            port: 6302,
            secret: "CCAFE0F473E9B66F2EA57D46C5C3047E",
            appId: "app"
        }, winderService);
        let profile = this.user.get('profile');
        this.cod_bt = profile.cod_bt;
        //this.email = profile.email;
        //this.isAdmin = profile.tip_use === 0;
        this.is_admin = profile.tip_use === 0?1:0;
    }

    public getResumenPor(): Observable<IWinderResponse> {
        return this.getSimpleResponseStringNP("esg.res_por", "resultado");
    }

    public getResumenCat(cod_cat:number): Observable<IWinderResponse> {
        return this.getSimpleResponseString("esg.res_cat", { cod_cat: cod_cat,cod_bt: this.cod_bt,is_admin:this.is_admin }, "resultado");
    }

    public getConfiguracionMod(): Observable<IWinderResponse> {
        return this.getSimpleResponseString("esg.cfg_mod", { cod_bt: this.cod_bt }, "resultado");
    }

    public postActualizaMet(cod_met:number,cfg:any): Observable<IWinderResponse> {
        return this.postSimpleResponseString("esg.act_met", { cod_bt: this.cod_bt,cod_met:cod_met,cfg:JSON.stringify(cfg) });
    }

    public getMetUsers(cod_met:string){
        return this.getSimpleResponseString("esg.get_users", { cod_met:cod_met}, "resultado");
    }

    public postMetUsers(json:any): Observable<any>{
        return this.postSimpleResponseString("esg.post_users",{json:JSON.stringify(json)});
    }

}