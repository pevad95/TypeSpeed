import { Component, OnInit } from '@angular/core';
import {StatisticsService} from "../../services/statistics.service";
import {AppLanguageService} from "../../services/app-language.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  barChartType = 'bar';
  public barChartLegend: boolean = true;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{id: 'y-axis-1', type: 'linear', position: 'left', ticks: {min: 0}}]
    }
  };
  labels: string[];

  normalCaption: string;
  hardCaption: string;
  extremeCaption: string;
  resultCaption: string;

  constructor(public statistics: StatisticsService, private appLanguage: AppLanguageService) {

    this.chartData = [
      {data: [statistics.getNormalMax()], label: 'Normál / Normal'},
      {data: [statistics.getHardMax()], label: 'Nehéz / Hard'},
      {data: [statistics.getExtremeMax()], label: 'Extrém / Extreme'},
    ];

    this.labels = ['Szint / Level'];
  }

  chartData: any[];

  ngOnInit() {
  }

  firstTry(): boolean {
    return this.statistics.getTries() == 0;
  }


}
