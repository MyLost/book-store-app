import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { BookComponent } from './book/book.component';
import { AddBookComponent } from './addbook/addbook.component';
import { EditBookComponent } from './editbook/editbook.component';
import { FinBookComponent } from './findbook/findbook.component';
import { AllBooksComponent } from './allbooks/allbooks.component';
import { BookResolver } from './book-resolver';
import { inject } from '@angular/core';

export const bookRouts: Routes = [
  { path: '', component: BookComponent, children: [
    { path: 'all', component: AllBooksComponent},
    { path: 'add', component: AddBookComponent},
    { path: 'edit/:id', component: EditBookComponent,
      resolve: {'book': (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(BookResolver).resolve(route, state)}},
    { path: 'find', component: FinBookComponent},
  ]},
];
