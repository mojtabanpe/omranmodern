import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-childs',
  templateUrl: './category-childs.component.html',
  styleUrls: ['./category-childs.component.css']
})
export class CategoryChildsComponent implements OnInit {
  groups = [
    {
    name: 'مشارکت و ساخت/ اخذ مجوز',
    productsCount: 3,
    sellersCount: 5,
    position: 0,
    is_active: true
  }, {
    name: 'خدمات آزمایشگاهی ساختمان',
    productsCount: 3,
    sellersCount: 5,
    position: 0,
    is_active: true
  }, {
    name: 'مهندس طراح/ شرکت مشاور',
    productsCount: 3,
    sellersCount: 5,
    position: 0,
    is_active: true
  }, {
    name: 'مهندس و شرکت های مجری',
    productsCount: 3,
    sellersCount: 5,
    position: 0,
    is_active: false
  }, {
    name: 'مصالح سفت کاری و نازک کاری',
    productsCount: 3,
    sellersCount: 5,
    position: 0,
    is_active: true
  }, {
    name: 'پیمانکاری جز',
    productsCount: 3,
    sellersCount: 5,
    position: 0,
    is_active: true
  }, {
    name: 'تاسیسات برقی و مکانیکی',
    productsCount: 3,
    sellersCount: 5,
    position: 0,
    is_active: false
  }, {
    name: 'تجهیزات/ ماشین آلات',
    productsCount: 3,
    sellersCount: 5,
    position: 0,
    is_active: true
  }
];
  constructor() { }

  ngOnInit(): void {
  }

}
