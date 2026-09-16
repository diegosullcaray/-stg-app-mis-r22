import { Injectable } from "@angular/core";
import { isNullOrUndefined } from "app/core/shared/functions.util";
import { AuthService } from "app/system/session/authentication/auth.service";
import { system_keys } from "app/system/system-keys.config";
import { environment } from "environments/environment";
import { LocalStoreService } from "../../../core/data/local/local-store.service";


@Injectable({ providedIn: 'root' })
export class UserService {
    public email:string;
    public name:string;
    public pictureURL:string;
    public isDev:boolean;
    public isAlt:boolean;

    private body:{};

    constructor(
        private storage: LocalStoreService,
        private auth: AuthService
    ) {
        this.isDev=!environment.production;
        if(this.auth.isLoged){
            let a:boolean = this.storage.getItem(system_keys.user_alt);
            this.basics(this.storage.getItem(system_keys.user_bas),a);
            this.body=this.storage.getItem(system_keys.user_inst);
        }else{
            this.body={};
        }
    }

    get oriEmail(): string {
        let bp = this.storage.getItem(system_keys.user_bas_ori);
        if (isNullOrUndefined(bp)) {
            return undefined;
        }
        return bp.email;
    }

    private basics(r:any,alt:boolean){
        this.email=r.email;
        this.name=r.name;
        this.pictureURL=r.picture;
        if(!environment.production && !alt){
            this.email=environment.devUser;
        }
        this.setAlt(alt);
    }

    private setAlt(a:boolean){
        this.storage.setItem(system_keys.user_alt,a);
        this.isAlt=a;
    }

    public initBasics(resp:any,alt:boolean){
        this.basics(resp,alt);
        let bp={
            email:this.email,name:this.name,picture:this.pictureURL
        };
        this.storage.setItem(system_keys.user_bas,bp);
        if(!alt){
            this.storage.setItem(system_keys.user_bas_ori,bp);
        }
    }

    public install(key:string,prof:any,alt:boolean){
        this.body[key]=prof;
        this.storage.setItem(system_keys.user_inst,this.body);
        if(!alt){
            this.storage.setItem(system_keys.user_inst_ori,this.body);
        }
    }

    public original(){
        let r = this.storage.getItem(system_keys.user_bas_ori);
        this.basics(r,false);
        let ob = this.storage.getItem(system_keys.user_inst_ori);
        this.body=ob;
        this.setAlt(false);
    }

    public get(key:string):any{
        if(isNullOrUndefined(this.body)){
            return undefined;
        }
        return this.body[key];
    }

    public drop(key:string):void{
        delete this.body[key];
    }

    
}