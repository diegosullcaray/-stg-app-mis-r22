import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from 'app/system/admin/services/theme.service';
import { NavigationService } from 'app/system/admin/services/navigation.service';
import { RoutePartsService } from 'app/core/screen/services/route-parts.service';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AdminDirectivesModule } from './admin/directives/admin-directives.module';
import { SystemComponentsModule } from './system-components';
import { AuthGuard } from './session/authentication/auth.guard';
import { AdminGuard } from './admin/guards/admin-guard.guard';
import { LoginGuard } from './session/guards/login.guard';
import { ModSysLoginService } from 'app/core/data/remote/instances/mod-sys-login.service';
import { WinderService } from 'app/core/data/remote/winder/winder.service';
import { CypherService } from 'app/core/shared/cypher.service';
import { RESTService } from 'app/core/data/remote/rest/rest.service';
import { ModSysAdminService } from 'app/core/data/remote/instances/mod-sys-admin.service';
import { DummyGuard } from './admin/guards/dummy-guard.guard';
import { RouteGuard } from './admin/guards/route-guard.guard';
import { TokenService } from 'app/core/shared/token.service';

@NgModule({
  imports: [
    CommonModule,
    SystemComponentsModule,
    //SharedPipesModule,
    AdminDirectivesModule,
    OAuthModule.forRoot()
  ],
  providers: [
    AuthGuard,
    LoginGuard,
    AdminGuard,
    RouteGuard,

    DummyGuard,

    ThemeService,
    NavigationService,
    RoutePartsService,

    WinderService,
    CypherService,
    TokenService,
    RESTService,
    ModSysLoginService,
    ModSysAdminService
  ]
})
export class SystemModule { }
