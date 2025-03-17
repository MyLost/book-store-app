import { Component, OnInit} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import {TranslateModule} from "@ngx-translate/core";
import {CarouselModule} from "primeng/carousel";
import { NgOptimizedImage, NgStyle, NgTemplateOutlet } from "@angular/common";
import {PanelModule} from "primeng/panel";
import {BookService} from "../../books/book.service";
import {BookInterface} from "../../books/common/BookInterface";
import {environment} from "../../../environments/environment";
import {TagModule} from "primeng/tag";
import {CardModule} from "primeng/card";


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
  imports: [
    ButtonModule,
    RouterLink,
    TranslateModule,
    CarouselModule,
    NgOptimizedImage,
    PanelModule,
    TagModule,
    CardModule,
    NgStyle,
    NgTemplateOutlet
  ]
})
export class HomeComponent implements OnInit {

  protected books: BookInterface[];

  protected responsiveOptions: any[] | undefined;

  protected readonly environment = environment;

  constructor(private bookSvc: BookService ) {}

  ngOnInit() {
    this.bookSvc.getMostPopular().subscribe((data: BookInterface[])=> {
      console.log(data);
      this.books = data
    });
  }

  protected getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'info';
      case 'HIGHSTOCK':
        return 'warn';
      case 'OUTOFSTOCK':
        return 'danger';
    }
  }

}
