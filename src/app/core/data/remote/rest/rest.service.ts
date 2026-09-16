import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RESTPacket } from './rest-packet.class';

@Injectable()
export class RESTService{

    constructor(private http: HttpClient) { 
    }

    public get<T>(config:RESTPacket):Observable<T>{
        let url = config.computeURL();
        let options = config.getOptions();
        return this.http.get<T>(url,options);
    }

    public post<T>(config:RESTPacket):Observable<T>{
        let url = config.computeURL();
        let body;
        if(config.haveFormData()){
            body=config.getFormData();
        }else{
            body = JSON.stringify(config.getPostParams());
        }
        let options = config.getOptions();
        return this.http.post<T>(url, body,options);
    }
    public delete(config:RESTPacket){
        //TODO
    }
    public update(config:RESTPacket){
        //TODO
    }
}