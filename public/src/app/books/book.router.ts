import {ActivatedRouteSnapshot, RouterStateSnapshot, Routes} from '@angular/router';
import { AddBookComponent } from './add/add-book.component';
import { EditBookComponent } from './edit/edit-book.component';
import { FinBookComponent } from './find/find-book.component';
import { ListBooksComponent } from './list/list-books.component';
import { BookResolver } from './book-resolver';
import { inject } from '@angular/core';
import {ManageComponent} from "./manage/manage.component";
import {appGuard} from "../auth/guards";
import {PromotionsComponent} from "./promotions/promotions.component";
import {StoreComponent} from "./store/store.book.component";
import {MailComponent} from "../common/mail/mail.component";
import {EmployeesComponent} from "../Employees/employees.component";
import {BookComponent} from "./book/book.component";

export const bookRouts: Routes = [
  { path: '', component: ManageComponent, canActivateChild: [appGuard], outlet:'books', children: [
    { path: 'all', component: ListBooksComponent},
    { path: 'manage', component: ManageComponent },
    { path: 'add', component: AddBookComponent},
    { path: 'edit/:id', component: EditBookComponent, resolve: {
      'book': (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(BookResolver).resolve(route, state)
      }
    },
    { path: 'find', component: FinBookComponent},
    { path: 'promotions' , component: PromotionsComponent },
    { path: 'store' , component: StoreComponent},
    { path: 'mail', component: MailComponent},
    { path: 'employees', component: EmployeesComponent}
    ]},
];

