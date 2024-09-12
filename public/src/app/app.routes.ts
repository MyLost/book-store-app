import { Routes } from '@angular/router';

import { HomeComponent } from './menu/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './menu/register/register.component';
import { AboutComponent } from './menu/about/about.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';


export const appRouts: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'about' , component: AboutComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'books',  loadChildren: () => import('./books/book.router').then(routes => routes.bookRouts)},
  { path: '**', component: PageNotFoundComponent }
];


