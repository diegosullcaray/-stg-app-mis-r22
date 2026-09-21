import * as moment from 'moment';
import { Injectable } from "@angular/core";
import { AntService } from "app/core/data/remote/ant/ant-service.class";
import { ModSysAdminService } from "app/core/data/remote/instances/mod-sys-admin.service";
import { IWinderResponse } from "app/core/data/remote/winder/winder.interface";
import { WinderService } from "app/core/data/remote/winder/winder.service";
import { UserService } from "app/system/admin/services/user.service";
import { Observable } from "rxjs";
import { ReportType } from '../../legacy/support/data/ant-mod-rep.service';
import { Strand } from 'app/core/data/remote/winder/strand.class';
import { isNullOrUndefined } from 'app/core/shared/functions.util';

@Injectable()
export class ModRepService extends AntService {
    profile: any;
    cod_bt: string;
    email: string;
    isAdmin: boolean;

    constructor(private winderService: WinderService, private user: UserService, private antAdmin: ModSysAdminService) {
        super({
            port: 5304,
            secret: "B0ECE459601D3577F7408D5C8DEA314A",
            appId: "reporting"
        }, winderService);
        let profile = this.user.get('profile');
        this.cod_bt = profile.cod_bt;
        this.email = profile.email;
        this.isAdmin = profile.tip_use === 0;
    }

    public getHierarchyConfig(name:string){
        let profile = this.user.get('profile');
        let currentDate = moment(profile.curr_fec).format("YYYY-MM-DD");
        switch(name){
            case "UNI_1":return {code:9,max_lvl:6,params:{key:"fec",val:currentDate}};
            case "OFI_1":return {code:2,max_lvl:5};//captaciones
            case "OFI_2":return {code:4,max_lvl:4};//oficina-corredor
            case "OFI_3":return {code:4,max_lvl:1};//solo FC
            case "MAC_1":return {code:12,max_lvl:4};//captaciones Macro
            case "MAC_2":return {code:13,max_lvl:3};//captaciones Macro SIN MACROCORREDOR
            default: return null; 

        }
    }

    public getBaseHierarchy(cod_hierarchy: number): Observable<IWinderResponse> {
        //let currentDate = this.user.get('profile').curr_fec;
     
        return this.antAdmin.getBaseHierarchy(this.user.email, cod_hierarchy);
    }

    public getData(tipoRep: ReportType, repCod: string, params?: {}): Observable<IWinderResponse> {
        let s = new Strand(tipoRep.toString(), "result");
        if (!isNullOrUndefined(params)) {
            for (let k in params) {
                let v = params[k];
               
                s.pushToPayload(k, v);
            }
        }
        s.pushToPayload("cod_rep", repCod);
        return this.getResponseString(s);
    }

    public getRegularTableResult(codRep:string,params: any): Observable<IWinderResponse>{
        
       params["cod_rep"]=codRep;
       return this.getSimpleResponseString("table.regular", params, "resultado");
    }

    public getRegularData(codRep:string,params: any): Observable<IWinderResponse>{
        return this.getData(ReportType.REGULAR,codRep,params);
    }
     
}
