import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { printLog, printWarn } from 'app/core/shared/debug.util';
import { environment } from 'environments/environment';
import { AuthService } from '../../session/authentication/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    printLog("is loged",this.authService.isLoged);
    if(this.authService.isLoged){
      return of(true);
    }else{
      return of(false).pipe(tap(x => this.router.navigateByUrl(environment.rootPage)));;
    }
  }
}
