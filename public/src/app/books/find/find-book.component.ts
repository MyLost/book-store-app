import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from "primeng/toast";
import { MessageModule } from "primeng/message";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { BookInterface } from "../common/BookInterface";
import { BookService } from "../book.service";
import { TableModule } from "primeng/table";
import { Panel } from "primeng/panel";


@Component({
    selector: 'app-find-book',
    templateUrl: './find-book.component.html',
    styleUrls: ['./find-book.component.css'],
  imports: [
    ToastModule,
    ReactiveFormsModule,
    MessageModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    Panel
  ],
    providers: []
})
export class FinBookComponent implements OnInit {

  protected findForm: FormGroup;
  protected books: BookInterface[];


  constructor(
    private bookSvc: BookService
  ) {
    this.findForm = new FormGroup ({
      author : new FormControl (''),
      title : new FormControl (''),
    });
  }

  ngOnInit() {}

  protected findBook (findForm: FormGroup) {
    this.bookSvc.findBook(findForm.value).subscribe(books => this.books = books);
  }
}
