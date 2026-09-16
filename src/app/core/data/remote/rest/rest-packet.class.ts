import { environment } from "environments/environment";

export class RESTPacket{
    //public cls:Class;
    private rootUrl:string = environment.requestConfigRootURL;
    public baseRoute:string;
    private routeParams:{}[];
    private postParams:{} = {};
    private optionsParams:{} = {};
    private form:FormData;
    private flagForm:boolean = false;

    public setFormData(fd:FormData){
        this.form=fd;
        this.flagForm=true;
    }

    public haveFormData():boolean{
        return this.flagForm;
    }

    public getFormData():FormData{
        return this.form;
    }

    public pushRouteParam(k:string,v:string){
        if(this.routeParams==null){
            this.routeParams=[];
        }
        let nv = {};
        nv[k]=v;
        
        this.routeParams.push(nv);
    }

    public pushOptionParam(k:string,v:string){
        this.optionsParams[k]=v;
    }

    public pushPostParam(k:string,v:string){
        this.postParams[k]=v;
    }

    public getPostParams():any{
        return this.postParams
    }

    public getOptions():{}{
        return this.optionsParams;
    }

    public setOptions(opts:{}){
        this.optionsParams=opts;
    }

    public computeURL():string{
        let pms:string = '';
        if(this.routeParams!=null){
            this.routeParams.forEach(element => {
                pms+=`${Object.keys(element)[0]}=${Object.values(element)[0]}&`;
            });
        }
        //let route=(<any>this.cls)._deco__request_mapping[0].base;
        let route="";
        if(this.baseRoute!=null){
            route+='/'+this.baseRoute;
        }
        if(pms!=''){
            route+='?'+pms.substring(0, pms.length - 1);;
        }
        return `${this.rootUrl}${route}`;
    }
}