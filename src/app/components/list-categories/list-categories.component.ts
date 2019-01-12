import { Component, ViewChild } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Category } from '../../interfaces/category';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent {

  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;
  public listCategories: Category[] = [];
  public hasError = false;
  public erroMessage: string;
  constructor(private _CS: CategoriesService, private router: Router) {
    this.getAllCategories();
  }
  getAllCategories() {
    this._CS.getAllCategories().pipe((map((categories: any) => {
      return categories.categoriesDB;
      console.log(categories);
    }))).subscribe((categories: any) => {
      this.listCategories = categories;
      console.log(categories);
    }, error => {
      this.erroMessage = error;
      this.hasError = true;
      console.log(this.erroMessage);
    });
  }
  deleteCategory(_id: string) {
    this._CS.deleteCategoryById(_id).subscribe(() => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }
  goToTheBeginning() {
    this.viewPort.scrollToIndex(0);
  }
  goToTheEnd() {
    this.viewPort.scrollToIndex(this.listCategories.length);
  }



}
