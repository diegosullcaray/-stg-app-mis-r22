import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from 'app/system/admin/services/layout.service';
import { CalculadoraDialogComponent } from '../calculadora/calculadora-dialog.component';
import { ClientesDialogComponent } from '../clientes/clientes-dialog.component';
import { Incentivos2Service } from '../compartido/servicio/incentivos2.service';

@Component({
  selector: 'app-monetizacion-incentivos2',
  templateUrl: './monetizacion.component.html',
  styleUrls: ['./monetizacion.component.scss', '../incentivos2-util.component.scss']
})
export class MonetizacionComponent implements OnInit {
  @Input() config: any;

  constructor(public layout: LayoutService, private activatedRoute: ActivatedRoute, private router: Router, 
    public incentivos :Incentivos2Service,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  showCalculator() {
    if (this.layout.isMobile) {
      this.router.navigate(['./calculadora'], { relativeTo: this.activatedRoute,skipLocationChange: true  });
    } else {
      this.dialogCalc();
    }
  }

  showCliDetail(){
    if (this.layout.isMobile) {
      this.router.navigate(['./clientes'], { relativeTo: this.activatedRoute,skipLocationChange: true  });
    } else {
      this.dialogCli();
    }
  }

  totMonCls(){
    if(this.config.state==1){
      return "text-2 state-1"
    }else if(this.config.state==0){
      return "text-2 state-2";
    }
    return "text-2 state-3";
  }

  bspCls(){
    if(this.config.super_plus<0){
      return "text-2 state-2"
    }
    else{
      return "text-2";
    }
  }

  openSelector(){
    this.incentivos.openSecSelector(false);
  }

  private dialogCli():void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width='450px';
    dialogConfig.height='520px';
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(ClientesDialogComponent, dialogConfig);
  }

  private dialogCalc(): void {
    const dialogConfig = new MatDialogConfig();
    /*dialogConfig.data = {

    };*/
    dialogConfig.width='450px';
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(CalculadoraDialogComponent, dialogConfig);
    /*dialogRef.afterClosed().subscribe(v => {
      if (v) {
          this.getServerData(v.cod_bt);
      }
    });*/
  }

}
