import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {
  products = [];
  constructor() { }

  ngOnInit(): void {
    this.products = [
      {
        image: 'https://safran-eu.de/media/image/b9/c4/cb/pofake-minoo.jpg',
        price: '12331',
        title: 'پل صدر',
        stock: 3,
        status: 'اتمام',
      },
      {
        image: 'https://scontent.xx.fbcdn.net/v/t1.0-9/13920679_844692605630539_1835063161558392807_n.jpg?_nc_cat=108&ccb=2&_nc_sid=e3f864&_nc_ohc=lmepSjU4m6UAX_EEDF8&_nc_ht=scontent.xx&oh=025c6b032f35406c5139314361cc6626&oe=5FE22A96',
        price: '12331',
        title: 'پل صدر',
        stock: 4,
        status: 'اتمام',
      },
      {
        image: 'https://marvel-b1-cdn.bc0a.com/f00000000211592/cdn.shopify.com/s/files/1/2804/5352/products/5830_GoodHealth_5oz_SeaSalt_AvocadoOil_PotatoChips_Bag_Render_1100x.jpg?v=1597769255',
        price: '12331',
        title: 'پل صدر',
        stock: 5,
        status: 'اتمام',
      },
      {
        image: 'https://safran-eu.de/media/image/b9/c4/cb/pofake-minoo.jpg',
        price: '12331',
        title: 'پل صدر',
        stock: 6,
        status: 'اتمام',
      }
    ];
  }

}
