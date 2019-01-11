import { Component, ViewChild } from '@angular/core';
import { Question } from '../../interfaces/question';
import { QuestionsService } from '../../services/questions.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/interfaces/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styles: []
})
export class QuestionComponent {

  public newQuestion: Question;
  public questionForm: FormGroup;
  public categories: Category[];
  public files: File[] = [];
  constructor(private _QS: QuestionsService, private router: Router, private _category: CategoriesService) {
    if (localStorage.getItem('manager') !== null) {
      this.buildForm();
    } else {
      this.router.navigate(['/login']);
    }
  }

  buildForm() {
    this._category.getAllCategories().subscribe((categories: any) => {
      this.categories = categories.categoriesDB;
    });
    this.questionForm = new FormGroup({
      questionDescription: new FormControl('', Validators.required),
      options: new FormControl(''),
      correctOption: new FormControl(''),
      category: new FormControl('', Validators.required)
    });
  }
  createNewQuestion() {
    this.newQuestion = this.questionForm.value;
    this.newQuestion.options = ['90', '73', '14', '45'];
    this.newQuestion.correctOption = '73';
    this._QS.addNewQuestion(this.files, this.newQuestion).then(() => {
      this.questionForm.reset();
      this.router.navigate(['/questions']);
    }).catch((err) => {
      console.log(err);
    });
  }
  checkExtension(event) {
    this.files = event.target.files;
  }

}
