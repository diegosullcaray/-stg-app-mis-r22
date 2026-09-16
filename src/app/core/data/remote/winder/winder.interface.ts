import { Strand } from './strand.class';

/*export interface IWinderBody{
    appId:string;
    failOnError:boolean;
    strands:Strand[];
    withFormData:boolean;
    formData:FormData;
}*/

export interface IWinderResponse{
    code:string,
    headers:any,
    body:any,
    errors?:any
}

export interface IWinderConnectionConf{
    port:number,
    secret:string,
    appId:string
}

export interface IWinderRequestConfig{
    responseType:string,
    options?:{},
    strands:Strand[]|Strand,
    metaHeaders?:{}
}

/*export interface IWinderRequestOptionsConfig{
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
}*/








