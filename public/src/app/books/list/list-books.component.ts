import { Component, OnInit, signal } from '@angular/core';
import { BookService } from '../book.service';
import { BookInterface } from '../common/BookInterface';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { Tooltip } from "primeng/tooltip";
import { DropdownModule } from "primeng/dropdown";
import { PromotionsComponent } from "../../common/promotions/promotions.component";
import { Panel } from "primeng/panel";
import { NgOptimizedImage } from "@angular/common";


@Component({
    selector: 'app-list-books',
    templateUrl: './list-books.component.html',
  imports: [
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    Tooltip,
    DropdownModule,
    PromotionsComponent,
    Panel,
    NgOptimizedImage
  ],
    styleUrls: ['./list-books.component.css'],
    providers: [BookService, ConfirmationService]
})
export class ListBooksComponent implements OnInit {

  protected books: any;
  protected showPromotion = signal<boolean>(false);
  protected currentBookId = signal<number>(null);
  constructor(
    private bookService: BookService,
    private msgSvc: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private cnfSvc: ConfirmationService
  ) { }

  ngOnInit() {
    this.loadBooks();
  }

  private loadBooks() {
    this.bookService.getAll().subscribe((data: BookInterface)  => {
      this.books = data;
    });
  }

  protected sort(value: any) {
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

  protected edit (bookId: number) {
    this.router.navigate(['../','edit', bookId], { relativeTo: this.route});
  }

  protected delete (id: number) {
    this.cnfSvc.confirm({
      message: 'Are you sure that you want to perform this action? This book will be deleted permanently',
      accept: () => {
        this.bookService.deleteBook(id).subscribe((result:any) => {
          if (result.success) {
            this.msgSvc.add({
              key: 'book',
              severity: 'success',
              summary: 'System Service',
              detail: result.message
            });
            this.loadBooks();
          }
        });
      }
    })
  }
}
