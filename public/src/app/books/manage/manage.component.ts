import {Component, OnInit} from '@angular/core';
import {MenubarModule} from "primeng/menubar";
import {PanelModule} from "primeng/panel";
import {Router, RouterOutlet} from "@angular/router";
import {ToastModule} from "primeng/toast";
import {MenuItem} from "primeng/api";

@Component({
    selector: 'app-manage',
    imports: [
        MenubarModule,
        PanelModule,
        RouterOutlet,
        ToastModule
    ],
    templateUrl: './manage.component.html',
    styleUrl: './manage.component.scss'
})
export class ManageComponent implements OnInit {

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
