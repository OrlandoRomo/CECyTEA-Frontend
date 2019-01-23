import { Component, } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Category } from '../../interfaces/category';
import { CategoriesService } from '../../services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styles: []
})
export class CategoryComponent {

  public categoryForm: FormGroup;
  public newCategory: Category;
  public hasError = false;
  public erroMessage: string;
  isLoading = false;
  constructor(private _CS: CategoriesService, private router: Router) {
    this.buildForm();
  }
  buildForm() {
    this.categoryForm = new FormGroup({
      nameCategory: new FormControl('', Validators.required)
    });
  }
  createNewCategory() {
    this.newCategory = this.categoryForm.value;
    this.isLoading = true;
    this._CS.addNewCategory(this.newCategory).subscribe(() => {
      this.isLoading = false;
      this.categoryForm.reset();
      this.router.navigate(['/categories']);
    }, error => {
      this.isLoading = false;
      this.categoryForm.reset();
      this.erroMessage = error;
      this.hasError = true;
    });
  }
}
