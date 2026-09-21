import {
  Directive,
  OnInit,
  OnDestroy,
  HostBinding,
  Input,
  HostListener
} from "@angular/core";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { MatSidenav } from "@angular/material/sidenav";
import { MediaObserver } from "@angular/flex-layout";
import { AdminSidenavHelperService } from "./admin-sidenav-helper.service";
import { MatchMediaService } from "app/core/screen/services/match-media.service";

@Directive({
  selector: "[adminSidenavHelper]"
})
export class AdminSidenavHelperDirective implements OnInit, OnDestroy {
  @HostBinding("class.is-open")
  isOpen: boolean;

  @Input("adminSidenavHelper")
  id: string;

  @Input("isOpen")
  isOpenBreakpoint: string;

  private unsubscribeAll: Subject<any>;

  constructor(
    private matchMediaService: MatchMediaService,
    private adminSidenavHelperService: AdminSidenavHelperService,
    private matSidenav: MatSidenav,
    private mediaObserver: MediaObserver
  ) {
    // Set the default value
    this.isOpen = true;

    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.adminSidenavHelperService.setSidenav(this.id, this.matSidenav);

    if (this.mediaObserver.isActive(this.isOpenBreakpoint)) {
      this.isOpen = true;
      this.matSidenav.mode = "side";
      this.matSidenav.toggle(true);
    } else {
      this.isOpen = false;
      this.matSidenav.mode = "over";
      this.matSidenav.toggle(false);
    }

    this.matchMediaService.onMediaChange
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        if (this.mediaObserver.isActive(this.isOpenBreakpoint)) {
          this.isOpen = true;
          this.matSidenav.mode = "side";
          this.matSidenav.toggle(true);
        } else {
          this.isOpen = false;
          this.matSidenav.mode = "over";
          this.matSidenav.toggle(false);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }
}

@Directive({
  selector: "[adminSidenavToggler]"
})
export class AdminSidenavTogglerDirective {
  @Input("adminSidenavToggler")
  public id: any;

  constructor(private adminSidenavHelperService: AdminSidenavHelperService) {}

  @HostListener("click")
  onClick() {
    // console.log(this.egretSidenavHelperService.getSidenav(this.id))
    this.adminSidenavHelperService.getSidenav(this.id).toggle();
  }
}
