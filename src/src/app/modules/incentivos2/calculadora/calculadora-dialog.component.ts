import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Incentivos2Service } from '../compartido/servicio/incentivos2.service';
import { ModIncentivos2Service } from '../compartido/servicio/mod-incentivos2.service';
import { CalculadoraBaseComponent } from './calculadora-base.component';

@Component({
  selector: 'app-calculadora-dialog-incentivos2',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraDialogComponent extends CalculadoraBaseComponent implements OnInit {

  constructor(
    public antService: ModIncentivos2Service, public incentivos: Incentivos2Service,
    private dialogRef: MatDialogRef<CalculadoraDialogComponent>) {
    super(antService, incentivos);
  }

  ngOnInit(): void {
    this.init();
  }

  navMain() {
    this.dialogRef.close();
  }

}
