import { AfterViewInit, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { LayoutService } from "../../services/layout.service";
import { IShortcut, NavigationService } from "../../services/navigation.service";

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit, AfterViewInit, OnDestroy {
  //@ViewChild('desktop') me: ElementRef;
  public shortcuts: IShortcut[];
  public maxDist: number;
  public maxDistM: number;
  public sizeDist: number;
  public sizeDistM: number;
  public dirDist: string;

  private shortcutsSub: Subscription;

  constructor(private nav: NavigationService, public layout: LayoutService, private router: Router) {
  }

  ngOnDestroy(): void {
    if (this.shortcutsSub) {
      this.shortcutsSub.unsubscribe();
    }
  }

  public counter(a) {
    return new Array<number>(a);
  }

  public item(a, b) {
    let x = (this.layout.isMobile ? this.maxDistM : this.maxDist) * a + b;
    return this.shortcuts[x];
  }

  public run(a) {
    if(a.type==1){
      this.router.navigateByUrl(a.state);
    }else if(a.type==2){
      window.open(a.state, "_blank");
    }
  }

  public mainLayout() {
    return !this.layout.isMobile && this.dirDist === 'down' ? 'row' : 'column';
  }

  public blockLayout() {
    return !this.layout.isMobile && this.dirDist === 'down' ? 'column' : 'row';
  }

  /*@HostListener('window:resize', ['$event'])
  onResize(event) {
    this.layout.adjustLayout(event);
  }*/

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.shortcutsSub = this.nav.shortcutItems$.subscribe(items => {
      this.shortcuts = items;
      let l = this.shortcuts.length;
      this.dirDist = "down";
      this.maxDist = 9;
      this.maxDistM = 3;
      this.sizeDist = Math.ceil(l / this.maxDist);
      this.sizeDistM = Math.ceil(l / this.maxDistM);
    });
  }
}