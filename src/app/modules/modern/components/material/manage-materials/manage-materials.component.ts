import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-materials',
  templateUrl: './manage-materials.component.html',
  styleUrls: ['./manage-materials.component.css']
})
export class ManageMaterialsComponent implements OnInit {
  materials = [
    {
      image: 'https://www.123sazeh.com/wp-content/uploads/2017/03/1147-large_default-2.jpg',
      name: 'آجر ۳۰ سانتی',
      category_name: 'نمای ساختمانی',
      status: 'فعال'
    },
    {
      image: 'https://www.sakhtemoon.com/filemanager/companycontent/7548/product/newprimage21398108235651.jpg',
      name: 'موزاییک',
      category_name: 'اسکلت بتنی',
      status: 'غیر فعال'
    },
    {
      image: 'https://ostovarsazan.com/wp-content/uploads/2020/05/%D8%A8%D8%AA%D9%86-%D8%A7%DA%A9%D8%B3%D9%BE%D9%88%D8%B2-ostovarsazan.com-.jpg',
      name: 'بتن',
      category_name: 'رنگ آمیزی',
      status: 'پیشنهادی'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
