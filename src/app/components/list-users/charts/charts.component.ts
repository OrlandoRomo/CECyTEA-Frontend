import { Component } from '@angular/core';
import { TestsService } from '../../../services/tests.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {

  constructor(private _TS: TestsService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => this.getTestsById(params['id']));
  }
  getTestsById(id: string) {
    this._TS.getTestsByUserId(id).subscribe((tests) => {
      console.log(tests);
    }, (err) => {
    });
  }

}
