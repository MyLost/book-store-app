import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Routes, UrlTree } from '@angular/router';

import { HomeComponent } from './menu/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './menu/register/register.component';
import { AboutComponent } from './menu/about/about.component';
import { PromotionsComponent } from './books/promotions/promotions.component';
import { StoreComponent } from './books/store/store.book.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { MailComponent } from './common/mail/mail.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { EmployeesComponent } from './Employees/employees.component';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { inject } from '@angular/core';

export const appGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree> | boolean | UrlTree => {
    const authSvc = inject(AuthService);
    return authSvc.isLoggedIn();
};

export const appRouts: Routes = [
  { path: '', canActivateChild: [appGuard], children: [
    { path: 'books', loadChildren: () => import('./books/book.router').then(routes => routes.bookRouts)},
    { path: 'storeBook' , component: StoreComponent},
    { path: 'listBook' , component: PromotionsComponent},
    { path: 'dashboard' , component: DashboardComponent},
    { path: 'logout' , component: LogoutComponent},
    { path: 'mail', component: MailComponent},
    { path: 'employees', component: EmployeesComponent},
  ]},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'about' , component: AboutComponent},
  { path: 'register', component: RegisterComponent},
  { path: '**', component: PageNotFoundComponent }
];

