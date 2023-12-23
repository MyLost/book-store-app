import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { BookService } from '../book.service';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { Genre } from '../common/Genre';
import { BookInterface } from '../common/BookInterface';

export interface BookRequest {
  author: string;
  title: string;
  price: string;
  genreId: string;
  cover: string;
  numberOfBooks: string;
}

@Component({
  selector: 'app-addbook',
  standalone: true,
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css'],
  imports: [
    ToastModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    PanelModule,
    DropdownModule
  ],
  providers: [ MessageService, BookService ]

})
export class AddBookComponent implements OnInit {

  protected coverDropdownOptions: SelectItem[] = [
    {label: 'Hard', value: 'HARD' },
    {label: 'Soft', value: 'SOFT' }
  ];

  protected genres: Genre[];

  protected bookRequestModel: BookRequest = {} as BookRequest;

  protected success = {
    author: '',
    title: '',
    price: '',
    genre: '',
    cover: '',
    numberOfBooks: ''
  };
  protected keyMessage = '';
  protected flag: any;

  constructor(private messageService: MessageService, private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getGenres().subscribe(result => this.genres = result);
  }

  checkInput(event: any, type: any) {

    if (this.bookRequestModel.author === '' && type.name === 'author') {
      this.messageService.add({ key: 'book', severity: 'error', summary: 'Error', detail: 'Author is required '});
    }
    if (this.bookRequestModel.title === '' && type.name === 'title')  {
      // tslint:disable-next-line:max-line-length
      this.messageService.add({key: 'book', severity: 'error', summary: 'Error', detail: 'Title is required '});
    }
    if (this.bookRequestModel.price === '' && type.name === 'price' ) {
      this.messageService.add({key: 'book', severity: 'error', summary: 'Error', detail: 'Price is required '});
    }
    if (this.bookRequestModel.genreId === '' && type.name === 'kind') {
      this.messageService.add({key: 'book', severity: 'error', summary: 'Error', detail: 'Kind is required '});
    }
    if (this.bookRequestModel.cover === '' && type.name === 'cover') {
      this.messageService.add({key: 'book', severity: 'error', summary: 'Error', detail: 'Cover is required '});
    }
    if (this.bookRequestModel.numberOfBooks === ''  && type.name === 'numberOfBooks') {
      this.messageService.add({key: 'book', severity: 'error', summary: 'Error', detail: 'Number Of Books is required '});
    }


    if (event.key === 'Shift') {
      return;
    }

    if (event.key === 'Backspace') {
    }

    if (!this.bookRequestModel.author.match('<') && type.name === 'author') {
      console.log('Wrong symbol in author checkInput function');
      this.success.author = '';
      this.keyMessage = 'author';
      console.log('author empty');
      this.flag = false;
    }

    if (!this.bookRequestModel.title.match('<') && type.name === 'title' ) {
      this.success.title = '';
      console.log('title empty');
      this.keyMessage = 'title';
      this.flag = false;
    }

    if (!this.bookRequestModel.price.match('<') && type.name === 'price' ) {
      this.success.price = '';
      console.log('price empty');
      this.keyMessage = 'price';
      this.flag = false;
    }

    if (!this.bookRequestModel.genreId.match('<') && type.name === 'kind' ) {
      this.success.genre = '';
      console.log('kind empty');
      this.keyMessage = 'kind';
      this.flag = false;
    }

    if (!this.bookRequestModel.cover.match('<') && type.name === 'cover' ) {
      this.success.cover = '';
      console.log('cover empty');
      this.keyMessage = 'cover';
      this.flag = false;
    }

    if (!this.bookRequestModel.numberOfBooks.match('<') && type.name === 'numberOfBooks' ) {
      this.success.numberOfBooks = '';
      console.log('numberOfBooks empty');
      this.keyMessage = 'numberOfBooks';
      this.flag = false;
    }

    if (this.cheker(type) && (event.key === '<' || event.key === '>')) {
      // console.log('success.author' + this.success.author);
      // console.log('success.title' + this.success.author);

      if (this.success.author === '' && type.name === 'author') {
      console.log('right author');
      this.success.author = 'author';
      // tslint:disable-next-line:max-line-length
      this.messageService.add({key: 'book', severity: 'warn', summary: 'Input Message  ', detail: 'Wrong symbol in ' + this.keyMessage + ' input: ' + event.key, sticky: true});
      }

      if (this.success.title === '' && type.name === 'title') {
      this.success.title = 'title';
      // tslint:disable-next-line:max-line-length
      this.messageService.add({key: 'book', severity: 'warn', summary: 'Input Message  ', detail: 'Wrong symbol in ' + this.keyMessage + ' input: ' + event.key, sticky: true});
      }

      if (this.success.price === '' && type.name === 'price') {
      this.success.price = 'price';
      // tslint:disable-next-line:max-line-length
      this.messageService.add({key: 'book', severity: 'warn', summary: 'Input Message  ', detail: 'Wrong symbol in ' + this.keyMessage + ' input: ' + event.key, sticky: true});
      }

      if (this.success.genre === '' && type.name === 'kind') {
      this.success.genre = 'kind';
      // tslint:disable-next-line:max-line-length
      this.messageService.add({key: 'book', severity: 'warn', summary: 'Input Message  ', detail: 'Wrong symbol in ' + this.keyMessage + ' input: ' + event.key, sticky: true});
      }

      if (this.success.cover === '' && type.name === 'cover') {
      this.success.cover = 'cover';
      // tslint:disable-next-line:max-line-length
      this.messageService.add({key: 'book', severity: 'warn', summary: 'Input Message  ', detail: 'Wrong symbol in ' + this.keyMessage + ' input: ' + event.key, sticky: true});
      }

      if (this.success.numberOfBooks === '' && type.name === 'numberOfBooks') {
      this.success.numberOfBooks = 'numberOfBooks';
      // tslint:disable-next-line:max-line-length
      this.messageService.add({key: 'book', severity: 'warn', summary: 'Input Message  ', detail: 'Wrong symbol in ' + this.keyMessage + ' input: ' + event.key, sticky: true});
      }


    }

    if (!this.flag) {
      // console.log('i am cleaner');
      // console.log(this.keyMessage);
      this.messageService.clear(this.keyMessage);
    }
  }

