import { onNullOrUndefined } from "app/core/shared/functions.util";
import { Observable } from "rxjs";
import { first } from "rxjs/operators";
import { Strand } from "../winder/strand.class";
import { IWinderConnectionConf, IWinderRequestConfig, IWinderResponse } from "../winder/winder.interface";
import { WinderService } from "../winder/winder.service";

export class AntService {
    private connectionConf: IWinderConnectionConf;
    private service: WinderService;

    constructor(conn: IWinderConnectionConf, winderService: WinderService) {
        this.connectionConf = conn;
        this.service = winderService;
    }

    protected get(requestConf:IWinderRequestConfig): Observable<IWinderResponse> {
        return this.service.prepare(this.connectionConf,requestConf)
            .get().pipe(first());
    }

    protected post(requestConf:IWinderRequestConfig):Observable<any>{
        return this.service.prepare(this.connectionConf,requestConf).post<any>();
    }

    protected getResponseString(s:Strand|Strand[]): Observable<IWinderResponse> {
        return this.get({responseType:'JSON',strands:s});
    }

    protected getResponseResource(s:Strand|Strand[]): Observable<IWinderResponse> {
        return this.get({responseType:'resource',strands:s});
    }

    protected postResponseString(s:Strand|Strand[]):Observable<any>{
        return this.post({responseType:'JSON',strands:s}).pipe(first());
    }

    protected getSimpleResponseString(strandName:string,params:{},responseName?:string):Observable<IWinderResponse>{
        let s = new Strand(strandName, onNullOrUndefined(responseName,'response'));
        Object.keys(params).forEach(v=>{
            s.pushToPayload(v,params[v]);
        });
        return this.getResponseString(s);
    }

    protected getSimpleResponseStringNP(strandName:string,responseName?:string):Observable<IWinderResponse>{
        let s = new Strand(strandName, onNullOrUndefined(responseName,'response'));
        return this.getResponseString(s);
    }

    protected getSimpleResponseResource(strandName:string,params:{},responseName?:string):Observable<IWinderResponse>{
        let s = new Strand(strandName, onNullOrUndefined(responseName,'response'));
        Object.keys(params).forEach(v=>{
            s.pushToPayload(v,params[v]);
        });
        return this.getResponseResource(s);
    }


    protected postSimpleResponseString(strandName:string,params:{}):Observable<any>{
        let s = new Strand(strandName);
        Object.keys(params).forEach(v=>{
            s.pushToPayload(v,params[v]);
        });
        return this.postResponseString(s);
    }

    protected postFileSimpleResponseString(strandName:string,params:{},fileId:string,file:File):Observable<any>{
        let s = new Strand(strandName);
        Object.keys(params).forEach(v=>{
            s.pushToPayload(v,params[v]);
        });
        s.setFile(file,fileId);
        return this.postResponseString(s);
    }

    protected postFileSimpleResponseStringNP(strandName:string,fileId:string,file:File):Observable<any>{
        let s = new Strand(strandName);
        s.setFile(file,fileId);
        return this.postResponseString(s);
    }

    //el filetype va en meta,opt van cosas como reportprogress
    /*protected postFile(s:Strand|Strand[],meta:{},opt?:{}):Observable<any>{
        return this.post({responseType:'JSON',strands:s,options:opt,metaHeaders:meta}).pipe(first());
    }*/
}