import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { GetTokenService } from './get-token.service';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../interfaces/category';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _http: HttpClient, private _getToken: GetTokenService) { }
  getAllCategories(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'token': this._getToken.getTokenLocalStorage(),
      })
    };
    return this._http.get(`https://cecytea-app.herokuapp.com/category`, httpOptions).pipe(catchError(this.erroHandler));
  }
  deleteCategoryById(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'token': this._getToken.getTokenLocalStorage(),
      })
    };
    return this._http.delete(`https://cecytea-app.herokuapp.com/category/${id}`, httpOptions).pipe(catchError(this.erroHandler));
  }
  addNewCategory(category: Category) {
    const httpOptions = {
      headers: new HttpHeaders({
        'token': this._getToken.getTokenLocalStorage(),
      })
    };
    return this._http.post(`https://cecytea-app.herokuapp.com/category`, category, httpOptions).pipe(catchError(this.erroHandler));
  }
  updateCategory(category: Category) {
    const httpOptions = {
      headers: new HttpHeaders({
        'token': this._getToken.getTokenLocalStorage(),
      })
    };
    // tslint:disable-next-line:max-line-length
    return this._http.put(`https://cecytea-app.herokuapp.com/category/${category._id}`, category, httpOptions).pipe(catchError(this.erroHandler));
  }
  private erroHandler(err: HttpErrorResponse): Observable<any> {
    let message: string;
    if (err.status === 500) {
      message = 'La categoría ya existe.';
    }
    if (err.status === 0) {
      message = 'No se pudo conectar con el servidor, inténtelo más tarde.';
    }
    throw message;
  }
}
