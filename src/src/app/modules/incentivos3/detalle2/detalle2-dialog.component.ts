import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Incentivos3Service } from '../compartido/servicios/incentivos3.service';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { ModIncentivos3Service } from '../compartido/servicios/mod-incentivos3.service';
import { Detalle2BaseComponent } from './detalle2-base.component';

@Component({
  selector: 'app-detalle2-dialog-incentivos3',
  templateUrl: './detalle2.component.html',
  styleUrls: ['./detalle2.component.scss']
})
export class Detalle2DialogComponent extends Detalle2BaseComponent implements OnInit {

  constructor(
    public inc3: Incentivos3Service,
    public loader:StgAppLoaderService,
    public ant:ModIncentivos3Service,
    private dialogRef: MatDialogRef<Detalle2DialogComponent>) {
    super(inc3,loader,ant);
  }

  ngOnInit(): void {
    this.init();
  }

  navMain() {
    this.dialogRef.close();
  }

}
