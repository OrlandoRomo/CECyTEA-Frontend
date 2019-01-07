import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {

  public isLoading = true;
  constructor() {
    setTimeout(() => this.isLoading = false,2000);
  }
}
