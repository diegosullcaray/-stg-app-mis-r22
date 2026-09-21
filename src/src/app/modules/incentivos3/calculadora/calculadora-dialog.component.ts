import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CalculadoraBaseComponent } from './calculadora-base.component';
import { Incentivos3Service } from '../compartido/servicios/incentivos3.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-calculadora-dialog-incentivos3',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraDialogComponent extends CalculadoraBaseComponent implements OnInit {

  constructor(
    public inc3: Incentivos3Service,
    private dialogRef: MatDialogRef<CalculadoraDialogComponent>,public formBuilder:FormBuilder) {
    super(inc3,formBuilder);
  }

  ngOnInit(): void {
    this.init();
  }

  navMain() {
    this.dialogRef.close();
  }

}
