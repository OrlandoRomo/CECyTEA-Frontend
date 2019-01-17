import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { GetTokenService } from './get-token.service';
import { Question } from '../interfaces/question';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private _http: HttpClient, private _getToken: GetTokenService) {
  }
  getAllQuestions(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'token': this._getToken.getTokenLocalStorage(),
      })
    };
    return this._http.get('https://cecytea-app.herokuapp.com/questions', httpOptions).pipe(catchError(this.erroHandler));
  }
  deleteQuestionById(id: String) {
    const httpOptions = {
      headers: new HttpHeaders({
        'token': this._getToken.getTokenLocalStorage(),
      })
    };
    return this._http.delete(`https://cecytea-app.herokuapp.com/question/${id}`, httpOptions);
  }

  addNewQuestion(filesImages: File[], question: Question) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      let token = this._getToken.getTokenLocalStorage();
      for (const file of filesImages) {
        formData.append('images', file, file.name);
      }
      formData.append('questionDescription', question.questionDescription.toString());
      for (let i = 0; i < question.options.length; i++) {
        formData.append('options', question.options[i].toString());
      }
      formData.append('manager', this._getToken.getIdManagerLocalStorage());
      formData.append('category', question.category.toString());
      formData.append('correctOption', question.correctOption.toString());
      xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {
          if (xhr.status === 0) {
            reject('No se pudo conectar con el servidor, inténtelo más tarde.');
          }
          if (xhr.status === 200) {
            console.log('Imagen subida');
            resolve(xhr.response);
          } else {
            console.log();
            reject('La pregunta ya existe.');
          }
        }
      };
      let url = 'https://cecytea-app.herokuapp.com/question';
      xhr.open('POST', url, true);
      xhr.setRequestHeader('token', token);
      xhr.send(formData);
    });
  }

  updateQuestion(question: Question) {
    const httpOptions = {
      headers: new HttpHeaders({
        'token': this._getToken.getTokenLocalStorage(),
      })
    };
    // tslint:disable-next-line:max-line-length
    return this._http.put(`https://cecytea-app.herokuapp.com/question/${question._id}`, question, httpOptions).pipe(catchError(this.erroHandler));
  }

  private erroHandler(err: HttpErrorResponse): Observable<any> {
    // tslint:disable-next-line:prefer-const
    let message: string;
    if (err.status === 400) {
      message = 'La pregunta ya existe';
    }
    console.log(err.status);
    if (err.status === 0) {
      message = 'No se pudo conectar con el servidor, inténtelo más tarde.';
    }
    throw message;
  }
}
