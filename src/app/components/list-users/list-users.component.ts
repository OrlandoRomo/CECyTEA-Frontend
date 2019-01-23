import { Component, ViewChild } from '@angular/core';
import { ManagerService } from 'src/app/services/manager.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent {

  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;
  public listStudents: any[] = [];
  public hasError = false;
  isLoading = false;
  constructor(private _MS: ManagerService, private router: Router) {
    this.isLoading = true;
    this._MS.getAllStudents().subscribe((students) => {
      this.isLoading = false;
      this.listStudents = students.usersDB;
    }, err => {
      this.isLoading = false;
      console.log(err);
    });
  }
  goToTheBeginning() {
    this.viewPort.scrollToIndex(0);
  }
  goToTheEnd() {
    this.viewPort.scrollToIndex(this.listStudents.length);
  }
  seeTestsByUser(id: string) {
    this.router.navigate(['/charts', id]);
  }


}
