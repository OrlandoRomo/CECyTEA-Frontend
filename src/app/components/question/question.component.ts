import { Component, ViewChild, ElementRef } from '@angular/core';
import { Question } from '../../interfaces/question';
import { QuestionsService } from '../../services/questions.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Category } from 'src/app/interfaces/category';
import { CategoriesService } from '../../services/categories.service';
declare var UIkit: any;
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styles: []
})
export class QuestionComponent {

  @ViewChild('optionsInput') optionsInput: ElementRef;
  public newQuestion: Question;
  public questionForm: FormGroup;
  public categories: Category[];
  public files: File[] = [];
  public optionsArray: string[] = [];
  public correctAnswer: string;
  constructor(private _QS: QuestionsService, private router: Router, private _category: CategoriesService, private fb: FormBuilder) {
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
    this.questionForm = this.fb.group({
      questionDescription: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
    });
  }
  createNewQuestion() {
    this.newQuestion = this.questionForm.value;
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
  addNewOption(newOption: string) {
    this.optionsArray.push(newOption);
    this.optionsInput.nativeElement.value = '';
  }
  deleteOption(index: number) {
    this.optionsArray.splice(index, 1);
  }
  setCorrectAnswer(option: string) {
    this.correctAnswer = option;
    UIkit.notification({ message:  `${option} marcada como correcta`, status: 'success', pos: 'top-right', timeout: '500' });
  }
}
