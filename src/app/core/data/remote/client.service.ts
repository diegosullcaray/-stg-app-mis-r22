import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ClientService {

    constructor(private http: HttpClient){}

    get currentDateAsNumber():number{
        return Date.now();
    }

    public getIpFromExtResource():Observable<any>{
        return this.http.get(environment.ipProvider);
    }

    public getPosition(): Promise<any> {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resp => {
                resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
            },
            err => {
                 reject(err);
                }
            );
        });

    }

}