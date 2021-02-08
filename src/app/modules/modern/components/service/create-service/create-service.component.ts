import { Service, MotherService } from './../../../../../interfaces/service';
import { CategoryAttribute } from 'src/app/interfaces/category-attribute';
import { Attribute } from './../../../../../interfaces/attribute';
import { CreateAttributeDialogComponent } from './../../../../../components/dialogs/create-attribute-dialog/create-attribute-dialog.component';
import { CreateBrandDialogComponent } from './../../../../../components/dialogs/create-brand-dialog/create-brand-dialog.component';
import { RepositoryService } from 'src/app/services/repository.service';
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
export interface ServiceForSelect {
  service_name: string;
  service_id: number;
}
export interface BrandForSelect {
  brand_name: string;
  brand_id: number;
}

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css']
})
export class CreateServiceComponent implements OnInit {
  service: Service = {
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
    status: true,
    user_id: 0,
    attributes: [],
    seller_attributes: []
  };
  motherService: MotherService = {
    id: 0,
    name: '',
    explain: '',
    category: {
      item_id: 0,
      item_name: ''
    },
    images: [],
    status: true,
    user_id: 0,
    attributes: [],
    seller_attributes: [],
    services_list: []
  };
  statuses = [
    {value: 'active', viewValue: 'فعال'},
    {value: 'inactive', viewValue: 'غیرفعال'}
  ];
  selectedStatus: string = this.statuses[0].value;

  categories: Array<CategoryForSelect> = [];
  selectedCategory: CategoryForSelect;
  categoryDropdownSettings: IDropdownSettings;

  serviceName = '';
  serviceExplain = '';

  brands = [];
  selectedBrand = [];
  brandDropdownSettings: IDropdownSettings;
  @ViewChild('brandSelect', {static: false}) brandSelect;

  units = [];
  selectedUnit = [];
  unitDropdownSettings: IDropdownSettings;
  @ViewChild('unitSelect', {static: false}) unitSelect;

  services = [];
  selectedService = [];
  serviceDropdownSettings: IDropdownSettings;
  @ViewChild('serviceSelect', {static: false}) serviceSelect;

  initializedCategoryDropdown = false;
  initializedBrandDropdown = false;
  initializedUnitDropdown = false;


  reader = new FileReader();
  sections: Array<UploadSection> = [];
  inProgress = false;
  images = [];
  selectedImage: any;
  imageDirectory = 'services';

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

    this.serviceDropdownSettings = {
      singleSelection: false,
      idField: 'service_id',
      textField: 'service_name',
      allowSearchFilter: true,
      selectAllText: 'انتخاب همه',
      unSelectAllText: 'حذف همه',
      itemsShowLimit: 3,
      noDataAvailablePlaceholderText: 'داده ای برای نمایش وجود ندارد'
    };

    this.repository.getClusters(false).subscribe((res) => {
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
      const forServices: Array<ServiceForSelect> = [];
      this.repository.getMotherServices(clusterId).subscribe(res => {
        for (const item of res) {
          forServices.push({
            service_id: item.id,
            service_name: item.name
          });
        }
        this.serviceSelect.data = forServices;
      });
      this.attributes = [];
      this.repository.getAttributesForService(clusterId).subscribe((res: Array<CategoryAttribute>) => {
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

  isChild(): boolean {
    return this.selectedService !== undefined && this.selectedService.length !== 0;
  }

  submit(): void {
    if (this.isChild() === true) { // kalaye madar entekhab shode
    this.service.status = this.selectedStatus === 'active' ? true : false;
    if (this.selectedCategory !== undefined) {
      this.service.category = this.selectedCategory[0].category_id;
    } else {
      this.errors.push('لطفا خوشه را اتنخاب کنید');
    }
    if (this.serviceName === '') {
      this.errors.push('لطفا عنوان خدمت را وارد کنید');
    } else {
      this.service.name = this.serviceName;
    }


    for (const temp of this.selectedService) {
        this.service.mothers.push(temp.service_id);
      }


    if (this.selectedBrand.length !== 0) {
        this.service.brand_id = this.selectedBrand[0].brand_id;
      }


    if (this.images.length === 0) {
        this.errors.push('لطفا حداقل یک عکس بارگذاری کنید');
      } else {
        this.service.images = this.images;
      }

    this.service.attributes = this.attributes;

    this.service.explain = this.serviceExplain;

    } else {
      this.motherService.status = this.selectedStatus === 'active' ? true : false;
      if (this.selectedCategory !== undefined) {
        this.motherService.category = this.selectedCategory[0].category_id;
    } else {
        this.errors.push('لطفا خوشه را اتنخاب کنید');
    }

      if (this.serviceName === '') {
        this.errors.push('لطفا عنوان خدمت را وارد کنید');
    } else {
        this.motherService.name = this.serviceName;
    }
      this.motherService.images = this.images;
      this.motherService.attributes = this.attributes;
      this.motherService.explain = this.serviceExplain;
    }

    if (this.errors.length === 0) {
      if (this.isChild() === true) {
      delete this.service.id;
      console.log(JSON.stringify(this.service));
      this.repository.createService(this.service).subscribe((res: Service) => {
        this.alert.success('خدمت با موفقیت ایجاد شد!');
      }, error => {
        console.log(error);
        this.alert.error('مشکلی در ایجاد خدمت بوجود آمد!');
      });
    } else {
      delete this.motherService.id;
      console.log(JSON.stringify(this.motherService));

      this.repository.createMotherService(this.motherService).subscribe((res: MotherService) => {
        this.alert.success('خدمت با موفقیت ایجاد شد!');
      }, error => {
        console.log(error);
        this.alert.error('مشکلی در ایجاد خدمت بوجود آمد!');
      });
    }
    }
    for (const error of this.errors) {
      this.alert.error(error);
    }
    this.errors = [];
  }

}
