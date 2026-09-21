import { Injectable } from "@angular/core";
import { AntService } from "app/core/data/remote/ant/ant-service.class";
import { IWinderResponse } from "app/core/data/remote/winder/winder.interface";
import { WinderService } from "app/core/data/remote/winder/winder.service";
import { StgAppLoaderService } from "app/core/screen/components/stg-app-loader/stg-app-loader.service";
import { Observable } from "rxjs";

@Injectable()
export class ModIncentivosAService extends AntService {
    cod_bt: string;

    constructor(private winderService: WinderService, private loader: StgAppLoaderService) {
        super({
            port: 6302,
            secret: "CCAFE0F473E9B66F2EA57D46C5C3047E",
            appId: "app"
        }, winderService);
    }

    public getPickerList(tip_cod:number,cod_rel:string): Observable<IWinderResponse> {
        return this.getSimpleResponseString("incentivos2.lista2", { tip_cod: tip_cod,cod_rel:cod_rel}, "resultado");
    }

    public getDataSources(tip_cod:number,cod_rel:string): Observable<IWinderResponse> {
        return this.getSimpleResponseString("incentivos2.resultados2", { tip_cod: tip_cod,cod_rel:cod_rel }, "resultado");
    }

    public calculate(tip_cod:number,cod_rel:string,var_sal:number,var_cli:number,efec1:number,efec2:number,tmes:number,tmin:number,sc1:number,pac:number,cor_reg:number,cor_sat:number,rop:number){
        let p={
            tip_cod:tip_cod,
            cod_rel:cod_rel,
            var_sal:var_sal,
            var_cli:var_cli,
            efec1:efec1,
            efec2:efec2,
            tmes:tmes,
            tmin:tmin,
            sc1:sc1,
            pac:pac,
            cor_reg:cor_reg,
            cor_sat:cor_sat,
            rop:rop
        }
        return this.getSimpleResponseString("incentivos2.calculadora2", p, "resultado");
    }

    public getCliBanc(tip_cod:number,cod_rel:string): Observable<IWinderResponse>{
        return this.getSimpleResponseString("incentivos2.bancarizados2", { tip_cod: tip_cod,cod_rel:cod_rel }, "resultado");
    }

    public getSeguiCob(tip_cod:number,cod_rel:string): Observable<IWinderResponse>{
        return this.getSimpleResponseString("incentivos2.cobertura2", { tip_cod: tip_cod,cod_rel:cod_rel }, "resultado");
    }

    public getSeguiDet(tip_cod:number,cod_rel:string): Observable<IWinderResponse>{
        return this.getSimpleResponseString("incentivos2.detalle2", { tip_cod: tip_cod,cod_rel:cod_rel }, "resultado");
    }
}