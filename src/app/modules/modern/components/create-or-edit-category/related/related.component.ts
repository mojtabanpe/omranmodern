import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-related',
  templateUrl: './related.component.html',
  styleUrls: ['./related.component.css']
})
export class RelatedComponent implements OnInit {
  categories = [
    { item_id: 1, item_text: 'منطقه ۱' },
    { item_id: 2, item_text: 'منطقه ۲' },
    { item_id: 3, item_text: 'آهن آلات'  },
    { item_id: 4, item_text: 'آزمایشگاهی' },
    { item_id: 5, item_text: 'منطقه ۵' }
  ];
  selectedCategories = [
  { item_id: 3, item_text: 'آهن آلات' },
  { item_id: 4, item_text: 'آزمایشگاهی' }
];
  dropdownSettings: IDropdownSettings;
  constructor() { }

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'انتخاب همه',
      unSelectAllText: 'حذف همه',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any): void {
    console.log(item);
  }
  onSelectAll(items: any): void {
    console.log(items);
  }

}
