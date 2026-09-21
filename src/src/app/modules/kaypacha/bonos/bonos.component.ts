import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bonos-kaypacha',
  templateUrl: './bonos.component.html',
  styleUrls: ['./bonos.component.scss']
})
export class BonosKaypachaComponent implements OnInit {
  @Input() config:any;

  constructor() { }

  ngOnInit(): void {
  }

}
