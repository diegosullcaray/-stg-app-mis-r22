import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Incentivos2Service } from '../compartido/servicio/incentivos2.service';
import { ModIncentivos2Service } from '../compartido/servicio/mod-incentivos2.service';
import { CalculadoraBaseComponent } from './calculadora-base.component';

@Component({
  selector: 'app-calculadora-incentivos2',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraComponent extends CalculadoraBaseComponent implements OnInit {

  constructor(
    public antService: ModIncentivos2Service, public incentivos: Incentivos2Service,
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
