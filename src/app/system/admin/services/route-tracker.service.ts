import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router"
import { ClientService } from "app/core/data/remote/client.service";
import { ModSysAdminService } from "app/core/data/remote/instances/mod-sys-admin.service";
import { printLog } from "app/core/shared/debug.util";
import { environment } from "environments/environment";
import { UserService } from "./user.service";

const exceptions = [
    '/login',
    '/app/desktop'
];

@Injectable({ providedIn: 'root' })
export class RouteTrackerService {
    constructor(
        private router: Router,
        private user: UserService,
        private datePipe: DatePipe,
        private client: ClientService,
        private ant:ModSysAdminService
    ) { }

    init() {
        this.router.events.subscribe(x => {
            if (x instanceof NavigationEnd && (environment.production || environment.devTracing)) {
                this.traceNavigationEnd(x);
            }
        });
    }

    private traceNavigationEnd(evt: NavigationEnd) {
        let ru = evt.url.split('#')[0];
        if (!exceptions.includes(ru)) {
            this.client.getIpFromExtResource().subscribe(x=>{
                //this.client.getPosition().then(y=>{
                    let r = {
                        date: this.datePipe.transform(this.client.currentDateAsNumber, 'dd/MM/yyyy HH:mm:ss'),
                        host: x.ip,
                        email_ori: this.user.oriEmail,
                        email_act: this.user.email,
                        route: evt.url
                    }
                    printLog("Log Route",r);
                    this.ant.postRouteTrack(JSON.stringify(r)).subscribe();
                //});
            });
        }
    }
}