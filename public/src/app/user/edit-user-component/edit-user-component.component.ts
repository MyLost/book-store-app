import { Component, OnInit } from '@angular/core';
import { editUser, dashboard } from '../../common/Utils';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { UserInterface } from '../User';
import { AuthService } from '../../auth/auth.service';
import { PanelModule } from 'primeng/panel';
import { UserService } from '../user-service.service';
import { MessageService } from "primeng/api";
import { LOGIN_USER } from "../../redux/actions/loginActions";
import { LoginState } from "../../redux/store/login.state";
import { Store } from "@ngrx/store";


export interface UserEditRequest {
  id: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface UserEditResponse {
  username: string;
}

@Component({
  selector: 'app-edit-user-component',
  standalone: true,
  templateUrl: './edit-user-component.component.html',
  imports: [
    DialogModule,
    FileUploadModule,
    FormsModule,
    InputTextModule,
    PanelModule
  ],
  styleUrls: ['./edit-user-component.component.css']
})
export class EditUserComponentComponent implements OnInit {

  protected display: boolean;
  protected user: UserEditRequest;

  constructor(
    private authSvc: AuthService,
    private userSvc: UserService,
    private messageSvc: MessageService,
    private store: Store<LoginState>
    ) {
    editUser.subscribe(show => {
      this.display = show;
    });
  }

  ngOnInit() {
    this.user = {} as UserEditRequest;
    this.authSvc.user?.subscribe((user: UserInterface) =>  {
      this.user.username = user.username;
      this.user.id = user.id;
    });
  }

  protected edit() {
    this.userSvc.editUser(this.user).subscribe( (result: UserEditResponse) => {
      if (result) {
        const user = null;
        this.authSvc.user.subscribe(user => { user = user; });
        this.messageSvc.add({
          summary: 'Success',
          severity: 'success',
          detail: 'User was updated successfully'
        });
        this.store.dispatch({
          type: LOGIN_USER,
          payload: {
            logged: true,
            access_token: this.authSvc.authorizationToken,
            refresh_token: this.authSvc.refreshToken,
            authenticated: true,
            dashboard: { display: true },
            user: user
          }
        });
        editUser.emit(true);
      }
    });
  }

  protected hide() {
    this.display = false;
    dashboard.emit(true);
  }
}
