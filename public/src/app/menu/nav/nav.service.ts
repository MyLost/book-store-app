import {Injectable} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {dashboard} from '../../common/Utils';
import {TranslateService} from "@ngx-translate/core";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor(
    private authService: AuthService,
    private translateService: TranslateService
    ) {}

  private get menuItems() {
    return [
      { label: 'Home',  icon: 'pi pi-home',  routerLink: ['/home']},
      { label: 'About', icon: 'pi pi-info',  routerLink: ['/about'] },
      { label: 'Login', icon: 'pi pi-sign-in', routerLink: ['/login'], visible: !this.authService.isLoggedIn() },
      { label: 'Register', icon: 'pi pi-user-plus', routerLink: ['/register'], visible: !this.authService.isLoggedIn() },
      { label: 'Dashboard', icon: 'pi pi-plus', visible: this.authService.isLoggedIn(), routerLink: ['/dashboard'] },
      { label: 'Books', icon: 'pi pi-book', visible: this.authService.isLoggedIn(), routerLink: ['/books'] },
      {
        label: 'Logout',  icon: 'pi pi-sign-out',  routerLink: ['/logout'],
        visible: this.authService.isLoggedIn(),
        command: () => { }
      },
    ];
  }

  private get menuItemLabels() {
    return this.menuItems.map(item => item.label);
  }

  private getTranslateMenuItemLabels() {
    let promise = lastValueFrom(this.translateService.get(this.menuItemLabels));
    promise.then();
    return promise;
  }

  async loadMenuItems() {
    const translations = await this.getTranslateMenuItemLabels();
    return this.menuItems.map(item => {
      item.label = translations[item.label];
      return item;
    });
  }
}
