import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Employee } from '../data/employees.interface';
import { BookInterface } from './common/BookInterface';
import { BaseService } from '../base.service';
import { Genre } from './common/Genre';
import { BookRequest } from "./addbook/addbook.component";
import { SearchBookRequest } from "./common/search-book-request";

// const employeesUrl = '../../../../../../../resources/Employees.json';
// const employeeUrl = '../../../../../../../resources/Employee.json';
//
// const filePhp = 'http://localhost/myData.php';
// const backEnd = 'http://localhost:8000/get/employees';
//
// const header = { 'MyHeader': 'myvalue', 'MyHeaderOne': 'myvalue', 'MyHeaderTwo': 'myvalue',
//  'MyHeaderThree': 'myvalue', 'Content-Type': 'MycontenttypeKakvo stava' };



// @Injectable()
// export class MyInterceptor implements HttpInterceptor {
//
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
/*
    const secureReq = req.clone({
      // url: req.url.replace('http://', 'https://'),
      headers: req.headers.set('Authorization', authToken),


    });
*/
    // console.log('This is from intercept: ' + secureReq.responseType);

//     console.log(req.headers);
//     return next.handle(req);
//   }
//
// }
//
// export interface Config {
//   heroesUrl: string;
//   textfile: string;
// }
//
// export interface Config {
//   employee: string;
// }

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
    super();
/*
    this.store.dispatch({
      type: APP_MESSAGE
    });
*/
  }

    // client(): Observable<HttpResponse<Employee>> {
    //
    //   return this.http.get<Employee>(employeesUrl, {
    //     headers: {
    //       'Content-Type': ['application/json', 'text/plain', 'my/text']
    //     },
    //     observe: 'response',
    //
    //
    //
    //
    //   });
    //
    // }
    // getCLient(): Observable<HttpResponse<Object>> {
    //
    //   return this.http.get<HttpResponse<Object>>(employeeUrl);
    // }
    //
    // getClientResponse(): Observable<Response> {
    //
    //   return this.http.get<Response>(employeesUrl, {
    //     headers: {
    //       'Content-Type': ['application/json', 'text/plain', 'my/text']
    //     },
    //
    //   });
    //
    // }



    // getPHPFile(): Observable<HttpResponse<string>>  {
    //   return this.http.get(filePhp, {
    //     responseType: 'text',
    //     headers: this.headers,
    //     observe: 'response',
    //     reportProgress: true,
    //    // withCredentials: true
    //
    //   });
    // }
    //
    // getBackEnd(): Observable<HttpResponse<any>> {
    //   return this.http.get<Response>(backEnd, {
    //     headers: {
    //       'Authorization' : '1234567891242151cgdgjmbnhsgkkjftrsnubkjkjkubybyvtyvYygifgppspfjIJKLIHJLFWSE',
    //       'Myheader' : '123456789'
    //     },
    //     observe: 'response',
    //
    //
    //   });
    // }

    getAll() {
      return this.http.get<BookInterface>(this.booksUrl);
    }

    getPromotions() {
      const queryParams = new HttpParams();
      queryParams.append('promotion', true);
      return this.http.get<BookInterface[]>(this.booksUrl + '/promotions', {
        params: queryParams
      });
    }

    getGenres() {
      return this.http.get<Genre[]>(this.booksUrl + '/genres',  {});
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
