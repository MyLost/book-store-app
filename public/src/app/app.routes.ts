import { Routes } from '@angular/router';

import { HomeComponent } from './menu/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './menu/register/register.component';
import { AboutComponent } from './menu/about/about.component';
import { ListComponent } from './books/list/list.component';
import { StoreComponent } from './books/store/store.book.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { MailComponent } from './common/mail/mail.component';
import { BookComponent } from './books/book/book.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

export const appRouts: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'book', component: BookComponent},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'about' , component: AboutComponent},
  { path: 'storeBook' , component: ListComponent},
  { path: 'listBook' , component: StoreComponent},
  { path: 'dashBoard' , component: DashboardComponent},
  { path: 'logout' , component: LogoutComponent},
  { path: 'mail', component: MailComponent},
  // { path: '**', component: PageNotFoundComponent }
];

