import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LoadingService } from './loading.service';
import { delay } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ MessageService ]
})
export class AppComponent implements OnInit {

  protected loading = false;
  protected title = 'BookStore';

  constructor(
    private authSvc: AuthService,
    private _loading: LoadingService,
    private router: Router
    ) { }

  ngOnInit() {
    if (!this.authSvc.isLoggedIn()) {
      this.router.navigate(['/logout']);
    }
    this.listenToLoading();
  }

  listenToLoading(): void {
    this._loading.loading
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
}

