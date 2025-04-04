import { Component, OnInit, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NavService } from './nav.service';
import { TabMenuModule } from 'primeng/tabmenu';
import { LanguageComponent } from '../../common/language/language.component';
import { Store } from '@ngrx/store';
import { LoginState } from '../../redux/store/login.state';
import { TranslateModule } from "@ngx-translate/core";
import { loginEmitter, logout, translateEmitter } from "../../common/Utils";
import { MenubarModule } from "primeng/menubar";

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
  imports: [
    TabMenuModule,
    LanguageComponent,
    TranslateModule,
    MenubarModule
  ],
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  protected items = signal<MenuItem[]>([]);

  protected currentData = new Date().toLocaleString();

  constructor(
    private navSvc: NavService,
    private store: Store<LoginState>
  ) {}

  ngOnInit() {
    this.navSvc.loadMenuItems().then(menuItems => this.items.set(menuItems));
    translateEmitter.subscribe( () => {
      this.navSvc.loadMenuItems().then(menuItems => {
        this.items.set(menuItems)
      });
      loginEmitter.subscribe( (login) => { this.navSvc.loadMenuItems().then(menuItems => {
        this.items.set(menuItems)
      })})
      logout.subscribe( (logout) => { this.navSvc.loadMenuItems().then(menuItems => {
        this.items.set(menuItems)
      }); })
    });
  }
}
