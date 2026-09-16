import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { RoutePartsService } from './core/screen/services/route-parts.service';
import { UILibIconService } from './core/screen/services/ui-lib-icon.service';
import { filter } from 'rxjs/operators';
import { LayoutService } from './system/admin/services/layout.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  appTitle = 'MIS';
  pageTitle = '';

  private highchartsLocalLangOptions = {
    lang: {
        months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        weekdays: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
        shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        resetZoom: "<b>Restablecer Zoom</b>",
        resetZoomTitle: "restablece el nivel de zoom 1:1",
        thousandsSep: ','
    }
};

  constructor(
    public title: Title,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private routePartsService: RoutePartsService,
    private layoutService: LayoutService,
    private iconService: UILibIconService
  ) {
    Highcharts.setOptions(this.highchartsLocalLangOptions);
    this.iconService.init()
  }

  ngOnInit() {
    this.changePageTitle();
  }
  ngAfterViewInit() {
    this.layoutService.applyMatTheme();
  }

  changePageTitle() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((routeChange) => {
      const routeParts = this.routePartsService.generateRouteParts(this.activeRoute.snapshot);
      if (!routeParts.length) {
        return this.title.setTitle(this.appTitle);
      }
      // Extract title from parts;
      this.pageTitle = routeParts
                      .reverse()
                      .map((part) => part.title )
                      .reduce((partA, partI) => {return `${partA} > ${partI}`});
      this.pageTitle += ` | ${this.appTitle}`;
      this.title.setTitle(this.pageTitle);
    });
  }
}
