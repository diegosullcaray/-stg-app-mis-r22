import { Injectable } from "@angular/core";
import { AntService } from "app/core/data/remote/ant/ant-service.class";
import { IWinderResponse } from "app/core/data/remote/winder/winder.interface";
import { WinderService } from "app/core/data/remote/winder/winder.service";
import { StgAppLoaderService } from "app/core/screen/components/stg-app-loader/stg-app-loader.service";
import { isNullOrUndefined } from "app/core/shared/functions.util";
import { UserService } from "app/system/admin/services/user.service";
import { Observable } from "rxjs";

@Injectable()
export class ModReportesEService extends AntService {
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
        this.is_admin = profile.tip_use === 0?1:0;
    }

    public getObjectList(): Observable<IWinderResponse> {
        return this.getSimpleResponseString("reportes2.lista", { cod_bt: this.cod_bt,is_admin:this.is_admin }, "resultado");
    }

    public getPowerBIReportToken(report_id:string,dataset_id:string): Observable<IWinderResponse>{
        return this.getSimpleResponseString("reportes2.pbi_rtoken", { report_id:report_id,dataset_id:dataset_id }, "resultado");
    }

    public getObjectUsers(report_id:string){
        return this.getSimpleResponseString("reportes2.usuarios", { report_id:report_id}, "resultado");
    }

    public postObjectUsers(json:any){
        return this.postSimpleResponseString("reportes2.guardar",{json:JSON.stringify(json)});
    }
}