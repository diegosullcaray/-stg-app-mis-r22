import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncentivosAService } from '../compartido/servicios/incentivos-a.service';
import { ModIncentivosAService } from '../compartido/servicios/mod-incentivos-a.service';
import { CalculadoraBaseComponent } from './calculadora-base.component';

@Component({
  selector: 'app-calculadora-incentivos-a',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraComponent extends CalculadoraBaseComponent implements OnInit {

  constructor(
    public antService: ModIncentivosAService, public incentivos: IncentivosAService,
    private router: Router, private activatedRoute: ActivatedRoute) { 
    super(antService,incentivos);
  }

  ngOnInit(): void {
    this.init();
  }

  navMain() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute, skipLocationChange: true });
  }
}
