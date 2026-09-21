import { Component, OnInit } from '@angular/core';
import { Incentivos3Service } from '../compartido/servicios/incentivos3.service';
import { LayoutService } from 'app/system/admin/services/layout.service';

@Component({
  selector: 'app-perfil-incentivos3', 
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  config:any;

  constructor(private inc3: Incentivos3Service,public layout: LayoutService) { }

  ngOnInit() {
    this.config = this.inc3.perfil;
  }


  chooser(){
    this.inc3.showChooser();
  }

  getIconCls(val:number){
    if(val==0){
      return "material-icons is dm";
    }else if(val==1){
      return "material-icons is am";
    }else{
      return "material-icons is nm";
    }
  }

  getDesCls(val:number){
    if(val==0){
      return "ds dm";
    }else if(val==1){
      return "ds am";
    }else{
      return "ds nm";
    }
  }
}
