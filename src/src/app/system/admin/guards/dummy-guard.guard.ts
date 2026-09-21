import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { printLog, printWarn } from 'app/core/shared/debug.util';
import { environment } from 'environments/environment';
import { AuthService } from '../../session/authentication/auth.service';
import { UserService } from '../services/user.service';

@Injectable()
export class DummyGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    let p = this.userService.get('profile');
    let o: Observable<boolean>;
    o = p.tip_use==0 || this.userService.email=='victor.blas@confianza.pe' || this.userService.email=='giovanni.calderon@confianza.pe' ? of(true) : of(false);
    return o.pipe(tap(x => {
      printWarn('You tried to go to ' + state.url + ' and dummy guard said ' + x);
      if (!x) {
        this.router.navigateByUrl(environment.rootPage);
      }
    }));
  }
}
