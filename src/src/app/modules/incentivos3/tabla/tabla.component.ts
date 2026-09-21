import { Component, OnInit } from '@angular/core';
import { Incentivos3Service } from '../compartido/servicios/incentivos3.service';

@Component({
  selector: 'app-tabla-incentivos3',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {
  config:any;

  constructor(private inc3:Incentivos3Service) { }

  ngOnInit() {
    this.config = this.inc3.tabla;
  }

}
