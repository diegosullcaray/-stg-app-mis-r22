import { OnDestroy, OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { LayoutService } from "app/system/admin/services/layout.service";
import { IMenuItem, NavigationService } from "app/system/admin/services/navigation.service";
import { Subscription } from "rxjs";


@Component({
    selector: 'app-rep01',
    templateUrl: './rep01.component.html',
    styleUrls: ['./rep01.component.scss']
})
export class Rep01Component implements OnInit, OnDestroy {
    openExplorerDesk: boolean;
    openExplorerMob: boolean;
    menuItems: IMenuItem[];

    private menuItemsSub: Subscription;

    constructor(private nav: NavigationService, public layout: LayoutService) { }

    ngOnDestroy(): void {
        if (this.menuItemsSub) {
            this.menuItemsSub.unsubscribe();
        }
    }

    ngOnInit(): void {
        //this.openExplorer=this.layout.isMobile?false:true;
        this.openExplorerDesk = true;
        this.openExplorerMob = false;
        this.menuItemsSub = this.nav.menuItems$.subscribe(items => {
            let b: any = items.filter(e => e.cod === 'A_MOD_RCOM')[0];
            this.menuItems = b.sub;
        });
    }

    hideExplorer(evt) {
        if (evt) {
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