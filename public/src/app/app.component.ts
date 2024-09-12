import {Component, OnInit, signal} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import {LoadingService} from './loading.service';
import {delay, lastValueFrom} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from './auth/auth.service';
import {environment} from "../environments/environment";
import {TranslateService} from "@ngx-translate/core";
import {translateEmitter} from "./common/Utils";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ MessageService ]
})
export class AppComponent implements OnInit {

  protected loading = false;

  protected title = 'BookStore';

  protected sideBarItems = signal<MenuItem[]>([]);

  protected readonly environment = environment;

  constructor(
    private authSvc: AuthService,
    private _loading: LoadingService,
    private router: Router,
    private translate: TranslateService
    ) { }

  ngOnInit() {

    if (!this.authSvc.isLoggedIn() && this.authSvc.getExpiration() != null) {
      this.router.navigate(['/logout']);
    }

    this.listenToLoading();

    this.loadMenuItems().then(data => {
      this.sideBarItems.set(data);
      translateEmitter.subscribe( () => {
        this.loadMenuItems().then(data => {
          this.sideBarItems.set(data);
        });
      })
    });
  }

  private get getSideBarItems() {
    return [
      {
        label: "Books",
        icon: 'pi pi-book',
        items: [],
        routerLink: ["books"]

      }
    ];
  }

  private listenToLoading(): void {
    this._loading.loading
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

  private get sideBarItemsLabels() {
    return this.getSideBarItems.map(item => item.label);
  }

  private getTranslateMenuItemLabels() {
    let promise = lastValueFrom(this.translate.get(this.sideBarItemsLabels));
    promise.then();
    return promise;
  }

  private async loadMenuItems() {
    const translations = await this.getTranslateMenuItemLabels();
    return this.getSideBarItems.map(item => {
      item.label = translations[item.label];
      return item;
    });
  }

}

