import { Component, OnInit } from '@angular/core';
import { LoginService } from './auth/login.service';
import { LoginUser } from './redux/models/login.model';
import { Store } from '@ngrx/store';
import { AppState } from './redux/store/login.state';
import { LOGIN_USER } from './redux/actions/loginActions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title: string = 'BookStore';
  private user: LoginUser;
  element: any;
  constructor(
    private loginService: LoginService,
    private store: Store<AppState>,
    private router: Router ) {
    this.user = this.loginService.getUser();
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

