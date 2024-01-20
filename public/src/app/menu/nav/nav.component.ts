import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { NavService } from './nav.service';
import { TabMenuModule } from 'primeng/tabmenu';
import { DashboardComponent } from '../../dashboard/dashboard/dashboard.component';
import { LanguageComponent } from '../../common/language/language.component';
import { Store } from '@ngrx/store';
import { LoginState } from '../../redux/store/login.state';
import { logout } from '../../common/Utils';

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.component.html',
  imports: [
    TabMenuModule,
    DashboardComponent,
    LanguageComponent
  ],
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  protected items: MenuItem[];

  protected currentData = new Date().toLocaleString();

  constructor(
    private navSvc: NavService,
    private store: Store<LoginState>
  ) {}

  ngOnInit() {
    logout.subscribe(logout => {
      if (logout) {
        this.items = [...this.navSvc.menuItems()];
      }
    });
    this.store.select('loginData').subscribe(data => {
      this.items = [...this.navSvc.menuItems()];
    });
    this.items = this.navSvc.menuItems();
  }
}
