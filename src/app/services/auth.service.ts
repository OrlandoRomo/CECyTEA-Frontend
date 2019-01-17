import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ManagerLogin } from '../interfaces/managerLogin';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) {

  }
  checkUser(user: ManagerLogin) {
    return this._http.post('https://cecytea-app.herokuapp.com/loginManager', user).pipe(catchError(this.errorHandle));
  }
  private errorHandle(err: HttpErrorResponse): Observable<any> {
    let message;
    if (err.status === 400) {
      message = 'Correo o constraseña incorrectos.';
    }
    if (err.status === 0) {
      message = 'No se pudo conectar con el servidor, inténtelo más tarde.';
    }
    throw message;
  }
}

