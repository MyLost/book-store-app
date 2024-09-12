import { ErrorHandler, importProvidersFrom, NgModule } from '@angular/core';
import { appRouts } from './app.routes';

import { AppComponent } from './app.component';
import { BrowserModule, provideClientHydration, withI18nSupport } from '@angular/platform-browser';
import { loginReducer } from './redux/reducers/LoginReducer';
import { StoreModule } from '@ngrx/store';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {
  HttpClient,
  HttpHandler,
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NavComponent } from './menu/nav/nav.component';
import { httpInterceptorProviders } from './Interceptors/interceptors';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CustomErrorHandler } from './common/Utils';
import { MessagesModule } from "primeng/messages";
import {environment} from "../environments/environment";
import {TieredMenuModule} from "primeng/tieredmenu";

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    NavComponent,
    RouterModule.forRoot(appRouts),
    RouterOutlet,
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      loginData: loginReducer
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [ HttpClient ]
      },
      defaultLanguage: environment.defaultLanguage
    }),
    ToastModule,
    ProgressSpinnerModule,
    MessagesModule,
    TieredMenuModule,
  ],
  bootstrap: [ AppComponent ],
  providers: [ MessageService, httpInterceptorProviders,
    provideHttpClient(withInterceptorsFromDi()),
    { provide: ErrorHandler, useClass: CustomErrorHandler },
  ]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}