  cheker(type: any) {
    if ( type.name === 'author' && this.bookRequestModel.author.match('<')) {
      this.keyMessage = 'author';
      this.flag = true;
      console.log('match author');

    }
    if ( type.name === 'title' && this.bookRequestModel.title.match('<')) {
      console.log('match title');
      this.keyMessage = 'title';
      this.flag = true;
    }
    if (type.name === 'cover' && this.bookRequestModel.cover.match('<')) {
      this.keyMessage = 'cover';
      this.flag = true;
    }

    if (type.name === 'kind' && this.bookRequestModel.genreId.match('<')) {
      this.keyMessage = 'kind';
      this.flag = true;
    }

    if (type.name === 'price' && this.bookRequestModel.price.match('<')) {
      this.keyMessage = 'price';
      this.flag = true;
    }

    if (type.name === 'numberOfBooks' && this.bookRequestModel.numberOfBooks.match('<')) {
      this.keyMessage = 'numberOfBooks';
      this.flag = true;
    }

    return this.flag;
  }

  addBook() {
    this.bookService.addBook(this.bookRequestModel).subscribe((result: BookInterface) => {
      if (result) {
        this.bookRequestModel = {} as BookRequest;
        this.messageService.add({key: 'book', severity: 'success', summary: 'Service Message', detail: 'Book added correctly'});
      } else {
        this.messageService.add({key: 'book', severity: 'error', summary: 'Service Message', detail: 'Book not added correctly'});
      }
    });
  }
}
