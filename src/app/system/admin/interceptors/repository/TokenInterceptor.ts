import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { isNullOrUndefined } from "app/core/shared/functions.util";
import { TokenService } from "app/core/shared/token.service";
import { environment } from "environments/environment";
import { EMPTY, Observable } from "rxjs";
import { AdminService } from "../../services/admin.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService, private adminService: AdminService) { }

    isAntDomain(url: string) {
        return url.startsWith(environment.requestConfigRootURL);
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.isAntDomain(request.url)) {
            this.tokenService.updateToken();
        }
        /*let changedReq: any;
        if (this.isAntDomain(request.url)) {
            if(!this.tokenService.validateToken(tk)){
                //console.log(request);
                this.adminService.openSessionEndDialog();
                return EMPTY;
            }
            changedReq = request.clone({
                setHeaders: {
                    'Authorization': tk
                },
            });
        } else {
            changedReq = request;
        }*/
        return next.handle(request);
    }
}