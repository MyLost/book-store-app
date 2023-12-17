import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { BookInterface } from '../common/BookInterface';
import { TableModule } from "primeng/table";

@Component({
  selector: 'app-allbooks',
  standalone: true,
  templateUrl: './allbooks.component.html',
  imports: [
    TableModule
  ],
  styleUrls: ['./allbooks.component.css']
})
export class AllbooksComponent implements OnInit {

  books: any;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getBook().subscribe((data: BookInterface)  => {
      this.books = data;
    });
  }

  sort(value: any) {
    switch (value) {
      case 'author':
      this.books.sort(function(a : any, b: any) {
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
}
