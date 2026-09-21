import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Incentivos2Service } from '../compartido/servicio/incentivos2.service';
import { ModIncentivos2Service } from '../compartido/servicio/mod-incentivos2.service';
import { ClientesBaseComponent } from './clientes-base.component';

@Component({
  selector: 'app-clientes-incentivos2',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss', '../incentivos2-util.component.scss']
})
export class ClientesComponent extends ClientesBaseComponent implements OnInit {

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
