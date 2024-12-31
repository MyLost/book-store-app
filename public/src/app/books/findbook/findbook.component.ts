import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from "primeng/toast";
import { MessageModule } from "primeng/message";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { BookInterface } from "../common/BookInterface";
import { BookService } from "../book.service";
import { TableModule } from "primeng/table";


@Component({
    selector: 'app-findbook',
    templateUrl: './findbook.component.html',
    styleUrls: ['./findbook.component.css'],
    imports: [
        ToastModule,
        ReactiveFormsModule,
        MessageModule,
        InputTextModule,
        ButtonModule,
        TableModule
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
