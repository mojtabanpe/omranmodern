import { RepositoryService } from 'src/app/services/repository.service';
import { Category } from 'src/app/interfaces/category';
import { GeneralService } from 'src/app/services/general.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';


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
  selectedType: boolean;
  categories = [];
  selectedCategories = [];
  dropdownSettings: IDropdownSettings;
  changedRelateds = {
    addedRelateds: [],
    removedRelateds: []
  };
  constructor(private general: GeneralService, private repository: RepositoryService, private alert: ToastrService) { }

  ngOnInit(): void {
    this.categorySub = this.general.currentCategory.subscribe(res => {
      this.category = res;
      this.selectedType = this.category.type;
    });
    this.selectedCategories = this.category.related.categories;
    this.repository.getCategoriesSelect().subscribe((result) => {
      this.categories = result;
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'انتخاب همه',
      unSelectAllText: 'حذف همه',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect($event): void {
    const index = this.changedRelateds.removedRelateds.indexOf($event.id);
    if (index > -1) {
      console.log(index);
      this.changedRelateds.removedRelateds.splice(index, 1);
    }
    this.changedRelateds.addedRelateds.push($event.id);
  }
  onItemDeSelect($event): void {
    const index = this.changedRelateds.addedRelateds.indexOf($event.id);
    if (index > -1) {
      this.changedRelateds.addedRelateds.splice(index, 1);
    }
    this.changedRelateds.removedRelateds.push($event.id);
  }
  changeType(): void {
    this.category.type = this.selectedType;
    this.general.changeCategory(this.category);
  }

  // changeRelatedCategories(): void {
  //   for
  //   this.category.related.categories = this.selectedCategories;
  //   this.general.changeCategory(this.category);
  // }

  submit(): void {
    const relatedCategories = [];
    for (const selectedCategory of this.selectedCategories) {
      const category = this.categories.filter(c => c.id === selectedCategory.id)[0];
      relatedCategories.push({
        id: category.id,
        name: category.name,
        image: category.image
      });
    }
    this.category.related.categories = relatedCategories;
    const fieldsToUpdate = {
      type: this.category.type,
      related: this.category.related
    };

    this.repository.updateCategory(fieldsToUpdate, this.category.id).subscribe(res => {
      this.alert.success('گروه با موفقیت ویرایش شد!');
      this.category.related.categories = relatedCategories;
      this.general.changeCategory(this.category);
    }, err => {
      this.alert.error('مشکلی در ویرایش گروه وجود دارد!');
    });
    // this.repository.UpdateParentsWithThisChild(this.changedRelateds, this.category.id).subscribe();
  }

  ngOnDestroy(): void {
    this.categorySub.unsubscribe();
  }
}
