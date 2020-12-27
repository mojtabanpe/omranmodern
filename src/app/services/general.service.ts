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
  deep = new BehaviorSubject<number>(0);
  currentDeep = this.deep.asObservable();
  category = new BehaviorSubject<Category>(this.defaultCategory);
  currentCategory = this.category.asObservable();
  changeDeep(digit: number): void{
    this.deep.next(digit);
  }
  changeCategory(category: Category): void{
    this.category.next(category);
   }
constructor() { }

}
