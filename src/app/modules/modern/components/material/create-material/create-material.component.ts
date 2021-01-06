import { CategoryAttribute } from 'src/app/interfaces/category-attribute';
import { Attribute } from './../../../../../interfaces/attribute';
import { CreateAttributeDialogComponent } from './../../../../../components/dialogs/create-attribute-dialog/create-attribute-dialog.component';
import { CreateBrandDialogComponent } from './../../../../../components/dialogs/create-brand-dialog/create-brand-dialog.component';
import { Category } from 'src/app/interfaces/category';
import { RepositoryService } from 'src/app/services/repository.service';
import { MotherMaterial, Material } from './../../../../../interfaces/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MatDialog } from '@angular/material/dialog';
import { UploadSection } from 'src/app/interfaces/upload-section';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';

export interface CategoryForSelect {
  category_name: string;
  category_id: number;
}
export interface MaterialForSelect {
  material_name: string;
  material_id: number;
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
    explain: '',
    category: {
      item_id: 0,
      item_name: ''
    },
    mothers: [],
    sellers: [],
    images: [],
    brand_id: 0,
    quality: '',
    status: '',
    user_id: 0,
    variables: [],
    attributes: [],
    seller_attributes: []
  };
  motherMaterial: MotherMaterial = {
    id: 0,
    name: '',
    explain: '',
    category: {
      item_id: 0,
      item_name: ''
    },
    childs: [],
    images: [],
    status: '',
    user_id: 0,
    attributes: [],
    seller_attributes: []
  };
  statuses = [
    {value: 'active', viewValue: 'فعال'},
    {value: 'inactive', viewValue: 'غیرفعال'},
    {value: 'rejected', viewValue: 'ردشده'},
    {value: 'suggested', viewValue: 'پیشنهادی'}
  ];
  selectedStatus: string = this.statuses[0].value;

  categories: Array<CategoryForSelect> = [];
  selectedCategory: CategoryForSelect;
  categoryDropdownSettings: IDropdownSettings;

  materialName = '';
  materialExplain = '';
  brands = [];
  selectedBrand = [];
  brandDropdownSettings: IDropdownSettings;
  @ViewChild('brandSelect', {static: false}) brandSelect;

  quality = 'پیشنهاد عمران مدرن';
  qualities = ['اقتصادی و ارزان', 'گیفیت و قمیت مناسب', 'کیفیت عالی', 'لوکس و حرفه ای', 'مصالح نوین', 'پیشنهاد عمران مدرن', 'نامشخص'];

  units = [];
  selectedUnit = [];
  unitDropdownSettings: IDropdownSettings;
  @ViewChild('unitSelect', {static: false}) unitSelect;

  materials = [];
  selectedMaterial = [];
  materialDropdownSettings: IDropdownSettings;
  @ViewChild('materialSelect', {static: false}) materialSelect;

  initializedCategoryDropdown = false;
  // initializedMaterialDropdown = false;
  initializedBrandDropdown = false;
  initializedUnitDropdown = false;


  reader = new FileReader();
  sections: Array<UploadSection> = [];
  inProgress = false;
  images = [];
  selectedImage: any;
  imageDirectory = 'materials';

  attributes: Array<Attribute> = [];

  public Editor = ClassicEditor;

  errors = [];
  constructor(private repository: RepositoryService, public dialog: MatDialog, private alert: ToastrService) { }

  ngOnInit(): void {
    this.categoryDropdownSettings = {
      singleSelection: true,
      idField: 'category_id',
      textField: 'category_name',
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
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

    this.materialDropdownSettings = {
      singleSelection: false,
      idField: 'material_id',
      textField: 'material_name',
      allowSearchFilter: true,
      selectAllText: 'انتخاب همه',
      unSelectAllText: 'حذف همه',
      itemsShowLimit: 3,
      noDataAvailablePlaceholderText: 'داده ای برای نمایش وجود ندارد'
    };

    this.repository.getClusters().subscribe((res) => {
      for (const category of res) {
        this.categories.push({
          category_id: category.id,
          category_name: category.name
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

  onItemSelect($event): void {
    if (this.selectedCategory !== undefined) {
      const clusterId = this.selectedCategory[0].category_id;
      const forMaterials: Array<MaterialForSelect> = [];
      this.repository.getMotherMaterials(clusterId).subscribe(res => {
        for (const item of res) {
          forMaterials.push({
            material_id: item.id,
            material_name: item.name
          });
        }
        this.materialSelect.data = forMaterials;
      });
      this.attributes = [];
      this.repository.getAttributesForMaterial(clusterId).subscribe((res: Array<CategoryAttribute>) => {
        for (const item of res) {
          this.attributes.push({
            name: item.name,
            possible_values: item.possible_values,
            show_in_filter: item.show_in_filter,
            value: ''
          });
        }
      });
    }
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
      data.append('myFile', this.selectedImage, this.imageDirectory);
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

  changeAttributeValue(attr, value): void {
    attr.value = value;
  }

  submit(): void {
    let isChild = true;
    if (this.selectedMaterial !== undefined && this.selectedMaterial.length !== 0) { // kalaye madar entekhab shode
    this.material.status = this.selectedStatus;
    if (this.selectedCategory !== undefined) {
      this.material.category.item_id = this.selectedCategory[0].category_id;
      this.material.category.item_name = this.selectedCategory[0].category_name;
    } else {
      this.errors.push('لطفا خوشه را اتنخاب کنید');
    }
    if (this.materialName === '') {
      this.errors.push('لطفا عنوان کالا را وارد کنید');
    } else {
      this.material.name = this.materialName;
    }


    for (const temp of this.selectedMaterial) {
        this.material.mothers.push({
          item_id: temp.material_id,
          item_name: temp.material_name
        });
      }


    if (this.selectedBrand.length !== 0) {
        this.material.brand_id = this.selectedBrand[0].brand_id;
      }

    this.material.quality = this.quality;

    if (this.images.length === 0) {
        this.errors.push('لطفا حداقل یک عکس بارگذاری کنید');
      } else {
        this.material.images = this.images;
      }

    this.material.attributes = this.attributes;

    this.material.explain = this.materialExplain;

    } else {
      isChild = false;
      this.motherMaterial.status = this.selectedStatus;
      if (this.selectedCategory !== undefined) {
        this.motherMaterial.category.item_id = this.selectedCategory[0].category_id;
        this.motherMaterial.category.item_name = this.selectedCategory[0].category_name;
    } else {
        this.errors.push('لطفا خوشه را اتنخاب کنید');
    }

      if (this.materialName === '') {
        this.errors.push('لطفا عنوان کالا را وارد کنید');
    } else {
        this.motherMaterial.name = this.materialName;
    }
      this.motherMaterial.childs = [];
      this.motherMaterial.images = this.images;
      this.motherMaterial.attributes = this.attributes;
      this.motherMaterial.explain = this.materialExplain;
    }

    if (this.errors.length === 0) {
      if (isChild === true) {
      delete this.material.id;
      this.repository.createMaterial(this.material).subscribe((res: Material) => {
        this.alert.success('کالا با موفقیت ایجاد شد!');
      }, error => {
        this.alert.error('مشکلی در ایجاد کالا بوجود آمد!');
      });
    } else {
      delete this.motherMaterial.id;
      this.repository.createMotherMaterial(this.motherMaterial).subscribe((res: MotherMaterial) => {
        this.alert.success('کالا با موفقیت ایجاد شد!');
      }, error => {
        this.alert.error('مشکلی در ایجاد کالا بوجود آمد!');
      });
    }
    }
    for (const error of this.errors) {
      this.alert.error(error);
    }
    this.errors = [];
  }

}
