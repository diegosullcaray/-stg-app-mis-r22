import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleBaseComponent } from './detalle-base.component'; 
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { LayoutService } from 'app/system/admin/services/layout.service';
import { ModRepService } from 'app/modules/reportes/compartido/servicios/mod-rep.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-detalle-usabilidad',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
 
})
export class DetalleComponent extends DetalleBaseComponent implements OnInit {
  @ViewChild(TemplateRef, { static: true }) templateRef: TemplateRef<any>;

  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public antRep: ModRepService,
    public loader: StgAppLoaderService,
    public layout: LayoutService,
    public dialog: MatDialog,
    private router: Router, private activatedRoute: ActivatedRoute) {
      super(antRep,loader,layout); 
     
  }

  ngOnInit(): void {
    //this.init();
  }

  navMain() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute, skipLocationChange: true });
  }
   
}

