import { Injectable } from '@angular/core';
import { Observable, of, shareReplay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from '../../redux/models/login.model';
import { BaseService } from '../../base.service';
import { LoginModel } from './login-model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService<any> {

  private loginUrl = this.baseUrl + 'auth/login';
  loginData: Observable<LoginUser>;

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  login(user: LoginModel): Observable<any>  {
    // We are calling shareReplay to prevent the receiver of this
    // Observable from accidentally triggering multiple POST requests due to multiple subscriptions.
    return this.http.post(this.loginUrl, user).pipe(shareReplay());
  }

  google(): Observable<any> {
    return this.http.get(environment.googleHost,
      {
        responseType: 'text',
        headers:  {
         contentType: 'text/html',
         'Access-Control-Allow-Origin': '*',
         'Upgrade-Insecure-Requests': '1',
         'Cache-Control': 'max-age=0'
        },
        observe: 'body',
      });
   }
}
