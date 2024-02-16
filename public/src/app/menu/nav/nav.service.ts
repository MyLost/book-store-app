import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { dashboard } from '../../common/Utils';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor(private authService: AuthService) {}

  public menuItems() {
    return [
      { label: 'Home',  icon: 'pi pi-home',  routerLink: ['/home']},
      { label: 'About', icon: 'pi pi-info',  routerLink: ['/about'] },
      { label: 'Login', icon: 'pi pi-sign-in', routerLink: ['/login'], visible: !this.authService.isLoggedIn() },
      { label: 'Register', icon: 'pi pi-user-plus', routerLink: ['/register'], visible: !this.authService.isLoggedIn() },
      {
        label: 'Dashboard', icon: 'pi pi-plus', visible: this.authService.isLoggedIn(),
        command: () => {
          dashboard.emit(true); }
      },
      {
        label: 'Logout',  icon: 'pi pi-sign-out',  routerLink: ['/logout'],
        visible: this.authService.isLoggedIn(),
        command: () => { }
      },
      { label: 'Books', icon: 'pi pi-book',  routerLink: ['/books'], visible: this.authService.isLoggedIn() },
      { label: 'Promotion', icon: 'pi pi-list', routerLink: ['/listBook'], visible: this.authService.isLoggedIn() },
      { label: 'Store', icon: 'pi pi-database', routerLink: ['/storeBook'], visible: this.authService.isLoggedIn() }
    ];
  }
}
