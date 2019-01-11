import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions.service';
import { map } from 'rxjs/operators';
import { Question } from 'src/app/interfaces/question';

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.css']
})
export class ListQuestionsComponent implements OnInit {

  public listQuestions: Question[] = [];
  public listOptions: String[] = [];
  public correctOption: String;
  constructor(private _QS: QuestionsService) {
    this._QS.getAllQuestions().pipe((map((questions: any) => {
      delete questions.questionsDB.manager;
      return questions.questionsDB;
    }))).subscribe((questions) => {
      this.listQuestions = questions;
      console.log(questions);
    });
  }

  showModal(options: String[], correctOption: String) {
    this.listOptions = options;
    this.correctOption = correctOption;
  }
  deleteQuestion(id: String) {
    this._QS.deleteQuestionById(id).subscribe(() => {
      console.log('Borrado');
    }, (err) => {
      console.log(err);

    });
  }
  ngOnInit() {
  }

}
