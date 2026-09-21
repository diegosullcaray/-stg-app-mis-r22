import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocalStoreService } from 'app/core/data/local/local-store.service';
import { printWarn } from 'app/core/shared/debug.util';
import { environment } from 'environments/environment';
import { system_keys } from '../../system-keys.config';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private storage: LocalStoreService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    let a = this.storage.getItem(system_keys.act_lp);
    let o: Observable<boolean>;
    o = a ? of(true) : of(false);
    return o.pipe(tap(x => {
      printWarn('You tried to go to ' + state.url + ' and login guard said ' + x);
      if (!x) {
        this.router.navigateByUrl(environment.rootPage);
      }
    }));
  }
}
