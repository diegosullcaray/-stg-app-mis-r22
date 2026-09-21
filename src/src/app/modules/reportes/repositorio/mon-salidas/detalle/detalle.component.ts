import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleBaseComponent } from './detalle-base.component';
import { MonSalidasService } from '../compartido/servicios/mon-salidas.service';
import { MonSalidasAntService } from '../compartido/servicios/mon-salidas-ant.service';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { MatDialog } from '@angular/material/dialog';
import { LayoutService } from 'app/system/admin/services/layout.service';


@Component({
  selector: 'app-rep2-detalle-mon-salidas',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent extends DetalleBaseComponent implements OnInit {

  @ViewChild(TemplateRef, { static: true }) templateRef: TemplateRef<any>;

  constructor(
    public sali: MonSalidasService,
    public ant: MonSalidasAntService,
    public loader: StgAppLoaderService,
    public layout: LayoutService,
    private router: Router, private activatedRoute: ActivatedRoute,
    public dialog: MatDialog) {
    super(sali,loader,layout);
  }

  ngOnInit(): void {
    this.init();
  }

  navMain() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute, skipLocationChange: true });
  }
}

