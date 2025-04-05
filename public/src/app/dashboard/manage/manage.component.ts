import { Component, inject, OnInit, signal } from '@angular/core';
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel, AccordionTabOpenEvent } from "primeng/accordion";
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from "@angular/router";
import { Button } from "primeng/button";
import { BookService } from "../../books/book.service";

@Component({
  selector: 'app-manage',
  imports: [
    Accordion,
    AccordionPanel,
    AccordionHeader,
    AccordionContent,
    Button,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.scss'
})
export class ManageComponent implements OnInit {

  protected categoryOutletMapping = new Map();

  protected active = signal<string | unknown>(null);
  protected categories = signal<any[]>(null);

  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _bookSvc = inject(BookService);

  protected open(event: AccordionTabOpenEvent) {
    if(event.index == 0) {
      this._router.navigate(['books'], {relativeTo: this._route});
    }
  }

  ngOnInit(): void {
    this._bookSvc.getCategories().subscribe(categories => this.categories.set(categories));
    this.initializeCategoryOutletMapping();
  }

  private initializeCategoryOutletMapping() {
    this.categoryOutletMapping.set("Books", 'books');
  }

}
