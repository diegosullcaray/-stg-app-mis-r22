import { Injectable } from "@angular/core";
import { AntService } from "app/core/data/remote/ant/ant-service.class";
import { IWinderResponse } from "app/core/data/remote/winder/winder.interface";
import { WinderService } from "app/core/data/remote/winder/winder.service";
import { Observable } from "rxjs";

@Injectable()
export class ModIncentivos3Service extends AntService {
    cod_bt: string;

    constructor(private winderService: WinderService) {
        super({
            port: 6302,
            secret: "CCAFE0F473E9B66F2EA57D46C5C3047E",
            appId: "app"
        }, winderService);
    }

    public getFromHierList(tip_cod: number, cod_rel: string, tip_cod_l: number): Observable<IWinderResponse> {
        return this.getSimpleResponseString("incentivos3.lista3", { tip_cod: tip_cod, cod_rel: cod_rel, tip_cod_l: tip_cod_l }, "resultado");
    }

    public getDataSources(model: string, cla_usu: number, tip_cod: number, cod_rel: string, fec: string): Observable<IWinderResponse> {
        if (cla_usu == 2) {
            return this.getSimpleResponseString("incentivos4.resultados5", { tip_cod: tip_cod, cod_rel: cod_rel, fec: fec }, "resultado");
        }
        return this.getSimpleResponseString("incentivos4.resultados4", { model: model, tip_cod: tip_cod, cod_rel: cod_rel, fec: fec }, "resultado");
    }

    public calculate(model: string, cla_usu: number, params: any, fec: string) {
        if (cla_usu == 2) {
            return this.getSimpleResponseString("incentivos4.calculadora5", { params: JSON.stringify(params), fec: fec }, "resultado");
        }
        return this.getSimpleResponseString("incentivos4.calculadora4", { model: model, params: JSON.stringify(params), fec: fec }, "resultado");
    }

    public getDetail(tip_cod: number, cod_rel: string, cod_var: number, fec: string): Observable<IWinderResponse> {
        return this.getSimpleResponseString("incentivos3.detalle_var3", { tip_cod: tip_cod, cod_rel: cod_rel, cod_var: cod_var, fec: fec }, "resultado");
    }

    public getTasa(tip_cod: number, cod_rel: string, cod_var: number, fec: string): Observable<IWinderResponse> {
        return this.getSimpleResponseString("incentivos3.tasas3", { tip_cod: tip_cod, cod_rel: cod_rel, fec: fec }, "resultado");
    }

    public getProd(tip_cod: number, cod_rel: string, cod_var: number, fec: string): Observable<IWinderResponse> {
        return this.getSimpleResponseString("incentivos3.productividad3", { tip_cod: tip_cod, cod_rel: cod_rel, fec: fec }, "resultado");
    }

    public getCliBanc(tip_cod: number, cod_rel: string, fec: string): Observable<IWinderResponse> {
        return this.getSimpleResponseString("incentivos3.bancarizados3", { tip_cod: tip_cod, cod_rel: cod_rel, fec: fec }, "resultado");
    }

    public getRet(tip_cod: number, cod_rel: string, fec: string): Observable<IWinderResponse> {
        return this.getSimpleResponseString("incentivos4.retencion4", { tip_cod: tip_cod, cod_rel: cod_rel, fec: fec }, "resultado");
    }

    /*

    public getSeguiCob(tip_cod:number,cod_rel:string): Observable<IWinderResponse>{
        return this.getSimpleResponseString("incentivos2.cobertura2", { tip_cod: tip_cod,cod_rel:cod_rel }, "resultado");
    }

    public getSeguiDet(tip_cod:number,cod_rel:string): Observable<IWinderResponse>{
        return this.getSimpleResponseString("incentivos2.detalle2", { tip_cod: tip_cod,cod_rel:cod_rel }, "resultado");
    }*/
}