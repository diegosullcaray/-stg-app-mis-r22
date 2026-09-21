import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalculadoraBaseComponent } from './calculadora-base.component';
import { Incentivos3Service } from '../compartido/servicios/incentivos3.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-calculadora-incentivos3',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraComponent extends CalculadoraBaseComponent implements OnInit {

  constructor(
    public inc3: Incentivos3Service,
    private router: Router, private activatedRoute: ActivatedRoute,public formBuilder:FormBuilder) {
    super(inc3,formBuilder);
  }

  ngOnInit(): void {
    this.init();
  }

  navMain() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute, skipLocationChange: true });
  }
}

