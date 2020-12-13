import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent implements OnInit {
  projects = []
  constructor() { }

  ngOnInit(): void {
    this.projects = [
      {
        code: '12331',
        title: 'پل صدر',
        tarafhesab: 'کاوه آفاق',
        vaziat: 'اتمام',
        tarikh: '1392/3/21'
      },
      {
        code: '12331',
        title: 'پل صدر',
        tarafhesab: 'کاوه آفاق',
        vaziat: 'اتمام',
        tarikh: '1392/3/21'
      },
      {
        code: '12331',
        title: 'پل صدر',
        tarafhesab: 'کاوه آفاق',
        vaziat: 'اتمام',
        tarikh: '1392/3/21'
      }, {
        code: '12331',
        title: 'پل صدر',
        tarafhesab: 'کاوه آفاق',
        vaziat: 'اتمام',
        tarikh: '1392/3/21'
      }
    ];
  }

}
