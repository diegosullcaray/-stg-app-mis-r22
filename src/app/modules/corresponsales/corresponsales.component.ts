import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModAppService } from 'app/core/data/remote/instances/mod-app-service';
import { LayoutService } from 'app/system/admin/services/layout.service';
import { IMenuItem, NavigationService } from 'app/system/admin/services/navigation.service';
import { UserService } from 'app/system/admin/services/user.service';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'app/core/shared/functions.util';

@Component({
    selector: 'app-corresponsales',
    templateUrl: './corresponsales.component.html', 
    styleUrls: ['./corresponsales.component.scss']
})
export class CorresponsalesComponent implements OnInit, OnDestroy {
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
            let b: any = items.filter(e => e.cod === 'A_MOD_CORRE')[0];
            //this.menuItems = b.sub;
            let lin = b.sub[0];
            this.menuItems = lin.sub; 
            
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