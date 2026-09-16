import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { LayoutService } from 'app/system/admin/services/layout.service';
import { UserService } from 'app/system/admin/services/user.service';
import { CalculadoraDialogComponent } from '../calculadora/calculadora-dialog.component';
import { IncentivosAService } from '../compartido/servicios/incentivos-a.service';

@Component({
  selector: 'app-cabecera-incentivos-a',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit {
  @Input() config: any;

  constructor(
    public user: UserService,
    public layout: LayoutService,
    private incentivosA: IncentivosAService,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  showCliDetail() {

  }

  returnUser(){
    this.incentivosA.returnUser();
  }

  showCalculator() {
    if (this.layout.isMobile) {
      this.router.navigate(['./calculadora'], { relativeTo: this.activatedRoute,skipLocationChange: true  });
    } else {
      this.dialogCalc();
    }
  }

  showSecList() {

  }

  openSelector() {
    this.incentivosA.showPicker(true);
  }

  private dialogCalc(): void {
    const dialogConfig = new MatDialogConfig();
    /*dialogConfig.data = {

    };*/
    dialogConfig.width='450px';
    dialogConfig.height='600px'
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(CalculadoraDialogComponent, dialogConfig);
    /*dialogRef.afterClosed().subscribe(v => {
      if (v) {
          this.getServerData(v.cod_bt);
      }
    });*/
  }

}
