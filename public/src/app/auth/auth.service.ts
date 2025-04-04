import { inject, Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { BaseService } from '../common/base.service';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService<any> {

  private readonly usersUrl = this.baseUrl + 'users/';

  constructor (private http: HttpClient) { super(http); }


  public get authorizationToken() {
    return localStorage.getItem('access_token');
  }

  public get refreshToken() {
    return localStorage.getItem('refresh_token');
  }

  public isLoggedIn(): boolean {
    if (this.getExpiration() == null) {
      return false;
    }
    return DateTime.now() < this.getExpiration();
  }

  public isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  public getExpiration(): DateTime {
    if (localStorage.getItem('expires_at')) {
      return DateTime.fromSeconds(JSON.parse(localStorage.getItem('expires_at')));
    }
    return null;
  }

  public get subject() {
    return jwtDecode(localStorage.getItem('access_token')).sub;
  }

  get user() {
    if (this.authorizationToken) {
      return this.http.get(this.usersUrl + this.subject).pipe(shareReplay());
    }
    return null;
  }
}
