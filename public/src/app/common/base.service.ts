import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { PaginatorState } from "primeng/paginator";
import { Observable } from "rxjs";
import { HttpConfig } from "./http-config";



@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {

  private _baseUrl = environment.backendHost + '/api/v1/';
  private _httpClient: HttpClient;

  get baseUrl() {
    return this._baseUrl;
  }

  constructor(http: HttpClient) {
    this._httpClient = http;
  }

  getList(httpConfig: HttpConfig): Observable<T> {
    return this._httpClient.get<T>(httpConfig.url);
  }

  save(value: any, httpConfig: HttpConfig): Observable<T> {
    return this._httpClient.post<T>(httpConfig.url, value);
  }
}
