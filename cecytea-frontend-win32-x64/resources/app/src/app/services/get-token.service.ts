import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetTokenService {
  constructor() {
  }
  getTokenLocalStorage(): string {
    return String(JSON.parse(localStorage.getItem('manager'))['token']);
  }
  getIdManagerLocalStorage():string{
    return String(JSON.parse(localStorage.getItem('manager'))['person']['_id']);
  }
}
