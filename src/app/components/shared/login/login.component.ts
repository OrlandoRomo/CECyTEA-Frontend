import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ManagerLogin } from '../../../interfaces/managerLogin';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {

  public loginForm: FormGroup;
  public user: ManagerLogin;
  public hasError = false;
  public errMessage: String;
  constructor(private _auth: AuthService, private router: Router) {
    if (localStorage.getItem('manager') !== null) {
      this.router.navigate(['/home']);
    } else {
      this.buildForm();
    }

  }

  buildForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')
      ]),
      password: new FormControl('', Validators.required)
    });
  }
  checkManager() {
    this.user = this.loginForm.value;
    this._auth.checkUser(this.user).subscribe((manager: any) => {
      localStorage.setItem('manager', JSON.stringify(manager));
      this.router.navigate(['/home']);
    }, (err) => {
      this.hasError = true;
      this.errMessage = err.error.err['message'];
      this.loginForm.reset();
      return;
    });
  }
}
