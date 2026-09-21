import { Injectable } from "@angular/core";
import { AntService } from "app/core/data/remote/ant/ant-service.class";
import { ModSysAdminService } from "app/core/data/remote/instances/mod-sys-admin.service";
import { IWinderResponse } from "app/core/data/remote/winder/winder.interface";
import { WinderService } from "app/core/data/remote/winder/winder.service";
import { StgAppLoaderService } from "app/core/screen/components/stg-app-loader/stg-app-loader.service";
import { UserService } from "app/system/admin/services/user.service";
import { Observable } from "rxjs";

@Injectable()
export class ModBudgetService extends AntService {
    profile: any;
    cod_bt: string;
    email: string;
    isAdmin: boolean;

    constructor(private winderService: WinderService, private user: UserService, private antAdmin: ModSysAdminService,private loader:StgAppLoaderService) {
        super({
            port: 6302,
            secret: "CCAFE0F473E9B66F2EA57D46C5C3047E",
            appId: "app"
        }, winderService);
        let profile = this.user.get('profile');
        this.cod_bt = profile.cod_bt;
        this.email = this.email|| this.user.email//profile.email ; 
        this.isAdmin = profile.tip_use === 0;
    }

    public openMsg(msg:string){
        this.loader.open(msg);
    }

    public closeMsg(){
        this.loader.close();
    }

    public getBaseHierarchy(cod_hierarchy: number): Observable<IWinderResponse> {
        //let currentDate = this.user.get('profile').curr_fec;
        return this.antAdmin.getBaseHierarchy(this.user.email, cod_hierarchy);
    }

    public getRegResultados(tip_cod: number): Observable<IWinderResponse>{
        return this.getSimpleResponseString("presupuesto.get_reg_res", { tip_cod: tip_cod}, "resultado");
    }

    public postRegResultados( ov: any): Observable<any> {
        let params = { cod_bt: this.cod_bt, ov_json: JSON.stringify(ov) };
        return this.postSimpleResponseString("presupuesto.post_reg_res", params);
    }

    public getLogVerificaciones(tip_cod: number,cod_sec:string){
        return this.getSimpleResponseString("presupuesto.get_log_ver", {tip_cod: tip_cod,cod_sec:cod_sec}, "resultado");
    }

    public postLogVerificaciones(tip_cod: number, cod_rel: string,cod_sec:string): Observable<any> {
        let params = { cod_bt: this.cod_bt, tip_cod: tip_cod, cod_rel: cod_rel,cod_sec:cod_sec};
        return this.postSimpleResponseString("presupuesto.post_log_ver", params);
    }

    //Resultados Cartera Creditos
    public getResCarCreditos(tip_cod: number, cod_rel: string): Observable<IWinderResponse> {
        return this.getSimpleResponseString("presupuesto.get_car_cre", { email:this.email, tip_cod: tip_cod, cod_rel: cod_rel }, "resumen");
    }

    //Graba Cartera Creditos
    public postResCarCreditos(tip_cod: number, cod_rel: string, ov: any): Observable<any> {
        console.log(JSON.stringify(ov))
        let params = { cod_bt: this.cod_bt, tip_cod: tip_cod, cod_rel: cod_rel, ov_json: JSON.stringify(ov) };
        return this.postSimpleResponseString("presupuesto.post_car_cre", params);
    }

    //Resultados Depositos Red
    public getResDepRed(tip_cod: number, cod_rel: string): Observable<IWinderResponse> {
        return this.getSimpleResponseString("presupuesto.get_dep_red", { email:this.email, tip_cod: tip_cod, cod_rel: cod_rel }, "resumen");
    }

    //Graba Depositos Red
    public postResDepRed(tip_cod: number, cod_rel: string, ov: any): Observable<any> {
        let params = { cod_bt: this.cod_bt, tip_cod: tip_cod, cod_rel: cod_rel, ov_json: JSON.stringify(ov) };
        return this.postSimpleResponseString("presupuesto.post_dep_red", params);
    }

    //Resultados Depositos BP
    public getResDepBP(tip_cod: number, cod_rel: string): Observable<IWinderResponse> {
        return this.getSimpleResponseString("presupuesto.get_dep_bp", { email:this.email, tip_cod: tip_cod, cod_rel: cod_rel }, "resumen");
    }

    //Graba Depositos BP
    public postResDepBP(tip_cod: number, cod_rel: string, ov: any): Observable<any> {
        //console.log(JSON.stringify(ov))
        let params = { cod_bt: this.cod_bt, tip_cod: tip_cod, cod_rel: cod_rel, ov_json: JSON.stringify(ov) };
        //console.log(params);
        return this.postSimpleResponseString("presupuesto.post_dep_bp", params); 
    }

    //Resultados Seguros Comercial
    public getResSegComercial(tip_cod: number, cod_rel: string): Observable<IWinderResponse> {
        return this.getSimpleResponseString("presupuesto.get_seg_com", { email:this.email, tip_cod: tip_cod, cod_rel: cod_rel }, "resumen");
    }

    //Graba Seguros Comercial
    public postResSegComercial( tip_cod: number, cod_rel: string, ov: any): Observable<any> {
        let params = { cod_bt: this.cod_bt, tip_cod: tip_cod, cod_rel: cod_rel, ov_json: JSON.stringify(ov) };
        return this.postSimpleResponseString("presupuesto.post_seg_com", params);
    }

    //Resultados Seguros Operaciones
    public getResSegOperaciones(tip_cod: number, cod_rel: string): Observable<IWinderResponse> {
        return this.getSimpleResponseString("presupuesto.get_seg_ope", { email:this.email, tip_cod: tip_cod, cod_rel: cod_rel }, "resumen");
    }

    //Graba Seguros Comercial
    public postResSegOperaciones( tip_cod: number, cod_rel: string, ov: any): Observable<any> {
        let params = { cod_bt: this.cod_bt, tip_cod: tip_cod, cod_rel: cod_rel, ov_json: JSON.stringify(ov) };
        return this.postSimpleResponseString("presupuesto.post_seg_ope", params);
    }

}