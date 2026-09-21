import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStoreService } from "app/core/data/local/local-store.service";
import { ModSysAdminService } from "app/core/data/remote/instances/mod-sys-admin.service";
import { ModSysLoginService } from "app/core/data/remote/instances/mod-sys-login.service";
import { IWinderResponse } from "app/core/data/remote/winder/winder.interface";
import { StgAppLoaderService } from "app/core/screen/components/stg-app-loader/stg-app-loader.service";
import { printLog } from "app/core/shared/debug.util";
import { NavigationService } from "app/system/admin/services/navigation.service";
import { UserService } from "app/system/admin/services/user.service";
import { system_keys } from "app/system/system-keys.config";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { AuthService } from "../../authentication/auth.service";
import { TokenService } from "app/core/shared/token.service";

@Injectable()
export class LoginService {
    constructor(
        private authService: AuthService,
        private loginService: ModSysLoginService,
        private adminService: ModSysAdminService,
        private store: LocalStoreService,
        private router: Router,
        private userService: UserService,
        private navService: NavigationService,
        private loader: StgAppLoaderService,
        private tokenService: TokenService
    ) { }

    private login(br: any, alt: boolean) {
        this.userService.initBasics(br, alt);
        let lcall: Observable<IWinderResponse>;
        if (alt) {
            lcall = this.loginService.alt_login(this.userService.email);
        } else {
            lcall = this.loginService.login(this.userService.email);
        }
        if (alt) {
            this.loader.open();
        }
        if(!alt && environment.production){
            let meta = {
                pic_url: br.picture
            }
            this.loginService.postMeta(br.email,meta).subscribe();
        }
        lcall.subscribe(res_l => {
            var br: any = res_l.body;
            let lr = br.login_response;
            this.processLogin(lr, alt);
            this.adminService.getMenuItems(this.userService.email).subscribe(res_m => {
                var br: any = res_m.body;
                let mr = br.menu_response;
                this.processMenu(mr, alt);
                if (alt) {
                    this.loader.close();
                }
            });
        });

    }

    onOriLogin() {
        this.loader.open();
        setTimeout(() => {
            this.userService.original();
            this.navService.original();
            this.loader.close();
        }, 1000);

    }

    onAltLogin(e: string, n: string) {
        let resp = {
            name: n,
            email: e,
            pictureURL: ''
        }
        this.login(resp, true);
    }

    onLogin() {
        this.login(this.authService.bodyAuthResponse, false);
        this.tokenService.observeToken();
    }

    private processLogin(lr: any, alt: boolean) {
        this.userService.install("profile", lr.profile, alt);
        this.userService.install("alternates", lr.alternates, alt);
        if(!alt){
            this.userService.install("token", lr.token, alt);
            this.userService.install("sid", lr.sid, alt);
            this.store.setItem(system_keys.session_id,lr.sid);
            printLog("Server Session ID: "+lr.sid);
        }
    }

    private processMenu(mr: any, alt: boolean) {
        this.navService.initMenu(mr, alt);
        this.router.navigateByUrl(environment.homePage);
    }


}