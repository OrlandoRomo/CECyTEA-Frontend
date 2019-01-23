import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions.service';
import { map } from 'rxjs/operators';
import { Question } from 'src/app/interfaces/question';
import { Router } from '@angular/router';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../interfaces/category';
declare var UIkit: any;

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.css']
})
export class ListQuestionsComponent implements OnInit {

  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;
  @ViewChild('optionsInput') optionsInput: ElementRef;
  public listQuestions: Question[] = [];
  public listOptions: String[] = [];
  public correctOption: String;
  public hasError = false;
  public erroMessage: string;
  public questionForm: FormGroup;
  public listCategory: Category[] = [];
  public putQuestion: Question = { _id: '', questionDescription: '', options: [''], correctOption: '', category: [''] };
  public numberOfOptions = 4;
  public optionsArray: String[] = [];
  public correctAnswer: string;
  public listImgs: string[] = [];
  public putNewQuestion: Question = { _id: '', questionDescription: '', options: [''], correctOption: '', category: [''] };
  isLoading = false;
  constructor(private _QS: QuestionsService, private router: Router, private _CS: CategoriesService) {
    this.getQuestions();
    this.buildForm();
  }

  getQuestions() {
    this.isLoading = true;
    this._QS.getAllQuestions().pipe((map((questions: any) => {
      delete questions.questionsDB.manager;
      return questions.questionsDB;
    }))).subscribe((questions) => {
      this.isLoading = false;
      this.listQuestions = questions;
      console.log(questions);
    }, error => {
      this.isLoading = false;
      this.erroMessage = error;
      this.hasError = true;
      console.log(this.erroMessage);
    });
  }
  showModal(options: String[], correctOption: String) {
    this.listOptions = options;
    this.correctOption = correctOption;
  }
  deleteQuestion(id: String) {
    this._QS.deleteQuestionById(id).subscribe(() => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }
  buildForm() {
    this._CS.getAllCategories().subscribe((categories: any) => {
      this.listCategory = categories.categoriesDB;
    }, (error) => {
      this.erroMessage = error;
      this.hasError = true;
    });
    this.questionForm = new FormGroup({
      questionDescription: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
    });
  }
  showModalEdit(id: String) {
    this.putQuestion = this.listQuestions.find((category) => category._id === id);
    this.optionsArray = this.putQuestion.options;
    this.questionForm = new FormGroup({
      questionDescription: new FormControl(this.putQuestion.questionDescription, Validators.required),
      category: new FormControl(this.putQuestion.category['categoryName'], Validators.required)
    });
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
  updateQuestion() {
    if (this.correctAnswer !== undefined) {
      this.putNewQuestion = this.questionForm.value;
      this.putNewQuestion.options = this.optionsArray;
      this.putNewQuestion.correctOption = this.correctAnswer;
      this.putNewQuestion._id = this.putQuestion._id;
      this._QS.updateQuestion(this.putNewQuestion).subscribe(() => {
        window.location.reload();
      }, err => {
        UIkit.notification({
          message: `${err}`,
          status: 'danger', pos: 'top-right', timeout: '1000'
        });
      });
    } else {
      UIkit.notification({
        message: `Falta marca la respuesta correcta`,
        status: 'danger', pos: 'top-right', timeout: '1000'
      });
    }
  }
  showModalImages(urlImgs: string[]) {
    this.listImgs = urlImgs;
  }
  goToTheBeginning() {
    this.viewPort.scrollToIndex(0);
  }
  goToTheEnd() {
    this.viewPort.scrollToIndex(this.listQuestions.length);
  }
  ngOnInit() {
  }

}
