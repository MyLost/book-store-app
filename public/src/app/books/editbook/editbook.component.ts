import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import {validateInputCustomValidator} from '../../common/BookValidator';
import { ToastModule } from "primeng/toast";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { $bookChangeSource, BookService } from "../book.service";
import { PanelModule } from "primeng/panel";
import { DropdownModule } from "primeng/dropdown";
import { BookInterface } from "../common/BookInterface";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Genre } from "../common/Genre";

@Component({
  selector: 'app-editbook',
  standalone: true,
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css'],
  imports: [
    ToastModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PanelModule,
    DropdownModule
  ],
  providers: [MessageService, BookService]
})
export class EditBookComponent implements OnInit, OnDestroy {

  protected bookModel: BookInterface;
  protected editForm: FormGroup;
  protected subscriptions: Subscription = new Subscription();

  protected coverDropdownOptions: SelectItem[] = [
    {label: 'Hard', value: 'HARD' },
    {label: 'Soft', value: 'SOFT' }
  ];

  protected genres: Genre[];

  constructor(
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private bookService: BookService
  ) {

    this.editForm = new FormGroup ({
      'id': new FormControl(this.bookModel?.id),
      'author': new FormControl(this.bookModel?.author, [
         Validators.required,
         Validators.minLength(4),
         validateInputCustomValidator(/[<>]/)
      ]),
      title: new FormControl(this.bookModel?.title, [
        Validators.required,
        Validators.minLength(4),
        validateInputCustomValidator(/[<>]/)
     ]),
     price: new FormControl(this.bookModel?.price, [
        Validators.required,
        Validators.minLength(4),
        validateInputCustomValidator(/[<>]/)
      ]),
      genre: new FormControl(this.bookModel?.genre.id, [
        Validators.required,
        Validators.minLength(4),
        validateInputCustomValidator(/[<>]/)
      ]),
      cover: new FormControl(this.bookModel?.cover, [
        Validators.required,
        Validators.minLength(4),
        validateInputCustomValidator(/[<>]/)
      ]),
      numberOfBooks: new FormControl(this.bookModel?.numberOfBooks, [
        Validators.required,
        Validators.minLength(4),
        validateInputCustomValidator(/[<>]/)
      ]),
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit() {
    this.bookService.getGenres().subscribe(result => this.genres = result);

    this.activatedRoute.data.subscribe((book: { book: BookInterface } ) => {
      this.bookModel = book.book;
      const genreId = this.bookModel.genre.id;
      delete this.bookModel.genre;
      this.bookModel.genre = genreId;
      this.editForm.setValue({...this.bookModel});
    });
  }

  editBook() {
    const value = this.editForm.value;
    const genreId = value.genre;
    delete value.genre;
    value.genreId = genreId;
    const id = value.id;
    delete value.id;
    this.bookService.update(id, value).subscribe(result => {
      console.log(result);
    });
  }
}
