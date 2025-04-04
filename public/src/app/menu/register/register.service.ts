import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from '../../user/User';
import { BaseService } from '../../common/base.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends BaseService<any> {

  private registerUrl =  this.baseUrl + 'auth/register';

  constructor(private http: HttpClient) {
    super(http);
  }

  register(user: any) {
    user.bornOn = new Date(user.bornDate).toISOString().split('T')[0];
    return this.http.post(this.registerUrl, user);
  }
}
