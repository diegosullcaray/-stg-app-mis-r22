import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IncentivosAService } from '../compartido/servicios/incentivos-a.service';
import { ModIncentivosAService } from '../compartido/servicios/mod-incentivos-a.service';
import { CalculadoraBaseComponent } from './calculadora-base.component';

@Component({
  selector: 'app-calculadora-dialog-incentivos2',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraDialogComponent extends CalculadoraBaseComponent implements OnInit {

  constructor(
    public antService: ModIncentivosAService, public incentivos: IncentivosAService,
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
