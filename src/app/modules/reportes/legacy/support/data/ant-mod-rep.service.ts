
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { WinderService } from 'app/core/data/remote/winder/winder.service';
import { Strand } from 'app/core/data/remote/winder/strand.class';
import { IWinderResponse } from 'app/core/data/remote/winder/winder.interface';
import { UserService } from 'app/system/admin/services/user.service';
import { AntService } from 'app/core/data/remote/ant/ant-service.class';
import { isNullOrUndefined } from 'app/core/shared/functions.util';

export enum ReportType {
    REGULAR = "regularData",
    GRAPHIC = "graphicData",
    DEPRECATED = "reportData"
}

export enum DownloadType {
    STORED_01 = "storedFile01"
}

@Injectable()
export class ModRepService extends AntService{

    constructor(private winderService: WinderService, private userService: UserService) { 
        super({
            port: 5304,
            secret: "B0ECE459601D3577F7408D5C8DEA314A",
            appId: "reporting"
        },winderService);
    }

    /*public getFile(tipoDesc: DownloadType, params?: {}):Observable<any> {
        let s = new Strand(tipoDesc.toString());
        if (!isNullOrUndefined(params)) {
            for (let k in params) {
                let v = params[k];
                s.pushToPayload(k, v);
            }
        }
        this.repConf.strands = s;
        this.repConf.responseType = "bytes";
        this.repConf.options = { observe: 'response', responseType: 'blob' };
        return this.winderService.prepare(this.repConf).post<any>();
    }*/

    public getHierarchy(jerar: string, tipCod?: number, codRel?: string, level?: number): Observable<IWinderResponse> {
        let s = new Strand("hierarchy2", "result");
        s.pushToPayload("email", this.userService.email);
        s.pushToPayload("tip_use", this.userService.get("profile").tip_use);
        s.pushToPayload("jerar", jerar);
        if (tipCod !== undefined) {
            s.pushToPayload("tip_cod", tipCod);
            s.pushToPayload("cod_rel", codRel);
            s.pushToPayload("nivel", level);
        }
        return this.getResponseString(s);
    }

    public getData(tipoRep: ReportType, repCod: string, params?: {}): Observable<IWinderResponse> {
        let s = new Strand(tipoRep.toString(), "result");
        if (!isNullOrUndefined(params)) {
            for (let k in params) {
                let v = params[k];
               
                s.pushToPayload(k, v);
            }
        }
        s.pushToPayload("cod_rep", repCod);
        return this.getResponseString(s);
    }

}