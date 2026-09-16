import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DetalleBaseComponent } from './detalle-base.component';
import { MonImrService } from '../compartido/servicios/mon-imr.service';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { MonImrAntService } from '../compartido/servicios/mon-imr-ant.service';
import { LayoutService } from 'app/system/admin/services/layout.service';


@Component({
  selector: 'app-rep2-detalle-dialog-mon-imr',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleDialogComponent extends DetalleBaseComponent implements OnInit {
  contentTemplate: TemplateRef<any>;

  constructor(
    public sali: MonImrService,
    public ant: MonImrAntService,
    public loader: StgAppLoaderService,
    private dialogRef: MatDialogRef<DetalleDialogComponent>,
    public layout: LayoutService,
    public dialog: MatDialog) {
      super(sali,loader,layout);
  }

  ngOnInit(): void {
    this.init();
  }

  navMain() {
    this.dialogRef.close();
  }

}
