import {Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {appGuard} from "../auth/guards";
import {PromotionsComponent} from "../books/promotions/promotions.component";
import {StoreComponent} from "../books/store/store.book.component";
import {MailComponent} from "../common/mail/mail.component";
import {EmployeesComponent} from "../Employees/employees.component";
import {EditUserComponentComponent} from "../user/edit/edit-user-component.component";
import {DeleteUserComponent} from "../user/delete/delete-user.component";
import { ManageComponent } from "./manage/manage.component";

export const dashboardRouts: Routes = [
  { path: '', component: DashboardComponent, canActivateChild: [appGuard], children: [
    { path: 'manage', component: ManageComponent, children: [
        { path: 'books', loadChildren: () => import('../books/book.router').then(routes => routes.bookRouts) }
      ]},
    { path: 'manage/promotions', component: PromotionsComponent},
    { path: 'manage/edit-user', component: EditUserComponentComponent},
    { path: 'manage/delete-user', component: DeleteUserComponent},
    { path: 'manage/store' , component: StoreComponent},
    { path: 'manage/mail', component: MailComponent},
    { path: 'manage/employees', component: EmployeesComponent}
    ]},
];

