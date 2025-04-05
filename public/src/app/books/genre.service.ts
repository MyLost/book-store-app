import { BaseService } from "../common/base.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Genre } from "./common/Genre";

@Injectable({providedIn: 'root'})
export class GenreService extends BaseService<any> {

  private genreUrl = this.baseUrl + 'genres';

  // headers = new HttpHeaders(header);

  constructor(private http: HttpClient) {
    super(http);
  }

  getGenres() {
    return this.http.get<Genre[]>(this.genreUrl, {});
  }
}
