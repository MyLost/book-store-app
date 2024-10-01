import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {  BookService } from '../book.service';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { BookInterface } from '../common/BookInterface';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Genre } from '../common/Genre';

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
  providers: [ MessageService, BookService ]
})
export class EditBookComponent implements OnInit, OnDestroy {

  protected bookModel: BookInterface;
  protected bookFormModel: {
    id: string;
    author: string;
    title: string;
    price: string;
    genreId: number;
    cover: string;
    numberOfBooks: string;
  };

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
      id: new FormControl(this.bookModel?.id),
      author: new FormControl(this.bookModel?.author, [
         Validators.required,
         Validators.minLength(4)
      ]),
      title: new FormControl(this.bookModel?.title, [
        Validators.required,
        Validators.minLength(4)
     ]),
     price: new FormControl(this.bookModel?.price, [
        Validators.required,
        Validators.minLength(2)
      ]),
      genreId: new FormControl(this.bookModel?.genre.id, [
        Validators.required,
        Validators.minLength(4)
      ]),
      cover: new FormControl(this.bookModel?.cover, [
        Validators.required,
        Validators.minLength(4)
      ]),
      numberOfBooks: new FormControl(this.bookModel?.numberOfBooks, [
        Validators.required,
        Validators.minLength(4)
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
      this.bookFormModel = this.mapBookModelToFormModel(this.bookModel);
      this.editForm.setValue(this.bookFormModel);
    });
  }

  private mapBookModelToFormModel (bookModel: BookInterface) {
    return {
      author: bookModel.author,
      cover: bookModel.cover,
      genreId: bookModel.genre.id,
      id: bookModel.id,
      numberOfBooks: bookModel.numberOfBooks,
      price: bookModel.price,
      title: bookModel.title
    };
  }

  protected editBook() {
    this.editForm.markAllAsTouched();
    if (this.editForm.valid) {
      this.bookService.update(this.bookModel.id, this.editForm.value).subscribe(result => {
        if (result) {
          this.messageService.add({
            severity: 'success',
            summary: 'Service Message',
            detail: 'Record was edited successfully'
          });
        }
      });
    }
  }
}
