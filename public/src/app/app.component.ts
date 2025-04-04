import {Component, OnInit, signal} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import {LoadingService} from './loading.service';
import {delay, lastValueFrom} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from './auth/auth.service';
import {environment} from "../environments/environment";
import {TranslateService} from "@ngx-translate/core";
import {translateEmitter} from "./common/Utils";
import {BookService} from "./books/book.service";
import {Genre} from "./books/common/Genre";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit {

  protected genreItems = [];

  protected loading = false;

  protected title = 'BookStore';

  protected sideBarItems = signal<MenuItem[]>([]);

  protected readonly environment = environment;

  constructor(
    private authSvc: AuthService,
    private _loading: LoadingService,
    private router: Router,
    private translate: TranslateService,
    private bookSvc: BookService
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

    this.bookSvc.getCategories().subscribe(categories => {
      const newItems = categories.map(category => ({
        label: category.name,
        items: category.genres.map(g => ({
          label: g.name,
          routerLink: ['books', 'genre', g.id]
        }))
      }));
      this.sideBarItems.update((items: MenuItem[]) => [...items, ...newItems]);
    });
  }

  private get getSideBarItems() {
    return this.sideBarItems();
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
      if(item.items) {
        this.translateGenres(item.items).then(keys => {
          for(let entry of item.items) {
            entry.label = keys[entry.label];
          }
        });

      }
      item.label = translations[item.label];
      return item;
    });
  }

  private async translateGenres(items: MenuItem[]) {
    return await lastValueFrom(this.translate.get(items.map(item => item.label)));
  }

}

