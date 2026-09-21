import { Component, OnInit } from '@angular/core';
import { Incentivos3Service } from '../compartido/servicios/incentivos3.service';

@Component({
  selector: 'app-selector-jer-incentivos3',
  templateUrl: './selector-jer.component.html',
  styleUrls: ['./selector-jer.component.scss']
})
export class SelectorJerComponent implements OnInit {
  closable=false;
  show_me=false;
  lvl_hier=0;

  btns=[{lbl:'Unidades',tcl:18},{lbl:'Corredores',tcl:19},{lbl:'Territorios',tcl:20}];

  constructor(private inc3:Incentivos3Service) { }

  ngOnInit() {
    this.closable=!this.inc3.firstLoad;
    this.show_me = this.inc3.showMe;
    this.lvl_hier = this.inc3.lvlHier;
  }

  openAse(){
    this.inc3.openSelectAse();
  }

  openFinan1(){
    this.inc3.openFC1();
  }

  openFinan2(){
    this.inc3.openFC2();
  }

  openFromHier(tcl:number){
    this.inc3.openSelectFromHier(tcl);
  }

  changeToMe(){
    this.inc3.changeDsToMe();
  }

  close(){
    this.inc3.closeSelectorJer();
  }
}
