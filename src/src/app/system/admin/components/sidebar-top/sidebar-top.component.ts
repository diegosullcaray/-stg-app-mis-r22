import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { NavigationService } from 'app/system/admin/services/navigation.service';
// import PerfectScrollbar from 'perfect-scrollbar';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-sidebar-top',
  templateUrl: './sidebar-top.component.html'
})
export class SidebarTopComponent implements OnInit, OnDestroy, AfterViewInit {
  // private sidebarPS: PerfectScrollbar;
  public menuItems: any[];
  private menuItemsSub: Subscription;
  constructor(
    private navService: NavigationService
  ) { }

  ngOnInit() {
    this.menuItemsSub = this.navService.menuItems$.subscribe(items => {
      //this.menuItems = menuItem.filter(item => item.type !== 'icon' && item.type !== 'separator');
      this.menuItems = items;
    });
    //this.menuItems=this.navService.menuItems;
  }
  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.sidebarPS = new PerfectScrollbar('#sidebar-top-scroll-area', {
    //     suppressScrollX: true
    //   })
    // })
  }
  ngOnDestroy() {
    // if(this.sidebarPS) {
    //   this.sidebarPS.destroy();
    // }
    if( this.menuItemsSub ) {
      this.menuItemsSub.unsubscribe();
    }
  }

}
