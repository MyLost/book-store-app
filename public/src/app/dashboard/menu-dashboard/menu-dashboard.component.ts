import { Component, OnInit } from '@angular/core';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { dashboard, deleteUser, editUser } from '../../common/Utils';
import { PanelMenuModule } from 'primeng/panelmenu';
import {MenubarModule} from "primeng/menubar";
@Component({
  selector: 'app-menu-dashboard',
  standalone: true,
  templateUrl: './menu-dashboard.component.html',
  imports: [ PanelMenuModule, MenubarModule ],
  styleUrls: ['./menu-dashboard.component.css']
})
export class MenuDashboardComponent implements OnInit {

  items: MenuItem[];

  constructor() {}

    ngOnInit() {
      this.items = [
        {
          label: 'Promotions',
          icon: 'pi pi-list',
          routerLink: ['manage/promotions']
        },
        {
          label: 'Store',
          icon: 'pi pi-database',
          routerLink: ['manage/store'],
        },
        {
          label: 'Mail',
          icon: 'pi pi-envelope',
          command (event: MenuItemCommandEvent) {
            dashboard.emit(false);
          },
          routerLink: ['manage/mail'],
        },
        {
          label: 'USER',
          icon: 'pi pi-user',
          items: [
            { label: 'Edit User', icon: '', routerLink: ['manage/edit-user'] },
            { label: 'Delete User', icon: '', routerLink: ['manage/delete-user'] }
          ]
        },
        {
          label: 'Employees',
          command (event: MenuItemCommandEvent) {
            dashboard.emit(false);
          },
          icon: 'pi pi-users',
          routerLink: ['manage/employees'],
        },
        {
          label: 'Manage books',
          icon: 'pi pi-list',
          routerLink: ['manage/books']
        },
      ];
    }
}


