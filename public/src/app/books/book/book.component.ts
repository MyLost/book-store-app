import { Component, OnInit } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { AllBooksComponent } from '../allbooks/allbooks.component';
import { AddBookComponent } from '../addbook/addbook.component';
import { EditbookComponent } from '../editbook/editbook.component';
import { FindbookComponent } from '../findbook/findbook.component';
import { DeletebookComponent } from '../deletebook/deletebook.component';

@Component({
  selector: 'app-book',
  standalone: true,
  templateUrl: './book.component.html',
  imports: [
    TabViewModule,
    AllBooksComponent,
    AddBookComponent,
    EditbookComponent,
    FindbookComponent,
    DeletebookComponent,
  ],
  styleUrls: ['./book.component.css']
})

export class BookComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
