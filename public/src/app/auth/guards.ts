import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {inject} from "@angular/core";

export const appGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const authSvc = inject(AuthService);
  console.log(authSvc.isLoggedIn());
  return authSvc.isLoggedIn();
};
