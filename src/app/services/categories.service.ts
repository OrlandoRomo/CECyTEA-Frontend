import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetTokenService } from './get-token.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _http: HttpClient, private _getToken: GetTokenService) { }
  getAllCategories() {
    const httpOptions = {
      headers: new HttpHeaders({
        'token': this._getToken.getTokenLocalStorage(),
      })
    };
    return this._http.get(`http://localhost:3000/category`, httpOptions);
  }
}
