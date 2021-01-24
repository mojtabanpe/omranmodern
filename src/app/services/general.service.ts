import { SellerMaterial, Material, MotherMaterial } from './../interfaces/material';
import { Service, SellerService } from './../interfaces/service';
import { Seller } from './../interfaces/seller';
import { Category } from './../interfaces/category';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  mode = 'edit';
  defaultCategory: Category = {
    id: 0,
    name: '',
    slug: '',
    explain: '',
    type: true,
    image: '',
    parents_id: [],
    childs_id: [],
    units_id: [],
    deep: 0,
    position: 0,
    is_active: false,
    units: [],
    related: {
        categories: [],
        services: [],
        materials: []
    }
  };
  defaultMaterial: Material = {
    id: 0,
    name: '',
    explain: '',
    category: {
      item_id: 0,
      item_name: ''
    },
    mothers: [],
    sellers: [],
    stars: {
      stars: [{
        user_id: 0,
        value: 5
      }, {
        user_id: 0,
        value: 5
      }, {
        user_id: 0,
        value: 5
      }
      ],
      average: 5
    },
    images: [],
    brand_id: 0,
    quality: '',
    status: '',
    is_suggested: false,
    user_id: 0,
    attributes: [],
    seller_attributes: []
  };
  defaultMotherMaterial: MotherMaterial = {
    id: 0,
    name: '',
    explain: '',
    category: {
      item_id: 0,
      item_name: ''
    },
    childs: [],
    images: [],
    status: '',
    user_id: 0,
    attributes: [],
    seller_attributes: []
  };
  defaultSeller: Seller = {
    id: 0,
    name: '',
    explain: '',
    status: 'active',
    stars: {},
    type: 'group',
    image: '',
    provider_type: '',
    phones: [],
    site: '',
    addresses: [],
    working_time: {},
    coverages: [],
    materials: [],
    services: []
  };
  defaultSellerService: SellerService = {
    service: {},
    min_orderable: 0,
    max_orderable: 10000000,
    wholesale_threshold: 1000,
    prices: [],
    stars: {
      stars: [{
        user_id: 0,
        value: 5
      }, {
        user_id: 0,
        value: 5
      }, {
        user_id: 0,
        value: 5
      }
      ],
      average: 5
    },
    supply_time: 0,
    sell_types: [],
    qualities: [],
    condition: false,
    is_suggested: false,
    disscounts: [],
    attributes: []
  };
  defaultSellerMaterial: SellerMaterial = {
    material: {
      id: 0 ,
      name: '',
      image: '',
      status: true
    },
    min_orderable: 0,
    max_orderable: 10000000,
    wholesale_threshold: 1000,
    stack: true,
    prices: [],
    supply_time: 0,
    sell_types: [],
    condition: false,
    is_suggested: false,
    disscounts: [],
    attributes: []
  };
  deep = new BehaviorSubject<number>(0);
  currentDeep = this.deep.asObservable();

  category = new BehaviorSubject<Category>(this.defaultCategory);
  currentCategory = this.category.asObservable();

  seller = new BehaviorSubject<Seller>(this.defaultSeller);
  currentSeller = this.seller.asObservable();


  changeDeep(digit: number): void{
    this.deep.next(digit);
  }
  changeCategory(category: Category): void{
    this.category.next(category);
   }
   changeSeller(seller: Seller): void{
    this.seller.next(seller);
   }
constructor() { }

}
