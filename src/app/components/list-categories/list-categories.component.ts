import { Component, ViewChild } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Category } from '../../interfaces/category';
import { FormGroup, Validators, FormControl } from '@angular/forms';
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
  public putCategory: Category = { _id: '', nameCategory: '' };
  public putCategoryError: Category = { _id: '', nameCategory: '' };
  public putCategoryForm: FormGroup;
  public hasErrorModal = false;
  public erroMessageModal: string;
  isLoading = false;
  constructor(private _CS: CategoriesService, private router: Router) {
    this.getAllCategories();
    this.buildForm();
  }
  getAllCategories() {
    this.isLoading= true;
    this._CS.getAllCategories().pipe((map((categories: any) => {
      this.isLoading = false;
      return categories.categoriesDB;
    }))).subscribe((categories: any) => {
      this.listCategories = categories;
    }, error => {
      this.isLoading = false;
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
  buildForm() {
    this.putCategoryForm = new FormGroup({
      nameCategory: new FormControl('', Validators.required)
    });
  }
  showEditModal(id: String) {
    this.putCategory = this.listCategories.find((category) => category._id === id);
    this.putCategoryForm = new FormGroup({
      nameCategory: new FormControl(this.putCategory.nameCategory, Validators.required)
    });
  }
  updateCategory() {
    this.putCategoryError = this.putCategoryForm.value;
    this.putCategoryError._id = this.putCategory._id;
    console.log(this.putCategoryError);
    this._CS.updateCategory(this.putCategoryError).subscribe(() => {
      this.hasErrorModal = false;
      window.location.reload();
    }, (err) => {
      this.erroMessageModal = err;
      this.hasErrorModal = true;
      console.log(this.putCategoryError);
    });
  }
  goToTheBeginning() {
    this.viewPort.scrollToIndex(0);
  }
  goToTheEnd() {
    this.viewPort.scrollToIndex(this.listCategories.length);
  }



}
