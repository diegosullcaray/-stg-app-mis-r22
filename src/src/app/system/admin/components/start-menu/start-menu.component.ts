import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationService } from "app/system/admin/services/navigation.service";
import { AuthService } from "app/system/session/authentication/auth.service";
import { LoginService } from "app/system/session/views/login/login.service";
import { Subscription } from "rxjs";
import { AdminService } from "../../services/admin.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-start-menu',
  templateUrl: './start-menu.component.html',
  styleUrls: ['./start-menu.component.scss']
})
export class StartMenuComponent implements OnInit,OnDestroy {
  public menuItems: any[];

  private menuItemsSub: Subscription;

  constructor(
    public user: UserService,
    private navService: NavigationService,
    public auth: AuthService,
    public admin: AdminService,
    public login:LoginService
  ) { }

  ngOnDestroy(): void {
    if( this.menuItemsSub ) {
      this.menuItemsSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.menuItemsSub = this.navService.menuItems$.subscribe(items => {
      this.menuItems = items;
    });
    /*this.menuItemSub = this.navService.menuItems$
      .subscribe(res => {
        res = res.filter(item => item.type !== 'icon' && item.type !== 'separator');
        let limit = 4
        let mainItems: any[] = res.slice(0, limit)
        if (res.length <= limit) {
          return this.menuItems = mainItems
        }
        let subItems: any[] = res.slice(limit, res.length - 1)
        mainItems.push({
          name: 'More',
          type: 'dropDown',
          tooltip: 'More',
          icon: 'more_horiz',
          sub: subItems
        })
        return this.menuItems = mainItems
      })*/
  }

}