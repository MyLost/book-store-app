import { Component, OnInit } from '@angular/core';
import { LoginService } from './auth/login.service';
import { LoginUser } from './redux/models/login.model';
import { Store } from '@ngrx/store';
import { AppState } from './redux/store/login.state';
import { LOGIN_USER } from './redux/actions/loginActions';
import { Router } from '@angular/router';
import { AuthService } from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  protected title = 'BookStore';
  private user: LoginUser;
  element: any;
  constructor(
    private loginService: LoginService,
    private store: Store<AppState>,
    private router: Router,
    private auth: AuthService
    ) {
    this.user = this.auth.user;
  }

  ngOnInit() {
    if (localStorage.getItem('auth') === '123456789') {
      this.store.dispatch({
        type: LOGIN_USER,
        payload: {
          logged: true, userData: {
        }, auth: '', dashboard: {display: false}}
      });
      return null;
    } else {
      return this.router.navigateByUrl('home');
    }

  }

  logged(logged: boolean) {
    console.log(logged);
  }
}

