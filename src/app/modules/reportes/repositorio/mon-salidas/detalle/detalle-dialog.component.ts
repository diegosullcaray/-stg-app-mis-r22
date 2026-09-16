import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DetalleBaseComponent } from './detalle-base.component';
import { MonSalidasService } from '../compartido/servicios/mon-salidas.service';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { MonSalidasAntService } from '../compartido/servicios/mon-salidas-ant.service';
import { LayoutService } from 'app/system/admin/services/layout.service';


@Component({
  selector: 'app-rep2-detalle-dialog-mon-salidas',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleDialogComponent extends DetalleBaseComponent implements OnInit {
  contentTemplate: TemplateRef<any>;

  constructor(
    public sali: MonSalidasService,
    public ant: MonSalidasAntService,
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
