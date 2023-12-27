import { BookService } from './book.service';
import { BookInterface } from './common/BookInterface';
import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class BookResolver implements Resolve<BookInterface> {

  private service: BookService = inject(BookService);

  constructor() {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<BookInterface>|Promise<BookInterface>|BookInterface {
    return this.service.getById(Number(route.paramMap.get('id')));
  }
}
