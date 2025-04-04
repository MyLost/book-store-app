import { Component, OnInit } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { ActivatedRoute } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { NgOptimizedImage, NgStyle } from "@angular/common";
import { TagModule } from "primeng/tag";
import { Button } from "primeng/button";
import { BookInterface } from "../common/BookInterface";
import { BookService } from "../book.service";
import { environment } from "../../../environments/environment";
import { CardModule } from "primeng/card";
import { PaginatorModule, PaginatorState } from "primeng/paginator";
import { TranslateModule } from "@ngx-translate/core";

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
  imports: [
    TabViewModule,
    PanelModule,
    MenubarModule,
    ToastModule,
    NgOptimizedImage,
    TagModule,
    NgStyle,
    Button,
    CardModule,
    PaginatorModule,
    TranslateModule,
  ],
    styleUrls: ['./book.component.css']
})

export class BookComponent implements OnInit {

  protected books: BookInterface[];

  protected first: number = 0;

  protected rows: number = 0;

  protected totalRecords: number = 0;

  constructor(private bookSvc: BookService, private route: ActivatedRoute ) {}

  ngOnInit() {
    this.route.params.subscribe(params => params.id && this.loadBooksByGenre(params.id));
    this.first = 0;
    this.rows = 10;

    this.loadBooks({
      page: 0,
      rows: this.rows
    });
  }

  protected getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'info';
      case 'HIGHSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
    }
  }

  protected readonly environment = environment;

  protected bookNavigate(book: BookInterface) {
    console.log(book);
  }

  protected onPageChange(event: PaginatorState) {
    this.loadBooks(event);
  }

  private loadBooks(event: PaginatorState) {
    this.bookSvc.getPagedList(event).subscribe((data: any) => {
      this.books = data.content;
      this.rows = data.size;
      this.totalRecords = data.totalElements;
    });
  }

  private loadBooksByGenre(id: any) {
    this.bookSvc.getPagedListByGenre({
      page: 0,
      rows: this.rows
    }, id).subscribe((data: any) => {
      this.books = data.content;
      this.rows = data.size;
      this.totalRecords = data.totalElements;
    });
  }
}
