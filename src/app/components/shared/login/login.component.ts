import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Manager } from '../../../interfaces/manager';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {

  public isShowing = false;
  public loginForm: FormGroup;
  public user: Manager;
  public hasError = false;
  public errMessage: String;
  constructor(private _auth: AuthService) {
    setTimeout(() => this.isShowing = true, 2000);
    this.buildForm();
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
    this._auth.checkUser(this.user).subscribe((data) => {
      console.log(data);
    }, (err) => {
      this.hasError = true;
      this.errMessage = err.error.err['message'];
      this.loginForm.reset();
      return;
    });
  }
}
