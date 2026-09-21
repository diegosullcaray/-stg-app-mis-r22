import { Injectable } from "@angular/core";
import { AntService } from "app/core/data/remote/ant/ant-service.class";
import { IWinderResponse } from "app/core/data/remote/winder/winder.interface";
import { WinderService } from "app/core/data/remote/winder/winder.service";
import { StgAppLoaderService } from "app/core/screen/components/stg-app-loader/stg-app-loader.service";
import { isNullOrUndefined } from "app/core/shared/functions.util";
import { UserService } from "app/system/admin/services/user.service";
import { Observable } from "rxjs";
import { ModRepService } from '../../../reportes/compartido/servicios/mod-rep.service';

@Injectable() 
export class ModReportesEService extends AntService {
    cod_bt: string; 
    is_admin: number;

    constructor(private winderService: WinderService, private user: UserService, private loader: StgAppLoaderService, private datosReporte: ModRepService) {
        super({
            port: 6302,
            secret: "CCAFE0F473E9B66F2EA57D46C5C3047E",
            appId: "app"
         }, winderService);
        let profile = this.user.get('profile');
        this.cod_bt = profile.cod_bt; 
        this.is_admin = profile.tip_use === 0?1:0;
    }
 

    public getRegResultadosPanelMarcas(cod_met:string): Observable<IWinderResponse> {
        console.log(cod_met)
        return this.getSimpleResponseString("ReasignacionCartCap.get_list_marca", { cod_bt: cod_met }, "resultado");
    }  
      

    public getConfiguracionModPM(): Observable<IWinderResponse> {
        return this.getSimpleResponseString("ReasignacionCartCap.pm_cfg_mod", { cod_bt: this.cod_bt }, "resultado");
    }
    
     
    public postActualizaPM(cod_numdoc:number,tipcod:any,pais:any,AsesorF:any,canal:any,agencia:any): Observable<IWinderResponse> {
      
        return this.postSimpleResponseString("ReasignacionCartCap.update_pm", { cod_numdoc: cod_numdoc,tipcod:tipcod,pais:pais,AsesorF:AsesorF, canal:canal,agencia:agencia,usuarioBT: this.cod_bt });
    }//  add_pm
    public postADDPM(numdoc:any,tipcod:any,pais:any,AsesorF:any,canal:any,agencia:any,fecini:any,fecfin:any,comentario:any): Observable<IWinderResponse> {
       if(agencia == null){
        agencia=''
       }
       if(AsesorF==null){
        AsesorF=''
       }
       if(fecfin==null){
        fecfin='1990-01-01'
       }
       if(comentario==null){
        comentario=''
       }
 
         return this.postSimpleResponseString("ReasignacionCartCap.add_pm", { numdoc: numdoc,tipcod:tipcod,pais:pais,AsesorF:AsesorF, canal:canal,agencia:agencia,fecini,fecfin,comentario:comentario,usuarioBT: this.cod_bt  });
     }

     

    public postDeletePM(cod_numdoc:number): Observable<IWinderResponse> {
       
        return this.postSimpleResponseString("ReasignacionCartCap.delete_pm", { numdoc: cod_numdoc,usuarioBT: this.cod_bt });
    }  

     
}