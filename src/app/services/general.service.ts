import { Category } from './../interfaces/category';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  mode = "edit";
  defaultCategory: Category = {
    id: 0,
    name: '',
    slug: '',
    explain: '',
    type: true,
    images: [],
    childs_id: [],
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
  category = new BehaviorSubject<Category>(this.defaultCategory);
  currentCategory = this.category.asObservable();
  changeCategory(category: Category): void{
    this.category.next(category);
   }
constructor() { }

}
