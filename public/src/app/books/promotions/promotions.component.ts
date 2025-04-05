import { Component, inject, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ImageModule } from "primeng/image";
import { PromotionsService } from "../../common/promotions/promotions.service";
import { environment } from "../../../environments/environment";
import { TableModule } from "primeng/table";
import { Observable } from "rxjs";
import { AsyncPipe, NgTemplateOutlet } from "@angular/common";
import { Panel } from "primeng/panel";
import { BookService } from "../book.service";
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel } from "primeng/accordion";
import { Dialog } from "primeng/dialog";

@Component({
    selector: 'app-list-store',
    templateUrl: './promotions.component.html',
  imports: [
    ButtonModule,
    RippleModule,
    ImageModule,
    TableModule,
    AsyncPipe,
    Panel,
    Accordion,
    AccordionPanel,
    AccordionHeader,
    AccordionContent,
    NgTemplateOutlet,
    Dialog
  ],
    styleUrls: ['./promotions.component.css'],
    providers: []
})
export class PromotionsComponent implements OnInit {

  protected $promotions: Observable<any>;
  protected categories = signal<any[]>(null);

  protected add = signal<boolean>(false);
  protected delete = signal<boolean>(false);
  protected edit = signal<boolean>(false);

  private _bookSvc = inject(BookService);
  private _svc = inject(PromotionsService);

  constructor() {}

  ngOnInit() {
    this.$promotions = this._svc.getList({url: environment.backendFullHost + "promotions"});
    this._bookSvc.getCategories().subscribe(categories => this.categories.set(categories));
  }

}
