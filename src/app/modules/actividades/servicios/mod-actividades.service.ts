import { Injectable } from "@angular/core";
import { AntService } from "app/core/data/remote/ant/ant-service.class";
import { ModSysAdminService } from "app/core/data/remote/instances/mod-sys-admin.service";
import { IWinderResponse } from "app/core/data/remote/winder/winder.interface";
import { WinderService } from "app/core/data/remote/winder/winder.service";
import { StgAppLoaderService } from "app/core/screen/components/stg-app-loader/stg-app-loader.service";
import { UserService } from "app/system/admin/services/user.service";
import { Observable } from "rxjs";

@Injectable()
export class ModActividadesService extends AntService {
    profile: any;
    cod_bt: string;
    email: string;
    isAdmin: boolean;

    constructor(private winderService: WinderService, private user: UserService, private antAdmin: ModSysAdminService, private loader: StgAppLoaderService) {
        super({
            port: 6302,
            secret: "CCAFE0F473E9B66F2EA57D46C5C3047E",
            appId: "app"
        }, winderService);
        let profile = this.user.get('profile');
        this.cod_bt = profile.cod_bt;
        this.email = profile.email;
        this.isAdmin = profile.tip_use === 0;
    }

    public openMsg(msg: string) {
        this.loader.open(msg);
    }

    public closeMsg() {
        this.loader.close();
    }

    public getBaseHierarchy(cod_hierarchy: number): Observable<IWinderResponse> {
        //let currentDate = this.user.get('profile').curr_fec;
        return this.antAdmin.getBaseHierarchy(this.user.email, cod_hierarchy);
    }

    public getRegResultadosDestCred(): Observable<IWinderResponse> {
        console.log(this.cod_bt)
        return this.getSimpleResponseString("actividades.get_dest_cre", { cod_bt: this.cod_bt }, "resultado");
    }

    public postRegResultadosDestCred(ov: any): Observable<any> {
        let params = { ov_json: JSON.stringify(ov) };
        console.log(params);
        return this.postSimpleResponseString("actividades.post_dest_cre", params);
    }


}