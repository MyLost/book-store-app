import { Component, OnInit } from '@angular/core';
import { $bookChangeSource, BookService } from '../book.service';
import { BookInterface } from '../common/BookInterface';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageService } from "primeng/api";


@Component({
  selector: 'app-allbooks',
  standalone: true,
  templateUrl: './allbooks.component.html',
  imports: [
    TableModule,
    ButtonModule
  ],
  styleUrls: ['./allbooks.component.css'],
  providers: [ BookService, MessageService ]
})
export class AllBooksComponent implements OnInit {

  protected books: any;

  constructor(
    private bookService: BookService,
    private msgSvc: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.bookService.getAll().subscribe((data: BookInterface)  => {
      this.books = data;
    });
  }

  sort(value: any) {
    switch (value) {
      case 'author':
      this.books.sort(function(a: any, b: any) {
        if (a.author < b.author) { return -1; }
        if (a.author > b.author) { return 1; }
        return 0;
      });
      break;
      case 'price':
      this.books.sort(function(a: any, b: any) {
        if (a.price < b.price) { return -1; }
        if (a.price > b.price) { return 1; }
        return 0;
      });
      break;
      case 'title':
      this.books.sort(function(a: any, b: any) {
        if (a.title < b.title) { return -1; }
        if (a.title > b.title) { return 1; }
        return 0;
      });
      break;
      case 'kind':
      this.books.sort(function(a: any, b: any) {
        if (a.kind < b.kind) { return -1; }
        if (a.kind > b.kind) { return 1; }
        return 0;
      });
      break;
      case 'cover':
      this.books.sort(function(a: any, b: any) {
        if (a.cover < b.cover) { return -1; }
        if (a.cover > b.cover) { return 1; }
        return 0;
      });
      break;
       case 'numberOfBooks':
      this.books.sort(function(a: any, b: any) {
        if (a.numberOfBooks < b.numberOfBooks) { return -1; }
        if (a.numberOfBooks > b.numberOfBooks) { return 1; }
        return 0;
      });
      break;
    }
  }

  edit (bookId: number) {
    this.router.navigateByUrl('books/edit/' +  bookId);
  }

  delete (id: number) {
    this.bookService.deleteBook(id).subscribe((result:any) => {
      if (result.success) {
        this.msgSvc.add({
          key: 'book',
          severity: 'success',
          summary: 'System Service',
          detail: result.message
        });
      }
    });
  }
}
