import { Component, ViewChild } from '@angular/core';
import { TestsService } from '../../../services/tests.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {

  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;
  public listTests: any[] = [];
  public hasError = false;
  public errMessage: string;

  public doughnutChartLabels: string[] = ['Correctas', 'Incorrectas'];
  public doughnutChartData: number[] = [0, 0];
  public doughnutChartType: string = 'doughnut';
  public averagePerTest: number;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = [String(new Date().getFullYear())];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: any[] = [];
  public averageTests: number;
  isLoading = false;
  constructor(private _TS: TestsService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe(params => this.getTestsById(params['id']));
  }
  getTestsById(id: string) {
    this.isLoading = true;
    this._TS.getTestsByUserId(id).subscribe((tests) => {
      this.isLoading = false;
      this.listTests = tests.testsDB;
    }, (err) => {
      this.isLoading = false;
      this.errMessage = err;
      this.hasError = true;
    });
  }
  goToTheBeginning() {
    this.viewPort.scrollToIndex(0);
  }
  goToTheEnd() {
    this.viewPort.scrollToIndex(this.listTests.length);
  }
  returnListUsers() {
    this.router.navigate(['/users']);
  }
  showModal(idTest: string) {
    this.doughnutChartData = [];
    this.listTests.forEach((test) => {
      if (test._id === idTest) {
        this.doughnutChartData.push(Number(test.correctAnswers));
        this.doughnutChartData.push(Number(test.incorrectAnswers));
        this.averagePerTest = (test.correctAnswers / 20) * 10;
      }
    });
    console.log(this.doughnutChartData);
  }
  getAverage() {
    this.barChartData = [];
    let testsAverage = 0;
    this.listTests.forEach((test, index) => {
      let testAverage = [];
      testsAverage += (test.correctAnswers / 20) * 10;
      testAverage['data'] = [(test.correctAnswers / 20) * 10];
      testAverage['label'] = `Test ${index + 1}`;
      this.barChartData.push(testAverage);
    });
    this.averageTests = testsAverage / this.listTests.length;
  }
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
