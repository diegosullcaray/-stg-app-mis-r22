import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AntService } from "../ant/ant-service.class";
import { IWinderResponse } from "../winder/winder.interface";
import { WinderService } from "../winder/winder.service";

@Injectable()
export class ModAppService extends AntService {
   constructor(private winderService: WinderService) {
      super({
         port: 6302,
         secret: "CCAFE0F473E9B66F2EA57D46C5C3047E",
         appId: "app"
      }, winderService);
   }

   /*****INCENTIVOS*****/

   //Calculadora
   public getIncentivosCalculadora(cod_bt: string, params: {}): Observable<IWinderResponse> {
      return this.getSimpleResponseString("incentivos.calculadora", { cod_bt: cod_bt, params: JSON.stringify(params) }, "calculadora");
   }

   //Resumen
   public getIncentivosResumen(cod_bt: string): Observable<IWinderResponse> {
      return this.getSimpleResponseString("incentivos.resumen", { cod_bt: cod_bt }, "resumen");
   }

   /********************/

}