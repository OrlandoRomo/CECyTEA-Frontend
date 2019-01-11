import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Manager } from '../interfaces/manager';
@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private _http: HttpClient) { }

  createNewManager(manager: Manager) {
    return this._http.post('http://localhost:3000/manager', manager);
  }
}
