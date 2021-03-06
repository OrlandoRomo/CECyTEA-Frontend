import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GetTokenService } from './get-token.service';

@Injectable({
  providedIn: 'root'
})
export class TestsService {

  constructor(private _http: HttpClient, private _getToken: GetTokenService) {

  }
  getTestsByUserId(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'token': this._getToken.getTokenLocalStorage()
      })
    };
    return this._http.get(`https://cecytea-app.herokuapp.com/test/${id}`, httpOptions).pipe(catchError(this.erroHandler));
  }
  private erroHandler(err: HttpErrorResponse): Observable<any> {

    let message: string;
    if (err.status === 400) {
      message = 'El estudiante no ha hecho ningún test.';
    }
    if (err.status === 0) {
      message = 'No se pudo conectar con el servidor, inténtelo más tarde.';
    }
    throw message;
  }
}
