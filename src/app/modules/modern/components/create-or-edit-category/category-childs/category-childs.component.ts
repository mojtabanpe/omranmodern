import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-childs',
  templateUrl: './category-childs.component.html',
  styleUrls: ['./category-childs.component.css']
})
export class CategoryChildsComponent implements OnInit {
  subGroups = [
    {
    title: 'مشارکت و ساخت/ اخذ مجوز',
    productsCount: 3,
    sellersCount: 5,
    situation: 0,
    status: true
  }, {
    title: 'خدمات آزمایشگاهی ساختمان',
    productsCount: 3,
    sellersCount: 5,
    situation: 0,
    status: true
  }, {
    title: 'مهندس طراح/ شرکت مشاور',
    productsCount: 3,
    sellersCount: 5,
    situation: 0,
    status: true
  }, {
    title: 'مهندس و شرکت های مجری',
    productsCount: 3,
    sellersCount: 5,
    situation: 0,
    status: false
  }, {
    title: 'مصالح سفت کاری و نازک کاری',
    productsCount: 3,
    sellersCount: 5,
    situation: 0,
    status: true
  }, {
    title: 'پیمانکاری جز',
    productsCount: 3,
    sellersCount: 5,
    situation: 0,
    status: true
  }, {
    title: 'تاسیسات برقی و مکانیکی',
    productsCount: 3,
    sellersCount: 5,
    situation: 0,
    status: false
  }, {
    title: 'تجهیزات/ ماشین آلات',
    productsCount: 3,
    sellersCount: 5,
    situation: 0,
    status: true
  }
];
  constructor() { }

  ngOnInit(): void {
  }

}
