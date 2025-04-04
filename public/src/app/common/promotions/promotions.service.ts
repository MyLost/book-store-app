import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class PromotionsService extends BaseService<any> {

  // headers = new HttpHeaders(header);

  constructor(private http: HttpClient) {
    super(http);
  }
}
