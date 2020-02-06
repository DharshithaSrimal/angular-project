import {Component, AfterViewInit, NgZone, ChangeDetectorRef, ViewRef} from '@angular/core';

import * as Prism from 'prismjs';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements AfterViewInit {
  public activeIndex: any = 0;
  chart: any;
  /**
   *
   * @param {NgZone} ngZone
   * @param {ChangeDetectorRef} changeDetectorRef
   */
  constructor(
    private ngZone: NgZone,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  /**
   * @method ngAfterViewInit
   */
  ngAfterViewInit() {
    Prism.highlightAll();

    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.activeIndex = [1, 2, 3];
        if (! (this.changeDetectorRef as ViewRef).destroyed) {
          this.changeDetectorRef.detectChanges();
        }
      }, 500);
    });
    
    this.chart = new Chart('canvas', {
      type: 'line',
    data: {
        labels: ['6', '12', '18', '24', '30', '36', '42', '48', '54', '60'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
  }
    });
  }

}