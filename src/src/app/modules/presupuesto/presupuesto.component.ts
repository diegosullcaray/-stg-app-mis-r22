import * as moment from 'moment';
import { OnDestroy, OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { ModSysAdminService } from "app/core/data/remote/instances/mod-sys-admin.service";
import { LayoutService } from "app/system/admin/services/layout.service";
import { IMenuItem, NavigationService } from "app/system/admin/services/navigation.service";
import { UserService } from "app/system/admin/services/user.service";
import { Subscription } from "rxjs";
import { ModAppService } from 'app/core/data/remote/instances/mod-app-service';
import { isNullOrUndefined } from 'app/core/shared/functions.util';


@Component({
    selector: 'app-presupuesto',
    templateUrl: './presupuesto.component.html',
    styleUrls: ['./presupuesto.component.scss']
})
export class PresupuestoComponent implements OnInit, OnDestroy {
    openExplorerDesk: boolean;
    openExplorerMob: boolean;
    menuItems: IMenuItem[];
    menuItems2: IMenuItem[];
    activeGes:boolean;

    private menuItemsSub: Subscription;

    

    constructor(
        private nav: NavigationService, 
        public layout: LayoutService,
        private antApp: ModAppService,
        public user: UserService
    ) { }

    ngOnInit(): void {
        //this.openExplorer=this.layout.isMobile?false:true;
        this.openExplorerDesk = true;
        this.openExplorerMob = false;

        this.menuItemsSub = this.nav.menuItems$.subscribe(items => {
            let b: any = items.filter(e => e.cod === 'A_MOD_PRES')[0];
            //this.menuItems = b.sub;
            let lin = b.sub[0];
            let ges = b.sub[1];
            this.menuItems = lin.sub;
            console.log(lin)
            console.log(this.menuItems)
            if(!isNullOrUndefined(ges)){
                this.activeGes=true;
                this.menuItems2 = ges.sub;
            }
        });
    }

    ngOnDestroy(): void {
        if (this.menuItemsSub) {
            this.menuItemsSub.unsubscribe();
        }
    }


    selectSec(evt) {
        if (this.layout.isMobile) {
            this.openExplorerMob = false;
        }
    }

    toggleExplorer() {
        if (!this.layout.isMobile) {
            this.openExplorerDesk = !this.openExplorerDesk;
        } else {
            this.openExplorerMob = !this.openExplorerMob;
        }

    }

    calcWidth(): string {
        return this.layout.isMobile ? "width: 100%;" : "width: 300px";
    }
}