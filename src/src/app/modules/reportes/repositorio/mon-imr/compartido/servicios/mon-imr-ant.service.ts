import { Injectable } from "@angular/core";
import { AntService } from "app/core/data/remote/ant/ant-service.class";
import { ModSysAdminService } from "app/core/data/remote/instances/mod-sys-admin.service";
import { WinderService } from "app/core/data/remote/winder/winder.service";
import { IWinderResponse } from "app/core/data/remote/winder/winder.interface";
import { UserService } from "app/system/admin/services/user.service";
import { Observable, of, timer } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class MonImrAntService extends AntService {
    profile: any;
    cod_bt: string;
    email: string;
    isAdmin: boolean;

    constructor(private winderService: WinderService, private user: UserService, private antAdmin: ModSysAdminService) {
        super({
            port: 6304,
            secret: "8982D9BA889F825E1360E0C594653C68",
            appId: "rep2"
        }, winderService);
        let profile = this.user.get('profile');
        this.cod_bt = profile.cod_bt;
        this.email = profile.email;
        this.isAdmin = profile.tip_use === 0;
    }

    public getDataSources(tip_cod: number, cod_rel: string, fec: string, imp: number): Observable<IWinderResponse> {
        return this.getSimpleResponseString("mon_imr.resultados", { tip_cod: tip_cod, cod_rel: cod_rel, fec: fec, imp: imp  }, "resultado");
        // let r;
        // if (tip_cod == 7) {
        //     r = this.ds1;
        // } else {
        //     r = this.ds2;
        // }
        // return timer(1000).pipe(map(() => (r)));
    } 

    public getDetail(tip_cod: number, cod_rel: string, fec: string, tip: number,top:number): Observable<IWinderResponse> {
        // if (tip == 1) {
        //     return timer(1000).pipe(map(() => (this.dd1)));
        // } else {
        //     return timer(1000).pipe(map(() => (this.dd2)));
        // }
        return this.getSimpleResponseString("mon_imr.detalle", { tip_cod: tip_cod, cod_rel: cod_rel, fec: fec,tip: tip, top: top }, "resultado");
    }












 
}