import { Routes } from '@angular/router';

import { HomeComponent } from './menu/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './menu/register/register.component';
import { AboutComponent } from './menu/about/about.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import {LogoutComponent} from "./auth/logout/logout.component";
import {appGuard} from "./auth/guards";
import {BookComponent} from "./books/book/book.component";


export const appRouts: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'about' , component: AboutComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'logout', canActivate:[appGuard], component: LogoutComponent},
  { path: 'books', component: BookComponent},
  { path: 'books/genre/:id', component: BookComponent },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.router').then(routes => routes.dashboardRouts)},
  { path: '**', component: PageNotFoundComponent }
];
