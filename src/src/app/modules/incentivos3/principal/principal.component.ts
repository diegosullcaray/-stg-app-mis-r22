import { Component, OnDestroy, OnInit } from "@angular/core";
import { Incentivos3Service } from "../compartido/servicios/incentivos3.service";
import { LayoutService } from "app/system/admin/services/layout.service";

@Component({
  selector: 'app-principal-incentivos2',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit, OnDestroy {

  config: any;

  ngOnInit(): void {
    this.config = this.inc3.principal;
  }

  ngOnDestroy(): void {
  }

  constructor(private inc3: Incentivos3Service,private layout: LayoutService,) {
  }

  getStyle(){
    if(this.layout.isMobile){
      return {};
    }else{
      return {
        'width': '100%',
        'height': '100%',
        'min-height': '100%',
        'min-width': '100%'
      };
    }
  }
}