import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Manager } from '../../interfaces/manager';
import { ManagerService } from 'src/app/services/manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-manager',
  templateUrl: './create-manager.component.html',
  styles: []
})
export class CreateManagerComponent {
  public managerForm: FormGroup;
  public manager: Manager;
  public hasError = false;
  public errMessage: String;
  constructor(private _ms: ManagerService, private router: Router) {
    this.buildForm();
  }

  buildForm() {
    this.managerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')
      ]),
      password: new FormControl('', Validators.required)
    });
  }
  createNewManager() {
    this.manager = this.managerForm.value;
    this._ms.createNewManager(this.manager).subscribe((message) => {
      this.hasError = true;
      setTimeout(() => this.router.navigate(['/login']), 2000);
    }, (error) => {
      this.managerForm.reset();
      this.errMessage = error.error.err.errors.email.message;
      this.hasError = true;
    });
  }


}
