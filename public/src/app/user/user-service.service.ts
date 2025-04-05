import { Injectable } from '@angular/core';
import { BaseService } from '../common/base.service';
import { UserEditRequest, UserEditResponse } from './edit/edit-user-component.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<any> {

  private usersUrl = this.baseUrl + 'users';

  constructor(private http: HttpClient) {
    super(http);
  }

  public editUser(request: UserEditRequest) {
    return this.http.patch<UserEditResponse>(this.usersUrl, request);
  }
}
