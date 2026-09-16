import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AntService } from "../ant/ant-service.class";
import { Strand } from "../winder/strand.class";
import { IWinderRequestConfig, IWinderResponse } from "../winder/winder.interface";
import { WinderService } from "../winder/winder.service";

@Injectable()
export class ModSysAdminService extends AntService{
    constructor(private winderService: WinderService) {
        super({
            port: 6301,
            secret: "29A832E1F8C68ECB46E7C89716BB68E2",
            appId: "admin"
        },winderService);
     }

     //Lista de secciones (menus) del usuario
     public getMenuItems(email:string):Observable<IWinderResponse>{
        return this.getSimpleResponseString("list_sec",{email:email},"menu_response");
     }

     //Nivel, TipCod y CodRel base de la jerarquia pedida para el usuario
     public getBaseHierarchy(email:string,cod_hierarchy:number):Observable<IWinderResponse>{ 
         return this.getSimpleResponseString("base_hier",{email:email,cod_jer:cod_hierarchy},"base_hierarchy"); 
     }

     //Detalle del nivel de jerarquia pedido para el TipCod y CodRel raiz
     public getLevelHierarchy(cod_hier:number,lvl_hier:number,tip_cod:number,cod_rels:string[],params?:any):Observable<IWinderResponse>{
        let s = new Strand("level_hier","level_hierarchy");
        s.pushToPayload("cod_jer", cod_hier);    
        s.pushToPayload("lvl_jer", lvl_hier);
        s.pushToPayload("tip_cod", tip_cod);
        let vcr ="";
        cod_rels.forEach(x=>{
            vcr+=x+","
        });  
        s.pushToPayload("cod_rels", vcr.substring(0,vcr.length-1));   
        if(params){
            s.pushToPayload("params", JSON.stringify(params));
        }
        return this.getResponseString(s);    
     }

     //lista de sectoristas
     public getListPick01(tip_cod:number,cod_rel:string){
         return this.getSimpleResponseString("list_pick_01",{tip_cod:tip_cod,cod_rel:cod_rel},"list_res"); 
     }

     //Almacena el tracking de la ruta
     public postRouteTrack(reg:string){
         let s = new Strand("reg_track_info","res");
         s.pushToPayload("reg_json",reg);
         return this.postResponseString(s);
     }

}