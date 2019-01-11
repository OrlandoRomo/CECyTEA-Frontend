import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ManagerLogin } from '../interfaces/managerLogin';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) {

  }
  checkUser(user: ManagerLogin) {
    return this._http.post('http://localhost:3000/loginManager', user);
  }
}

