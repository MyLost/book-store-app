import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ImageModule } from "primeng/image";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "primeng/tabs";
import { PromotionsService } from "../../common/promotions/promotions.service";
import { environment } from "../../../environments/environment";
import { TableModule } from "primeng/table";
import { Observable } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { Panel } from "primeng/panel";


@Component({
    selector: 'app-list-store',
    templateUrl: './promotions.component.html',
  imports: [
    ButtonModule,
    RippleModule,
    ImageModule,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    TableModule,
    AsyncPipe,
    Panel
  ],
    styleUrls: ['./promotions.component.css'],
    providers: []
})
export class PromotionsComponent implements OnInit {

  private svc = inject(PromotionsService);
  protected $promotions: Observable<any>;


  constructor() { }

  ngOnInit() {
    this.$promotions = this.svc.getList({url: environment.backendFullHost + "promotions"});
  }
}
