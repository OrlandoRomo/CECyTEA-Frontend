import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetTokenService } from './get-token.service';
import { Question } from '../interfaces/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private _http: HttpClient, private _getToken: GetTokenService) {
  }
  getAllQuestions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'token': this._getToken.getTokenLocalStorage(),
      })
    };
    return this._http.get('http://localhost:3000/questions', httpOptions);
  }
  deleteQuestionById(id: String) {
    const httpOptions = {
      headers: new HttpHeaders({
        'token': this._getToken.getTokenLocalStorage(),
      })
    };
    return this._http.delete(`http://localhost:3000/question/${id}`, httpOptions);
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
      console.log(formData.getAll('options'));
      formData.append('manager', this._getToken.getIdManagerLocalStorage());
      formData.append('category', question.category.toString());
      formData.append('correctOption', question.correctOption.toString());
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Imagen subida');
            resolve(xhr.response);
          } else {
            console.log('Fallo la subida');
            reject(xhr.response);
          }
        }
      };
      let url = 'http://localhost:3000/question';
      xhr.open('POST', url, true);
      xhr.setRequestHeader('token', token);
      xhr.send(formData);
    });
  }
}
