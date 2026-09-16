import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from 'app/system/admin/services/layout.service';
import { UserService } from 'app/system/admin/services/user.service';
import { Incentivos2Service } from '../compartido/servicio/incentivos2.service';

@Component({
  selector: 'app-perfil-incentivos2',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss', '../incentivos2-util.component.scss']
})
export class PerfilComponent implements OnInit {
  @Input() config: any;
  showPic:boolean;

  constructor(public user: UserService, public layout: LayoutService, private incentivos2: Incentivos2Service,private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.showPic=false;
    let profile = this.user.get('profile');
    if(profile.cla_use!=0){
      this.showPic=true;
    }
  }

  /*clsAlertM() {
    if (this.config.state) {
      return 'state-1 m';
    }
    return 'state-2 m';
  }*/

  /*alertText1() {
    if (this.config.state) {
      return 'Activo';
    }
    return 'Inactivo';
  }*/

  alertText2() {
    return '' + (2-this.config.vars_s);
  }

  clsVarIcon(i: number) {
    let x = this.config.vars_s[i];
    if (x==1) {
      return 'state-1 r';
    }else if(x==2){
      return 'state-3 r';
    }
    return 'state-2 r';
  }

  ripColor(i: number) {
    let x = this.config.vars_s[i];
    if (x==1) {
      return 'rgba(59, 209, 54, 0.1)';
    }else if(x==2){
      return 'rgba(211, 211, 211, 0.1)';
    }
    return 'rgba(128, 128, 128, 0.1)';
  }

  showVarCard(i: number) {
    if (this.layout.isMobile) {
      this.incentivos2.setCardData(i);
      //this.router.navigateByUrl('variable', { relativeTo: this.activatedRoute,skipLocationChange: true });
      this.router.navigate(['./variable'], {relativeTo: this.activatedRoute,skipLocationChange: true});   
    }
  }
}
