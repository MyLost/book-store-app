import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import { BookService } from '../book.service';
import { ToastModule } from "primeng/toast";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";

@Component({
  selector: 'app-addbook',
  standalone: true,
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css'],
  imports: [
    ToastModule,
    FormsModule,
    InputTextModule
  ],
  providers: [MessageService]

})
export class AddbookComponent implements OnInit {

  book = {
    author: '',
    title: '',
    price: '',
    kind: '',
    cover: '',
    numberOfBooks: ''
  };

  success = {
    author: '',
    title: '',
    price: '',
    kind: '',
    cover: '',
    numberOfBooks: ''
  };
  keyMessage = '';
  flag: any;

  constructor(private messageService: MessageService, private bookService: BookService) { }

  ngOnInit() {

  }

  checkInput(event: any, type: any) {

    if (this.book.author === '' && type.name === 'author') {
      this.messageService.add({severity: 'info', summary: 'Input Message  ', detail: 'Author is required ', sticky: true});
    }
    if (this.book.title === '' && type.name === 'title')  {
      // tslint:disable-next-line:max-line-length
      this.messageService.add({severity: 'info', summary: 'Input Message  ', detail: 'Title is required ', sticky: true});

    }
    if (this.book.price === '' && type.name === 'price' ) {
      this.messageService.add({severity: 'info', summary: 'Input Message  ', detail: 'Price is required ', sticky: true});
    }
    if (this.book.kind === '' && type.name === 'kind') {
      this.messageService.add({severity: 'info', summary: 'Input Message  ', detail: 'Kind is required ', sticky: true});
    }
    if (this.book.cover === '' && type.name === 'cover') {
      this.messageService.add({severity: 'info', summary: 'Input Message  ', detail: 'Cover is required ', sticky: true});
    }
    if (this.book.numberOfBooks === ''  && type.name === 'numberOfBooks') {
      this.messageService.add({severity: 'info', summary: 'Input Message  ', detail: 'Number Of Books is required ', sticky: true});
    }


    if (event.key === 'Shift') {
      return;
    }

    if (event.key === 'Backspace') {
    }

    if (!this.book.author.match('<') && type.name === 'author') {
      console.log('Wrong symbol in author checkInput function');
      this.success.author = '';
      this.keyMessage = 'author';
      console.log('author empty');
      this.flag = false;
    }

    if (!this.book.title.match('<') && type.name === 'title' ) {
      this.success.title = '';
      console.log('title empty');
      this.keyMessage = 'title';
      this.flag = false;
    }

    if (!this.book.price.match('<') && type.name === 'price' ) {
      this.success.price = '';
      console.log('price empty');
      this.keyMessage = 'price';
      this.flag = false;
    }

    if (!this.book.kind.match('<') && type.name === 'kind' ) {
      this.success.kind = '';
      console.log('kind empty');
      this.keyMessage = 'kind';
      this.flag = false;
    }

    if (!this.book.cover.match('<') && type.name === 'cover' ) {
      this.success.cover = '';
      console.log('cover empty');
      this.keyMessage = 'cover';
      this.flag = false;
    }

    if (!this.book.numberOfBooks.match('<') && type.name === 'numberOfBooks' ) {
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
      this.messageService.add({key: this.keyMessage, severity: 'warn', summary: 'Input Message  ', detail: 'Wrong symbol in ' + this.keyMessage + ' input: ' + event.key, sticky: true});
      }

      if (this.success.title === '' && type.name === 'title') {
      this.success.title = 'title';
      // tslint:disable-next-line:max-line-length
      this.messageService.add({key: this.keyMessage, severity: 'warn', summary: 'Input Message  ', detail: 'Wrong symbol in ' + this.keyMessage + ' input: ' + event.key, sticky: true});
      }

      if (this.success.price === '' && type.name === 'price') {
      this.success.price = 'price';
      // tslint:disable-next-line:max-line-length
      this.messageService.add({key: this.keyMessage, severity: 'warn', summary: 'Input Message  ', detail: 'Wrong symbol in ' + this.keyMessage + ' input: ' + event.key, sticky: true});
      }

      if (this.success.kind === '' && type.name === 'kind') {
      this.success.kind = 'kind';
      // tslint:disable-next-line:max-line-length
      this.messageService.add({key: this.keyMessage, severity: 'warn', summary: 'Input Message  ', detail: 'Wrong symbol in ' + this.keyMessage + ' input: ' + event.key, sticky: true});
      }

      if (this.success.cover === '' && type.name === 'cover') {
      this.success.cover = 'cover';
      // tslint:disable-next-line:max-line-length
      this.messageService.add({key: this.keyMessage, severity: 'warn', summary: 'Input Message  ', detail: 'Wrong symbol in ' + this.keyMessage + ' input: ' + event.key, sticky: true});
      }

      if (this.success.numberOfBooks === '' && type.name === 'numberOfBooks') {
      this.success.numberOfBooks = 'numberOfBooks';
      // tslint:disable-next-line:max-line-length
      this.messageService.add({key: this.keyMessage, severity: 'warn', summary: 'Input Message  ', detail: 'Wrong symbol in ' + this.keyMessage + ' input: ' + event.key, sticky: true});
      }


    }

    if (!this.flag) {
      // console.log('i am cleaner');
      // console.log(this.keyMessage);
      this.messageService.clear(this.keyMessage);
    }
  }

  cheker(type: any) {
    if ( type.name === 'author' && this.book.author.match('<')) {
      this.keyMessage = 'author';
      this.flag = true;
      console.log('match author');

    }
    if ( type.name === 'title' && this.book.title.match('<')) {
      console.log('match title');
      this.keyMessage = 'title';
      this.flag = true;
    }
    if (type.name === 'cover' && this.book.cover.match('<')) {
      this.keyMessage = 'cover';
      this.flag = true;
    }

    if (type.name === 'kind' && this.book.kind.match('<')) {
      this.keyMessage = 'kind';
      this.flag = true;
    }

    if (type.name === 'price' && this.book.price.match('<')) {
      this.keyMessage = 'price';
      this.flag = true;
    }

    if (type.name === 'numberOfBooks' && this.book.numberOfBooks.match('<')) {
      this.keyMessage = 'numberOfBooks';
      this.flag = true;
    }

    return this.flag;
  }

  addBook() {
    this.bookService.addBook(this.book).subscribe((data: any) => {
      if (data.success) {
        console.log(data);
        this.messageService.add({severity: 'success', summary: 'Service Message', detail: 'Book added correctly'});
      } else {
        console.log(data.message);
        this.messageService.add({severity: 'error', summary: 'Service Message', detail: 'Book not added correctly'});
      }
    });
  }

}
