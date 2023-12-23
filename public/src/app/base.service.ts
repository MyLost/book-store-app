import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {

  private _baseUrl = environment.backendHost + '/api/v1/';

  get baseUrl() {
    return this._baseUrl;
  }

  constructor() { }

}
