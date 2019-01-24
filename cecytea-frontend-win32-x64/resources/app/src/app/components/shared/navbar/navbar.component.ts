import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Manager } from '../../../interfaces/manager';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent {
  public manager = {};
  public isShowing = false;
  constructor(private router: Router) {
    if (localStorage.getItem('manager') !== null) {
      this.isShowing = true;
      const managerStorage: any = JSON.parse(localStorage.getItem('manager'))['person'];
      this.manager['email'] = String(managerStorage['email']);
      this.manager['name'] = String(managerStorage['name']);
      this.manager['lastName'] = String(managerStorage['lastName']);
    } else {
      this.router.navigate(['/login']);
      this.isShowing = false;
    }
  }
  signOut() {
    localStorage.removeItem('manager');
    this.router.navigate(['/login']);
  }



}
