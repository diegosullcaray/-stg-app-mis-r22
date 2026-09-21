import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'app/system/admin/services/layout.service';
import { IMenuItem, NavigationService } from 'app/system/admin/services/navigation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss']
})
export class AdministracionComponent implements OnInit,OnDestroy {
  menuItems: IMenuItem[];
  private sub:Subscription;

  constructor(private nav: NavigationService, public layout: LayoutService,public router:Router) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.nav.menuItems$.subscribe(items => {
      let b: any = items.filter(e => e.cod === 'A_MOD_SYS_ADMIN')[0];
      this.menuItems = b.sub;
    });
  }

  openSec(state:string){
    this.router.navigateByUrl(state);
  }

}
