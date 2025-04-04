import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { LoadingService } from '../loading.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private headers: HttpHeaders = {} as HttpHeaders;

  constructor(
    private authService: AuthService,
    private _loading: LoadingService,
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
    return next.handle(req).pipe(
      // catchError((error: HttpErrorResponse) => {
      //   if (error.status === 401) {
      //     // Optionally, you can further customize the message or extract details from error.error
      //     this.messageService.add({
      //       key: 'app',
      //       severity: 'error',
      //       summary: 'Unauthorized',
      //       detail: 'You are not authorized to perform this action.'
      //     });
      //   } else {
      //     // For other errors, you can display a generic error message or handle them accordingly
      //     this.messageService.add({
      //       key: 'app',
      //       severity: 'error',
      //       summary: 'Error',
      //       detail: error.message || 'An unexpected error occurred.'
      //     });
      //   }
      //   return throwError(error);
      // })
    );
  }
}
