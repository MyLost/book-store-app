import { Component, OnInit, ViewChild } from '@angular/core';
import { TabView, TabViewModule } from 'primeng/tabview';
import { AllBooksComponent } from '../allbooks/allbooks.component';
import { AddBookComponent } from '../addbook/addbook.component';
import { EditBookComponent } from '../editbook/editbook.component';
import { Router, RouterOutlet } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-book',
  standalone: true,
  templateUrl: './book.component.html',
  imports: [
    TabViewModule,
    AllBooksComponent,
    AddBookComponent,
    EditBookComponent,
    RouterOutlet,
    PanelModule,
    MenubarModule,
    ToastModule,
  ],
  styleUrls: ['./book.component.css']
})

export class BookComponent implements OnInit {

  protected items: MenuItem[];

  constructor(private router: Router) { }

  ngOnInit() {

    this.items = [
      { label: 'All' , routerLink: 'all' },
      { label: 'Add' , routerLink: 'add' },
      { label: 'Find', routerLink: 'find'},
    ];
  }
}
