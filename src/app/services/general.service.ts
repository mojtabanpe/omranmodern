import { SellerMaterial, Material, MotherMaterial } from './../interfaces/material';
import { Service, SellerService, MotherService } from './../interfaces/service';
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
    is_cluster: false,
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
    status: true,
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
    images: [],
    status: true,
    user_id: 0,
    attributes: [],
    seller_attributes: [],
    materials_list: [],
    comments: []
  };
  defaultSeller: Seller = {
    id: 0,
    name: '',
    explain: '',
    status: true,
    stars: {},
    type: 'group',
    image: '',
    provider_type: '',
    phones: [],
    site: '',
    addresses: [],
    working_time: {},
    work_samples: [],
    coverages: [],
    user_profile: 0,
    materials_list: [],
    services_list: []
  };
  defaultSellerService: SellerService = {
    service_id: 0,
    seller_id: 0,
    min_orderable: 0,
    max_orderable: 10000000,
    wholesale_threshold: 1000,
    status: true,
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
    attributes: [],
    read_only: false
  };
  defaultSellerMaterial: SellerMaterial = {
    material_id: 0,
    seller_id: 0,
    min_orderable: 0,
    max_orderable: 10000000,
    wholesale_threshold: 1000,
    status: true,
    stack: true,
    prices: [],
    supply_time: 0,
    sell_types: [],
    condition: false,
    is_suggested: false,
    disscounts: [],
    attributes: [],
    read_only: false
  };
  defaultService: Service = {
    id: 0,
    name: '',
    explain: '',
    category: {
      id: 0,
      name: ''
    },
    mothers: [],
    sellers: [],
    images: [],
    brand_id: 0,
    status: true,
    user_id: 0,
    attributes: [],
    seller_attributes: []
  };
  defaultMotherService: MotherService = {
    id: 0,
    name: '',
    explain: '',
    category: {
      id: 0,
      name: ''
    },
    images: [],
    status: true,
    user_id: 0,
    attributes: [],
    seller_attributes: [],
    services_list: [],
    comments: []
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

   mapDictToArray(dict): Array<any> {
    const arr = [];
    // tslint:disable-next-line: forin
    for (const key in dict) {
      arr.push({key, value: dict[key]});
    }
    return arr;
   }
}
