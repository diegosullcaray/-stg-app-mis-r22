import { Component, OnInit, Input, OnDestroy, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from 'app/system/admin/services/layout.service';
import { ThemeService } from 'app/system/admin/services/theme.service';
import { UserService } from '../../services/user.service';
import { AuthService } from 'app/system/session/authentication/auth.service';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { LoginService } from 'app/system/session/views/login/login.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls:['./header-top.component.scss']
})
export class HeaderTopComponent implements OnInit, OnDestroy {
  layoutConf: any;
  menuItems: any;
  menuItemSub: Subscription;
  egretThemes: any[] = [];
  currentLang = 'en';
  availableLangs = [{
    name: 'English',
    code: 'en',
  }, {
    name: 'Spanish',
    code: 'es',
  }]
  @Input() notificPanel;
  constructor(
    public layout: LayoutService,
    public login: LoginService,
    public themeService: ThemeService,
    public user: UserService,
    public auth: AuthService,
    public router:Router,
    public admin:AdminService
    //public translate: TranslateService,
    //private renderer: Renderer2,
    //public jwtAuth: JwtAuthService
  ) { }

  showDesktop(){
    this.router.navigateByUrl(environment.homePage);
  }

  ngOnInit() {
    this.layoutConf = this.layout.layoutConf;
    this.egretThemes = this.themeService.themes;
  }
  ngOnDestroy() {
    if(this.menuItemSub){
      this.menuItemSub.unsubscribe()
    }
    
  }
  setLang() {
    //this.translate.use(this.currentLang)
  }
  changeTheme(theme) {
    this.layout.publishLayoutChange({ matTheme: theme.name })
  }
  toggleNotific() {
    this.notificPanel.toggle();
  }
  toggleSidenav() {
    if (this.layoutConf.isMobile) {
      if (this.layoutConf.sidebarStyle === 'closed') {
        return this.layout.publishLayoutChange({
          sidebarStyle: 'full'
        })
      }
      this.layout.publishLayoutChange({
        sidebarStyle: 'closed'
      })
    }
  }
}
