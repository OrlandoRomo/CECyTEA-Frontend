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
  public numberOfOptions = 0;
  public hasError = false;
  public errMessage: string;
  isLoading = false;
  constructor(private _QS: QuestionsService, private router: Router, private _category: CategoriesService, private fb: FormBuilder) {
    if (localStorage.getItem('manager') !== null) {
      this.buildForm();
    } else {
      this.router.navigate(['/login']);
    }
  }

  buildForm() {
    this.isLoading = true;
    this._category.getAllCategories().subscribe((categories: any) => {
      this.isLoading = false;
      this.categories = categories.categoriesDB;
    }, (error) => {
      this.isLoading = false;
      this.errMessage = error;
      this.hasError = true;
    });
    this.questionForm = this.fb.group({
      questionDescription: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
    });
  }
  createNewQuestion() {
    this.isLoading = true;
    if (this.correctAnswer !== undefined) {
      this.newQuestion = this.questionForm.value;
      this.newQuestion.options = this.optionsArray;
      this.newQuestion.correctOption = this.correctAnswer;
      this._QS.addNewQuestion(this.files, this.newQuestion).then(() => {
        this.isLoading = false;
        this.questionForm.reset();
        this.router.navigate(['/questions']);
      }).catch((err) => {
        this.isLoading = false;
        UIkit.notification({
          message: `${err}`,
          status: 'danger', pos: 'top-right', timeout: '1000'
        });
      });
    } else {
      this.isLoading = false;
      UIkit.notification({
        message: `Falta marca la respuesta correcta`,
        status: 'danger', pos: 'top-right', timeout: '1000'
      });
    }

  }
  checkExtension(event) {
    this.files = event.target.files;
  }
  addNewOption(newOption: string) {
    if (newOption !== '') {
      this.optionsArray.push(newOption);
      this.optionsInput.nativeElement.value = '';
      this.numberOfOptions++;
    }
  }
  deleteOption(index: number) {
    this.optionsArray.splice(index, 1);
    this.numberOfOptions--;
  }
  setCorrectAnswer(option: string) {
    this.correctAnswer = option;
    UIkit.notification({
      message: `<span class='uk-text-emphasis'>${option}</span> marcada como correcta`,
      status: 'primary', pos: 'top-right', timeout: '1000'
    });

  }
}
