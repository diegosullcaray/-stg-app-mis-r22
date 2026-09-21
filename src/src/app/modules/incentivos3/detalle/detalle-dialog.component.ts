import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DetalleBaseComponent } from './detalle-base.component';
import { Incentivos3Service } from '../compartido/servicios/incentivos3.service';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { ModIncentivos3Service } from '../compartido/servicios/mod-incentivos3.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { LayoutService } from 'app/system/admin/services/layout.service';

@Component({
  selector: 'app-detalle-dialog-incentivos3',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
  // animations: [
  //   trigger('cardTrigger', [
  //     transition(':enter', [
  //       style({ opacity: 0, transform: 'translateX(100%)' }),
  //       animate(300)
  //     ]),
  //     transition(':leave', [
  //       animate(300, style({ opacity: 0, transform: 'translateX(-100%)' }))
  //     ])
  //   ])
  // ]
})
export class DetalleDialogComponent extends DetalleBaseComponent implements OnInit {

  constructor(
    public inc3: Incentivos3Service,
    public loader:StgAppLoaderService,
    public ant:ModIncentivos3Service,
    private dialogRef: MatDialogRef<DetalleDialogComponent>) {
    super(inc3,loader,ant);
  }

  ngOnInit(): void {
    this.init();
  }

  navMain() {
    this.dialogRef.close();
  }

}
