import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { LoadingService } from '../loading.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private headers: HttpHeaders = {} as HttpHeaders;

  constructor(
    private authService: AuthService,
    private _loading: LoadingService
) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this._loading.setLoading(true, req.url);

    if (this.authService.isLoggedIn()) {

      const authReq = req.clone({
        headers: new HttpHeaders({
          'Authorization' : 'Bearer ' + this.authService.authorizationToken
        })
      });
      return next.handle(authReq).pipe(
        tap((response: any) => {
          if (response instanceof HttpResponse) {
            this._loading.setLoading(false, req.url);
            return;
          } else {
            this._loading.setLoading(false, req.url);
            return;
          }
        }));
    }
    return next.handle(req);
  }
}
