import { Component, OnInit } from '@angular/core';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { dashboard, deleteUser, editUser } from '../../common/Utils';
import { PanelMenuModule } from 'primeng/panelmenu';
@Component({
  selector: 'app-menu-dashboard',
  standalone: true,
  templateUrl: './menu-dashboard.component.html',
  imports: [ PanelMenuModule ],
  styleUrls: ['./menu-dashboard.component.css']
})
export class MenuDashboardComponent implements OnInit {

  items: MenuItem[];

  constructor() {}

    ngOnInit() {
      this.items = [
        {
          label: 'Promotion',
          icon: 'pi pi-list',
          routerLink: '/listBook'
        },
        {
          label: 'Store',
          icon: 'pi pi-database',
          routerLink: '/storeBook',
        },
        {
          label: 'Mail',
          icon: 'pi pi-envelope',
          command (event: MenuItemCommandEvent) {
            dashboard.emit(false);
          },
          routerLink: '/mail',
        },
        {
          label: 'USER',
          icon: 'pi pi-user',
          items: [
            { label: 'Edit User', icon: '', command: () => { editUser.emit(true); } },
            { label: 'Delete User', icon: '', command: () => { deleteUser.emit(true);  } }
          ]
        },
        {
          label: 'Employees',
          command (event: MenuItemCommandEvent) {
            dashboard.emit(false);
          },
          icon: 'pi pi-users',
          routerLink: '/employees',
        },
      ];
    }
}


