import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Chart } from 'chart.js';
import { Report } from 'src/app/models/Report';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('lineChart', { static: false }) private chartRef;
  chart: any;

  reports: any = {};

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.getOrders();
  }

  /**
   * This will create the line chart
   *
   * @memberof DashboardComponent
   */
  createReport() {
    const ctx = this.chartRef.nativeElement.getContext('2d');
    setTimeout(() => {
      Chart.defaults.global.defaultFontSize = '18';
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.reports.timeAndOrders.time,
          datasets: [{
            data: this.reports.timeAndOrders.orders,
            label: 'Orders',
            borderColor: '#f88930',
            backgroundColor: 'rgba(254, 252, 247, 0.3)',
            fill: true
          }],
        },
        options: {
          legend: {
            defaultFontSize:14,
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
    });
    });
  }

  /**
   * This will get all orders from
   * API
   * @memberof DashboardComponent
   */
  getOrders() {
    this.dashboardService.getReport().subscribe(
      (response: Report ) => {
        this.reports = response;
        this.createReport();
      },
      error => {
        console.log(error);
      }
    );
  }
}
