import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@lotto-front/auth';
@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) {}

  canLoad(route: Route): boolean {
    const url = route.path;
    if (this.authService.isUserLoggedIn()) {
      console.log(this.authService.isUserLoggedIn())
      return true;
    }

    this.authService.setRedirectUrl(url);
    this.router.navigate([ this.authService.getLoginUrl() ]);
    return false;
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
