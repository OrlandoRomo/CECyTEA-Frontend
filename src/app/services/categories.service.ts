import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { GetTokenService } from './get-token.service';
import { Question } from '../interfaces/question';
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
    return this._http.get(`http://localhost:3000/category`, httpOptions).pipe(catchError(this.erroHandler));
  }
  deleteCategoryById(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'token': this._getToken.getTokenLocalStorage(),
      })
    };
    return this._http.delete(`http://localhost:3000/category/${id}`, httpOptions).pipe(catchError(this.erroHandler));
  }
  addNewCategory(category: Category) {
    const httpOptions = {
      headers: new HttpHeaders({
        'token': this._getToken.getTokenLocalStorage(),
      })
    };
    return this._http.post(`http://localhost:3000/category`, category, httpOptions).pipe(catchError(this.erroHandler));
  }
  private erroHandler(err: HttpErrorResponse): Observable<any> {
    let message: string;
    if (err.status === 0) {
      message = 'No se pudo conectar con el servidor, intelo más tarde.';
    }
    throw message;
  }
}
