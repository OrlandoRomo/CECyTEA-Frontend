import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {

  public isLoading = true;
  constructor(private route: Router) {
    setTimeout(() => {
      this.isLoading = false;
      this.route.navigate(['/login']);
    }, 2000);
  }
}
