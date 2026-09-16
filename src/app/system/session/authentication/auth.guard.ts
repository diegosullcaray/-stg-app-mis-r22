import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { printWarn } from 'app/core/shared/debug.util';
import { environment } from 'environments/environment';

import { AuthService } from './auth.service';
import { TokenService } from 'app/core/shared/token.service';
import { AdminService } from 'app/system/admin/services/admin.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService,
    private adminService: AdminService
  ) { }


  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.obs().pipe(tap(x => {
      printWarn('Estas intentando acceder a ' + state.url + ' y Auth guard responde ' + x);
      if (!x) {
        this.router.navigateByUrl(environment.rootPage);
      }
    }));
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return this.obs().pipe(tap(x => {
      printWarn('Estas intentando acceder a ' + state.url + ' y Auth guard responde ' + x);
      if (!x) {
        this.router.navigateByUrl(environment.rootPage);
      }
    }));
  }

  private obs() {
    if (this.authService.isLoged) {
      /*let tk = this.tokenService.getAccessToken();
      if (tk) {
        if (!this.tokenService.validateTimeToken()) {
          this.adminService.openSessionEndDialog();
          return of(false);
        }
      }*/
      return of(true);
    }
    return this.authService.canActivateProtectedRoutes$;
  }
}
