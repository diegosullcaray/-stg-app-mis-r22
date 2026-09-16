import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { printLog, printWarn } from 'app/core/shared/debug.util';
import { environment } from 'environments/environment';
import { AuthService } from '../../session/authentication/auth.service';
import { UserService } from '../services/user.service';
import { NavigationService } from '../services/navigation.service';

@Injectable()
export class RouteGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private navService: NavigationService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    let v = this.navService.routesArray.includes(state.url);
    let o: Observable<boolean>;
    o =  of(v) ;
    return o.pipe(tap(x => {
      printWarn('You tried to go to ' + state.url + ' and Router guard said ' + x);
      if (!x) {
        this.router.navigateByUrl(environment.homePage);
      }
    }));
  }
}
