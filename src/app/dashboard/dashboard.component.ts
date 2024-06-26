import { Component, ViewChild } from '@angular/core';
import { FirebaseService } from '../shared/services/firebase.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend,
  NgApexchartsModule
} from "ng-apexcharts";

import { series } from './data';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[]
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;


  constructor(private firebase: FirebaseService) {

    this.chartOptions = {
      series: [
        {
          name: "STOCK ABC",
          data: series.monthDataSeries1.prices
        }
      ],
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "Fundamental Analysis of Stocks",
        align: "left"
      },
      subtitle: {
        text: "Price Movements",
        align: "left"
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: "left"
      }
    };
  }
    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      setTimeout(async () => {
        await series.monthDataSeries1.prices.sort(this.firebase.sortData);
        this.chartOptions.series = ([{ name: "STOCK ABC", data: series.monthDataSeries1.prices }]);
        console.log(series.monthDataSeries1.prices
        );
      }, 1000);
    }
}
