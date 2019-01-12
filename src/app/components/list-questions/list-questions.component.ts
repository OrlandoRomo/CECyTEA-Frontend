import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions.service';
import { map } from 'rxjs/operators';
import { Question } from 'src/app/interfaces/question';
import { Router } from '@angular/router';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.css']
})
export class ListQuestionsComponent implements OnInit {

  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;
  public listQuestions: Question[] = [];
  public listOptions: String[] = [];
  public correctOption: String;
  public hasError = false;
  public erroMessage: string;
  constructor(private _QS: QuestionsService, private router: Router) {
    this.getQuestions();
  }

  getQuestions() {
    this._QS.getAllQuestions().pipe((map((questions: any) => {
      delete questions.questionsDB.manager;
      return questions.questionsDB;
    }))).subscribe((questions) => {
      this.listQuestions = questions;
      console.log(questions);
    }, error => {
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
  goToTheBeginning() {
    this.viewPort.scrollToIndex(0);
  }
  goToTheEnd() {
    this.viewPort.scrollToIndex(this.listQuestions.length);
  }
  ngOnInit() {
  }

}
