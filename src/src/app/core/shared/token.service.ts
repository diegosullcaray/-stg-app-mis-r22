import { Injectable } from "@angular/core";
import { UserService } from "app/system/admin/services/user.service";
import { CypherService } from "./cypher.service";
import { isNullOrUndefined, onNullOrUndefined } from "./functions.util";
import { printLog } from "./debug.util";
import { AdminService } from "app/system/admin/services/admin.service";

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    private activeToken: boolean;

    constructor(private userService: UserService, private cypherService: CypherService, private adminService: AdminService) {
    }

    private createVolatileToken(): string {
        printLog("Creando volatile token");
        let ct = Date.now();
        let tk = { "domain": "confianza.pe", "sid": "dummy", "mode": "volatile", "tc": ct - 1000 * 120, "te": ct + 1000 * 2 };
        let stk = JSON.stringify(tk);
        return this.cypherService.encrypt(stk);
    }

    private getAccessToken(): string {
        let tk = this.userService.get("token");
        if (isNullOrUndefined(tk)) {
            tk = this.createVolatileToken();
        }
        return tk;
    }

    public clearToken(): void {
        this.userService.drop("token");
    }

    public updateToken() {
        let tk = this.getAccessToken();
        let dtk: any = JSON.parse(this.cypherService.decrypt(tk));
        let ct = Date.now();
        let nt = ct + 1000 * 60 * 60 * 4;
        let cd = new Date(ct);
        let tknd = new Date(nt);
        let sd = cd.getDate() === tknd.getDate() &&
            cd.getMonth() === tknd.getMonth() &&
            cd.getFullYear() === tknd.getFullYear();
        this.validateToken();
        if (dtk.mode != "volatile" && sd && this.activeToken) {
            dtk.te = nt;
            //dtk.te = ct + 1000 * 60 * 5;
            let nte = new Date(dtk.te).toISOString().replace('T', ' ').substring(0, 19);
            printLog("Token actualizado a " + nte);
            this.userService.install("token", this.cypherService.encrypt(JSON.stringify(dtk)), false);
        }
    }

    private validateToken() {
        let tk = this.getAccessToken();
        let dtk: any = JSON.parse(this.cypherService.decrypt(tk));
        let ct = Date.now();
        let r = ct >= dtk.tc && ct <= dtk.te;
        let csid = onNullOrUndefined(this.userService.get("sid"), "N/A");
        let vsid = dtk.sid == csid;
        this.activeToken = r && vsid;
    }

    public observeToken() {
        let id = setInterval(() => {
            let te = new Date().toISOString().replace('T', ' ').substring(0, 19);
            printLog("Revisando Token a las " + te);
            this.validateToken();
            if (!this.activeToken) {
                printLog("Token caducado, activando mensaje de cierre de sesión");
                this.adminService.openSessionEndDialog();
                clearInterval(id);
            } else {
                printLog("Token activo");
            }
        }, 1000 * 60);
    }

}