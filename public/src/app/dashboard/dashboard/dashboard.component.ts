import { Component, OnDestroy, OnInit } from '@angular/core';
import { dashboard, editUser } from '../../common/Utils';
import { SidebarModule } from 'primeng/sidebar';
import { MenuDashboardComponent } from '../menu-dashboard/menu-dashboard.component';
import { EditUserComponentComponent } from '../../user/edit-user-component/edit-user-component.component';
import { AuthService } from '../../auth/auth.service';
import { User, UserInterface } from '../../user/User';
import { DeleteUserComponent } from "../../user/delete-user/delete-user.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [
    SidebarModule,
    MenuDashboardComponent,
    EditUserComponentComponent,
    DeleteUserComponent
  ],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  protected display = false;
  protected user: UserInterface;

  constructor(
    private authSvc: AuthService
  ) {
    editUser.subscribe(user => {
      this.display = false;
      this.authSvc.user.subscribe((user: UserInterface) => { this.user = user; });
    });
  }

  ngOnDestroy(): void {
    dashboard.unsubscribe();
  }

  ngOnInit() {
    this.authSvc.user?.subscribe((user: UserInterface) => this.user = user);
    dashboard.subscribe((show: boolean) => this.display = show);
  }
}

