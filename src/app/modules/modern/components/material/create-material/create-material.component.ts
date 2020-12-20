import { CreateAttributeDialogComponent } from './../../../../../components/dialogs/create-attribute-dialog/create-attribute-dialog.component';
import { CreateBrandDialogComponent } from './../../../../../components/dialogs/create-brand-dialog/create-brand-dialog.component';
import { Category } from 'src/app/interfaces/category';
import { RepositoryService } from 'src/app/services/repository.service';
import { Material } from './../../../../../interfaces/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MatDialog } from '@angular/material/dialog';
import { UploadSection } from 'src/app/interfaces/upload-section';

export interface CategoryForSelect {
  parent_name: string;
  parent_id: number;
}
export interface BrandForSelect {
  brand_name: string;
  brand_id: number;
}

@Component({
  selector: 'app-create-material',
  templateUrl: './create-material.component.html',
  styleUrls: ['./create-material.component.css']
})
export class CreateMaterialComponent implements OnInit {
  material: Material = {
    id: 0,
    name: '',
    slug: '',
    explain: '',
    categoris_id: [],
    images: '',
    unit_id: 0,
    brand_id: 0,
    type: '',
    status: '',
    user_id: 0,
    variables: [],
    attributes: [],
    category_attributes: []
  };
  types = [
    {value: 'active', viewValue: 'فعال'},
    {value: 'in_active', viewValue: 'غیرفعال'},
    {value: 'rejected', viewValue: 'ردشده'},
    {value: 'suggested', viewValue: 'پیشنهادی'}
  ];
  selectedType: string = this.types[0].value;

  categories: Array<CategoryForSelect> = [];
  selectedCategory: CategoryForSelect;
  categoryDropdownSettings: IDropdownSettings;

  brands = [];
  selectedBrand;
  brandDropdownSettings: IDropdownSettings;
  @ViewChild('brandSelect', {static: false}) brandSelect;

  quality = 'پیشنهاد عمران مدرن';
  qualities = ['اقتصادی و ارزان', 'گیفیت و قمیت مناسب', 'کیفیت عالی', 'لوکس و حرفه ای', 'مصالح نوین', 'پیشنهاد عمران مدرن', 'نامشخص'];

  units = [];
  selectedUnits;
  unitDropdownSettings: IDropdownSettings;
  @ViewChild('unitSelect', {static: false}) unitSelect;

  initializedCategoryDropdown = false;
  initializedBrandDropdown = false;
  initializedUnitDropdown = false;

  reader = new FileReader();
  sections: Array<UploadSection> = [];
  inProgress = false;
  images = [];
  selectedImage: any;
  imageName = '1';

  constructor(private repository: RepositoryService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.categoryDropdownSettings = {
      singleSelection: true,
      idField: 'parent_id',
      textField: 'parent_name',
      allowSearchFilter: true,
      noDataAvailablePlaceholderText: 'داده ای برای نمایش وجود ندارد'
    };

    this.brandDropdownSettings = {
      singleSelection: true,
      idField: 'brand_id',
      textField: 'brand_name',
      allowSearchFilter: true,
      noDataAvailablePlaceholderText: 'داده ای برای نمایش وجود ندارد'
    };

    this.unitDropdownSettings = {
      singleSelection: false,
      idField: 'unit_id',
      textField: 'unit_name',
      allowSearchFilter: true,
      selectAllText: 'انتخاب همه',
      unSelectAllText: 'حذف همه',
      itemsShowLimit: 3,
      noDataAvailablePlaceholderText: 'داده ای برای نمایش وجود ندارد'
    };

    this.repository.getTopDeepCategories(4).subscribe((res) => {
      for (const category of res) {
        this.categories.push({
          parent_id: category.parent_id,
          parent_name: category.parent_name
        });
      }
      this.initializedCategoryDropdown = true;
    });
    this.repository.getAllBrands().subscribe(res => {
      for (const brand of res) {
        this.brands.push({
          brand_id: brand.id,
          brand_name: brand.name
        });
      }
      this.initializedBrandDropdown = true;
    });
    this.repository.getAllUnits().subscribe(res => {
      for (const unit of res) {
        this.units.push({
          unit_id: unit.id,
          unit_name: unit.name
        });
      }
      this.initializedUnitDropdown = true;
    });
  }

  changeType(): void {
    console.log(this.selectedType);
    this.material.type = this.selectedType;
  }

  addBrand(): void {
    const dialogRef = this.dialog.open(CreateBrandDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'cancel' && result !== undefined) {
        const brand = {
          name: result.name,
          explain: result.explain,
          is_active: result.is_active
        };
        this.repository.createBrand(brand).subscribe(res => {
          this.brands.push({
            brand_id: res.id,
            brand_name: res.name
          });
          this.brandSelect.data = this.brands;
        });
      }
    });
  }
  addUnit(): void {
    const dialogRef = this.dialog.open(CreateAttributeDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'cancel' && result !== undefined) {
        const unit = {
          name: result,
        };
        this.repository.createUnit(unit).subscribe(res => {
          this.units.push({
            unit_id: res.id,
            unit_name: res.name
          });
          this.unitSelect.data = this.units;
        });
      }
    });
  }

  onFileChanged(event): void {
    this.inProgress = true;
    // tslint:disable-next-line: prefer-const
    const uploadSection: UploadSection = {
      progressPercent: 0,
      started: true,
      finished: false,
      src: ''
    };
    try {
      this.sections.push(uploadSection);
      this.selectedImage = event.target.files[0];
      this.reader.readAsDataURL(this.selectedImage);
      const data = new FormData();
      data.append('myFile', this.selectedImage, this.imageName);
      this.repository.uploadImage(data).subscribe(res => {
        if (res !== undefined) {
          if (res.mode === 'progress') {
            uploadSection.progressPercent = res.percent;
          } else if (res.mode === 'init') {
            uploadSection.started = true;
          }
          else if (res.mode === 'finish') {
            uploadSection.finished = true;
            uploadSection.started = false;
            this.images.push(res.message);
            setTimeout(() => {
              uploadSection.src = this.reader.result.toString();
              }, 1000);
            this.inProgress = false;
          }
        }
      });
    } catch (error) {
      this.inProgress = false;
    }

    }

  removePicture(index: number): void {
    this.images.splice(index, 1);
    this.sections.splice(index, 1);
    }
}
