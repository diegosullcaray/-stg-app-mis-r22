import { Strand } from './strand.class';
import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface IWinderHeader{
    port:number,
    responseType:string
    accessToken?:string,
    meta?:{}
}

export interface IStrand{
    actionRoute:string,
    name:string,
    payload?:{}
}

export interface IWinderResponse{
    code:string,
    headers:{},
    body:{},
    errors?:{}
}

export interface IWinderToken{
    appId:string,
    failOnError?:boolean,
    strands?:IStrand[]

}

export interface IWinderConfig{
    port:number,
    secret:string,
    appId:string,
    responseType:string,
    options?:IWinderOptionsConfig,
    strands?:Strand[]|Strand,
    metaHeaders?:{}
}

export interface IWinderOptionsConfig{
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?:string //?: 'body';
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?:string //?: 'json';
    withCredentials?: boolean;
}


