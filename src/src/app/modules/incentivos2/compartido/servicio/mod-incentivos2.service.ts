import { Injectable } from "@angular/core";
import { AntService } from "app/core/data/remote/ant/ant-service.class";
import { IWinderResponse } from "app/core/data/remote/winder/winder.interface";
import { WinderService } from "app/core/data/remote/winder/winder.service";
import { StgAppLoaderService } from "app/core/screen/components/stg-app-loader/stg-app-loader.service";
import { isNullOrUndefined } from "app/core/shared/functions.util";
import { UserService } from "app/system/admin/services/user.service";
import { Observable } from "rxjs";

@Injectable()
export class ModIncentivos2Service extends AntService {
    cod_bt: string;
    //email: string;
    //isAdmin: boolean;

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
    }

    public getDataSources(codBT?:string): Observable<IWinderResponse> {
        let fcbt = isNullOrUndefined(codBT)?this.cod_bt:codBT;
        return this.getSimpleResponseString("incentivos2.resultados", { cod_bt: fcbt }, "resultado");
    }

    public calculate(cod_bt:String,var_sal:number,var_gru:number,var_cli:number,efec1:number,efec2:number,av_ppun:number,tmes:number,tmin:number,barg:number,carg:number,tgru:number){
        let p={
            cod_sec:cod_bt,
            var_sal:var_sal,
            var_gru:var_gru,
            var_cli:var_cli,
            efec1:efec1,
            efec2:efec2,
            av_ppun:av_ppun,
            tmes:tmes,
            tmin:tmin,
            barg:barg,
            carg:carg,
            t_gru:tgru
        }
        return this.getSimpleResponseString("incentivos2.calculadora", p, "resultado");
    }


    public getCliBanc(codBT?:string): Observable<IWinderResponse>{
        let fcbt = isNullOrUndefined(codBT)?this.cod_bt:codBT;
        return this.getSimpleResponseString("incentivos2.bancarizados", { cod_bt: fcbt }, "resultado");
    }
}