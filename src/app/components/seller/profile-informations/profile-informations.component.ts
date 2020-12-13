import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-profile-informations',
  templateUrl: './profile-informations.component.html',
  styleUrls: ['./profile-informations.component.css']
})
export class ProfileInformationsComponent implements OnInit {
  isLoggedIn = false;
  cities = [
    {value: 'tehran', viewValue: 'تهران'},
    {value: 'yazd', viewValue: 'یزد'},
    {value: 'esfahan', viewValue: 'اصفهان'}
  ];
  provinces = [
    {value: 'tehran', viewValue: 'تهران'},
    {value: 'yazd', viewValue: 'یزد'},
    {value: 'esfahan', viewValue: 'اصفهان'}
  ];

  regions = [
      { item_id: 1, item_text: 'منطقه ۱' },
      { item_id: 2, item_text: 'منطقه ۲' },
      { item_id: 3, item_text: 'منطقه ۳' },
      { item_id: 4, item_text: 'منطقه ۴' },
      { item_id: 5, item_text: 'منطقه ۵' }
    ];
  selectedRegions = [
    { item_id: 3, item_text: 'منطقه ۳' },
    { item_id: 4, item_text: 'منطقه ۴' }
  ];
  dropdownSettings: IDropdownSettings;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  activityFieldsForProduct = [
    'سیمان پرتلند', 'سیمان رنگی', 'بتن'
  ];
  activityFieldsForServices = [
     'تعمیر سقف شیروانی', 'اجرای سقف شیبدار'
  ];
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn  = this.auth.isLoggedIn();
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

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.activityFieldsForProduct.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(activity): void {
    const index = this.activityFieldsForProduct.indexOf(activity);

    if (index >= 0) {
      this.activityFieldsForProduct.splice(index, 1);
    }
  }

}
