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
    supply_time: 0,
    sell_types: [],
    qualities: [],
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
