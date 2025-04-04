import { Injectable } from '@angular/core';
import { BaseService } from '../../common/base.service';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs';
import { logout } from '../../common/Utils';

@Injectable()
export class LogoutService extends BaseService<any> {

  private logoutUrl = this.baseUrl + 'auth/logout';

  constructor( private http: HttpClient ) {
    super(http);
  }

  logout() {
    localStorage.clear();
    logout.emit(true);
    const o = this.http.post(this.logoutUrl, {}).pipe(shareReplay());
    o.subscribe();
    return o;
  }
}
