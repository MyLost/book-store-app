import { NgModule } from '@angular/core';
import { appRouts } from './app.routes';

import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { loginReducer } from './redux/reducers/LoginReducer';
import { StoreModule } from '@ngrx/store';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NavComponent } from './menu/nav/nav.component';
import { httpInterceptorProviders } from './Interceptors/interceptors';
import { ToastModule } from 'primeng/toast';

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
        deps: [HttpClient]
      }
    }),
    ToastModule,
  ],
  bootstrap: [ AppComponent ],
  providers: [ httpInterceptorProviders ]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}
