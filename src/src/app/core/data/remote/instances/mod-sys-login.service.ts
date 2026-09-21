import { Injectable } from "@angular/core";
import { CypherService } from "app/core/shared/cypher.service";
import { TokenService } from "app/core/shared/token.service";
import { Observable } from "rxjs";
import { AntService } from "../ant/ant-service.class";
import { Strand } from "../winder/strand.class";
import { IWinderResponse } from "../winder/winder.interface";
import { WinderService } from "../winder/winder.service";

@Injectable()
export class ModSysLoginService extends AntService {

   constructor(private winderService: WinderService, private tokenService: TokenService) {
      super({
         port: 6300,
         secret: "8A9ABC5A76E1A86B26402C32DD355394",
         appId: "session"
      }, winderService);
   }

   public login(email: string): Observable<IWinderResponse> {
      let s = new Strand("login", "login_response");
      s.pushToPayload("email", email);
      s.pushToPayload("alt", 0);
      /*let h = {
         'Authorization': this.tokenService.createLoginToken()
      };
      return this.get({ responseType: 'JSON', strands: s, options: { headers: h } });*/
      return this.getResponseString(s);
   }

   public alt_login(email: string): Observable<IWinderResponse> {
      let s = new Strand("login", "login_response");
      s.pushToPayload("email", email);
      s.pushToPayload("alt", 1);
      return this.getResponseString(s);
   }

   public postMeta(email:string,meta: any) {
      return this.postSimpleResponseString("meta",{email:email,meta:JSON.stringify(meta)});
   }

}