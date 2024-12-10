import { Component, OnInit } from '@angular/core';
import {User} from '../../common/UserInterface';
import {MessageService} from 'primeng/api';
import { LoginService } from './login.service';
import { Router} from '@angular/router';
import { FormControl, Validators, FormGroup, FormsModule } from '@angular/forms';
import {validateInputCustomValidator} from '../../common/BookValidator';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

import { Store } from '@ngrx/store';
import { CardModule } from 'primeng/card';
import { LOGIN_USER } from '../../redux/actions/loginActions';
import { AuthenticationResponseModel } from './authentication-response-model';
import { jwtDecode } from 'jwt-decode';
import { LoginState } from '../../redux/store/login.state';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import {loginEmitter} from "../../common/Utils";

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    ToastModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    MessageModule,
    CardModule
],
  providers: [ MessageService ]
})

export class LoginComponent implements OnInit {

  private username: any;
  private password: any;
  private loginGroup: any;

  protected user: User = new User;
  protected correctInputUsername: boolean;
  protected correctInputPassword: boolean;

  constructor(
    private messageService: MessageService,
    private loginService: LoginService,
    private router: Router,
    private store: Store<LoginState>,
    private autSvc: AuthService
  ) {
    this.correctInputUsername = false;
    this.correctInputPassword = false;
    this.loginGroup = new FormGroup({
      'username' : new FormControl(this.username, [
        Validators.maxLength(20),
        validateInputCustomValidator(/[<>]/)
      ]),
      'password' : new FormControl(this.password, [
        Validators.maxLength(20),
        validateInputCustomValidator(/[<>]/)
      ])
    });
  }

  ngOnInit() {
    this.user.username = '';
    this.user.password = '';
  }

  protected google() {
  this.loginService.google().subscribe((result: AuthenticationResponseModel) => {
  });
  }

  protected login() {
    this.loginService.login(this.user).subscribe({
        next: this.handleResponse.bind(this),
        error: this.handleError.bind(this)
      });
  }

  private handleError(error: HttpErrorResponse) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: error.error.message ? error.error.message : error.message
    });
  }

  private handleResponse(result: AuthenticationResponseModel) {
    if (result) {
      localStorage.setItem('access_token', result.accessToken);
      localStorage.setItem('refresh_token', result.refreshToken);
      localStorage.setItem('expires_at', jwtDecode(result.accessToken).exp.toString());
      // setCookie(this.user.username, result.cookie);
      this.autSvc.user.subscribe(user => {
        this.store.dispatch({
          type: LOGIN_USER,
          payload: {
            logged: true,
            access_token: result.accessToken,
            refresh_token: result.refreshToken,
            authenticated: true,
            dashboard: { display: true },
            user: user
          }
        });
      });
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'user successfully login'
      });
      loginEmitter.emit(true);
      this.router.navigate(['home']);
    }
  }

  protected validationInput(event: any) {
    if (event.name === 'username') {
      this.loginGroup.setValue({'username': event.value, 'password': null});
      if (!this.loginGroup.valid) {
        this.correctInputUsername = true;
      } else {
        this.correctInputUsername = false;
      }
    }
    if (event.name === 'password') {
      this.loginGroup.setValue({'username': null, 'password': event.value});
      if (!this.loginGroup.valid) {
        this.correctInputPassword = true;
      } else {
        this.correctInputPassword = false;
      }
    }
  }

  protected facebook () {}
}

export function setCookie(name: string, val: string) {
  const date = new Date();
  const value = val;
  // Set it expire in 7 days
  date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
  // Set it
  document.cookie = name + '=' + value + '; expires=' + date.toUTCString() + '; path=/';
}


