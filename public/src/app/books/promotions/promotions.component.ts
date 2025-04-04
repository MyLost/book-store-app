import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { BookService } from '../book.service';
import { BookInterface } from '../common/BookInterface';
import { ImageModule } from "primeng/image";


@Component({
    selector: 'app-list-store',
    templateUrl: './promotions.component.html',
  imports: [
    ButtonModule,
    RippleModule,
    ImageModule
  ],
    styleUrls: ['./promotions.component.css'],
    providers: [BookService]
})
export class PromotionsComponent implements OnInit {

  protected books: BookInterface[];

  constructor(private bookSvc: BookService) { }

  ngOnInit() {
    this.bookSvc.getPromotions().subscribe((data: BookInterface[]) => this.books = data);
  }
}
