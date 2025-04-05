import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { BookInterface } from './common/BookInterface';
import { BaseService } from '../common/base.service';
import { BookRequest } from './add/add-book.component';
import { PaginatorState } from "primeng/paginator";

export interface BookEditData {
  book: BookInterface;
  listIndex: number;
}

export const $bookChangeSource = new Subject<BookEditData>();


@Injectable({providedIn: 'root'})
export class BookService extends BaseService<any> {

  private booksUrl = this.baseUrl + 'books';
  // headers = new HttpHeaders(header);

  constructor(private http: HttpClient) {
    super(http);
  }

  getPagedListByGenre(params: PaginatorState, genreId: number) {
    let body = {
      "page": params.page,
      "rows": params.rows
    }
    return this.http.post<any>(this.booksUrl  + `/genre/${genreId}` , body);
  }

  getPagedList(params: PaginatorState) {

    let body = {
      "page": params.page,
      "rows": params.rows
    }

    return this.http.post<any>(this.booksUrl  + '/paged-list' , body);
  }

  getAll() {
    return this.http.get<BookInterface>(this.booksUrl);
  }

  getMostPopular() {
    return this.http.get<BookInterface[]>(this.booksUrl + '/most-popular');
  }

    getPromotions() {
      const queryParams = new HttpParams();
      queryParams.append('promotion', true);
      return this.http.get<BookInterface[]>(this.booksUrl + '/promotions', {
        params: queryParams
      });
    }


  getCategories() {
    return this.http.get<any[]>(this.baseUrl + 'categories',  {});
  }

    addBook(body: any) {
      return this.http.post(this.booksUrl, body);
    }

    getById(bookId: number): Observable<BookInterface> {
      return this.http.get<BookInterface>(this.booksUrl + '/' + bookId);
    }

    update (id: any, value: BookRequest) {
      return this.http.post<BookInterface>(this.booksUrl + '/' + id, value);
    }

    findBook(request: any) {
      return this.http.post<BookInterface[]>(this.booksUrl + '/search', request);
    }

    deleteBook(bookId: number) {
      return this.http.delete(this.booksUrl + '/' + bookId);
    }
}
