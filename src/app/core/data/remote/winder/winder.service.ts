import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Strand } from './strand.class';
import { CypherService } from 'app/core/shared/cypher.service';
import { RESTService } from '../rest/rest.service';
import { RESTPacket } from '../rest/rest-packet.class';
//import { jsonStringifyIgnoringFields } from 'app/core/shared/functions.util';
import { IWinderConnectionConf, IWinderRequestConfig, IWinderResponse } from './winder.interface';
import { isNullOrUndefined, jsonStringifyIgnoringFields } from 'app/core/shared/functions.util';
import { TokenService } from 'app/core/shared/token.service';

@Injectable()
export class WinderService {
    private strands: Strand[];
    private formData: FormData;
    private options: any;
    private config:any = {};

    constructor(private cypher: CypherService, private restService: RESTService,private tokenService: TokenService) {
    }

    public prepare(conn: IWinderConnectionConf, conf: IWinderRequestConfig): WinderService {
        this.strands = [];

        if (conf.strands instanceof Strand) {
            this.addStrand(conf.strands);
        } else {
            conf.strands.forEach(e => {
                this.addStrand(e);
            });
        }
        this.init(conn,conf);
        return this;
    }

    private init(conn: IWinderConnectionConf,conf: IWinderRequestConfig):void{
        this.config['key'] = conn.secret;
        this.config['port'] = conn.port;
        this.config['id'] = conn.appId;
        this.config['responseType'] = conf.responseType;

        let sjson = JSON.stringify(this.strands,(k,v)=>{
            if(k=='formData'){
                return undefined;
            }
            return v;
        });

        if(isNullOrUndefined(conf.options)){
            this.options={};
        }else{
            this.options=conf.options;
        }
        if(this.config.responseType=="resource"){
            this.options['responseType']='blob';
        }
        let h = this.options.headers;
        if(isNullOrUndefined(h)){
            this.options['headers']={"Winder-Params":sjson}
        }else{
            this.options['headers']["Winder-Params"]=sjson;
        }
        /*let tk = this.tokenService.getAccessToken();
        if(isNullOrUndefined(tk)){
            tk = this.tokenService.createVolatileToken();
        }
        this.options['headers']['Authorization']=tk;*/
    }

    public post<T>(): Observable<T> {
        var rp = new RESTPacket();
        
        if (this.formData) {
            let fd = this.formData;
            rp.baseRoute = "v1/pf";
            fd.append("w", this.winderConfig());
            rp.setFormData(fd);
        } else {
            rp.baseRoute = "v1/p";
            rp.pushPostParam("w", this.winderConfig());
        }
        rp.setOptions(this.options);
        return this.restService.post<T>(rp);
    }

    public delete() {
        //TODO
    }

    public update() {
        //TODO
    }

    public get(): Observable<IWinderResponse> {
        var rp = new RESTPacket();
        rp.baseRoute = "v1/g";
        rp.pushRouteParam("w", this.winderConfig());

        rp.setOptions(this.options);
        return this.restService.get<IWinderResponse>(rp);
    }

    /*private initBody(id: string) {
        this.body = {} as IWinderBody;
        this.body.appId = id;
        this.body.failOnError = true;
        this.body.strands = [];
        this.body.withFormData = false;
    }*/

    private addStrand(strand: Strand) {
        if (strand.haveFormData()) {
            this.formData = strand.getFormData();
        }
        this.strands.push(strand);
    }

    private winderConfig():string{
        let hp = this.cypher.encrypt(JSON.stringify(this.config));
        return hp.replace(/\+/gi, "$");
    }

    /*private createToken(key?: string): string {
        let secret = key?key:this.cypher.secret;
        let hp = this.cypher.encrypt(JSON.stringify(this.headers));
        let ignoreF = ['withFormData', 'formData'];
        let pp = this.cypher.encrypt(jsonStringifyIgnoringFields(this.body, ignoreF),secret);
        let r = hp.replace(/\+/gi, "$") + "." + pp.replace(/\+/gi, "$");
        return r;
    }*/


}