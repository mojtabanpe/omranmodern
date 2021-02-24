import { ToastrService } from 'ngx-toastr';
import { RepositoryService } from './../../../../../services/repository.service';
import { MotherMaterial } from './../../../../../interfaces/material';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

export interface Attr {
  name: string;
  possible_values: Array<any>;
  show_in_filter: boolean;
  value: Array<any>;
  position: number;
}

@Component({
  selector: 'app-permutation-create-childs',
  templateUrl: './permutation-create-childs.component.html',
  styleUrls: ['./permutation-create-childs.component.css']
})
export class PermutationCreateChildsComponent implements OnInit {
  mother: MotherMaterial = {id: 14, name: 'کلوخ', slug: 'کلوخ', explain: '<p>کلوخ همون سنگ خاکیه</p>'
  , images: 'http://127.0.0.1:8000/files/materials/agkU4noyEoLM6BOylnPdEGQjKSebjjfD.jpg',
   status: true, user_id: 0, attributes: [{name: 'رنگ', possible_values: 'آبی,قرمز,قهوه ای',
    show_in_filter: true, value: ''}, {name: 'طول', possible_values: 'متر,سانتی متر',
    show_in_filter: false, value: ''}, {name: 'برند', possible_values: 'قزوین,همدان,سنندج',
     show_in_filter: true, value: ''}], seller_attributes: [], comments: [], materials_list: [], category: 18};
  attributeDropdownSettings: IDropdownSettings;
  attributes = [];
  type = 'material';
  constructor(public dialogRef: MatDialogRef<PermutationCreateChildsComponent>, @Inject(MAT_DIALOG_DATA) public data,
              private repository: RepositoryService, private alert: ToastrService) { }

  ngOnInit(): void {
    // this.mother = this.data.mother;
    for (const attr of this.mother.attributes) {
      this.attributes.push({
        name: attr.name,
        possible_values: attr.possible_values.toString().split(','),
        show_in_filter: attr.show_in_filter,
        value: [],
        position: 30
      });
    }
    this.attributeDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true,
      selectAllText: 'انتخاب همه',
      unSelectAllText: 'حذف همه',
      itemsShowLimit: 5,
      noDataAvailablePlaceholderText: 'داده ای برای نمایش وجود ندارد'
    };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  createChilds(): void {
    this.attributes.sort((a, b) => a.position - b.position);
    for (const attr of this.attributes) {
      if (attr.value.length === 0 ) {
        const index = this.attributes.indexOf(attr);
        this.attributes.splice(index, 1);
      }
    }
    const data = {
      attributes: this.attributes,
      mother: this.mother,
      type: this.type
    }
    this.repository.createPermutationChilds(data).subscribe(res => {
      if (res.succeed !== 0) {
        this.alert.success(res.succeed + ' تلاش موفق');
      }
      if (res.failed !== 0) {
        this.alert.error(res.failed + ' تلاش ناموفق');
      }
    });
  }
}
