import { RepositoryService } from 'src/app/services/repository.service';
import { Category } from 'src/app/interfaces/category';
import { GeneralService } from 'src/app/services/general.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';

export interface CategoryInDropDown {
  parent_id: number;
  parent_name: string;
}

@Component({
  selector: 'app-related',
  templateUrl: './related.component.html',
  styleUrls: ['./related.component.css']
})
export class RelatedComponent implements OnInit, OnDestroy {
  categorySub;
  category: Category;
  types = [
    {value: true, viewValue: 'کالا'},
    {value: false, viewValue: 'خدمت'}
  ];
  selectedType: boolean = this.types[0].value;
  categories = [];
  selectedCategories = [];
  dropdownSettings: IDropdownSettings;
  changedParents = {
    addedParents: [],
    removedParents: []
  };
  constructor(private general: GeneralService, private repository: RepositoryService, private alert: ToastrService) { }

  ngOnInit(): void {
    this.categorySub = this.general.currentCategory.subscribe(res => {
      this.category = res;
    });
    this.repository.getCategoryParentsByIDs(this.category.id).subscribe((result) => {
      this.categories = result.categories;
      this.selectedCategories = result.selectedCategories;
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'parent_id',
      textField: 'parent_name',
      selectAllText: 'انتخاب همه',
      unSelectAllText: 'حذف همه',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect($event): void {
    const index = this.changedParents.removedParents.indexOf($event.parent_id);
    if (index > -1) {
      console.log(index);
      this.changedParents.removedParents.splice(index, 1);
    }
    this.changedParents.addedParents.push($event.parent_id);
  }
  onItemDeSelect($event): void {
    const index = this.changedParents.addedParents.indexOf($event.parent_id);
    if (index > -1) {
      this.changedParents.addedParents.splice(index, 1);
    }
    this.changedParents.removedParents.push($event.parent_id);
  }
  changeType(): void {
    this.category.type = this.selectedType;
    this.general.changeCategory(this.category);
  }

  changeRelatedCategories(): void {
    const ids = [];
    this.selectedCategories.forEach((value, element) => {
      ids.push(value.parent_id);
    });
    this.category.parents_id = ids;
    this.general.changeCategory(this.category);
  }

  submit(): void {
    const fieldsToUpdate = {
      type: this.category.type,
      parents_id: this.category.parents_id
    };
    this.repository.updateCategory(fieldsToUpdate, this.category.id).subscribe(res => {
      this.alert.success('گروه با موفقیت ویرایش شد!');
    }, err => {
      this.alert.error('مشکلی در ویرایش گروه وجود دارد!');
    });
    this.repository.UpdateParentsWithThisChild(this.changedParents, this.category.id).subscribe();
  }

  ngOnDestroy(): void {
    this.categorySub.unsubscribe();
  }
}
