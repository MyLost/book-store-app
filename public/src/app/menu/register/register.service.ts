import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from '../../user/User';
import { BaseService } from '../../base.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends BaseService<any> {

  private registerUrl =  this.baseUrl + 'auth/register';
  private readonly postUser: User;

  constructor(private http: HttpClient) {
    super();
    this.postUser = new User();
  }

  register(user: any) {
    this.postUser.username(user.username);
    this.postUser.password(user.password);
    this.postUser.confirmPassword(user.confirmPassword);
    this.postUser.firstName(user.firstName);
    this.postUser.lastName(user.lastName);
    this.postUser.bornOn(new Date(user.bornDate).toISOString().split('T')[0]);
    return this.http.post(this.registerUrl, this.postUser);
  }
}
