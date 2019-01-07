import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Manager } from '../interfaces/manager';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) {

  }
  checkUser(user: Manager) {
    return this._http.post('http://localhost:3000/loginManager', user);
  }
}

