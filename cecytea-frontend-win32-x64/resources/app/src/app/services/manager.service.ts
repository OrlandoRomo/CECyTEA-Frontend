import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Manager } from '../interfaces/manager';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../interfaces/category';
import { GetTokenService } from './get-token.service';


@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private _http: HttpClient, private _getToken: GetTokenService) { }

  createNewManager(manager: Manager) {
    return this._http.post('https://cecytea-app.herokuapp.com/manager', manager).pipe(catchError(this.erroHandler));
  }
  getAllStudents() {
    const httpOptions = {
      headers: new HttpHeaders({
        'token': this._getToken.getTokenLocalStorage()
      })
    };
    return this._http.get('https://cecytea-app.herokuapp.com/manager/users/all', httpOptions).pipe(catchError(this.erroHandler));
  }
  private erroHandler(err: HttpErrorResponse): Observable<any> {
    let message: string;
    if (err.status === 0) {
      message = 'No se pudo conectar con el servidor, inténtelo más tarde.';
    }
    throw message;
  }
}
