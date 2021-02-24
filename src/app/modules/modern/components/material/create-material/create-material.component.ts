import { PermutationCreateChildsComponent } from './../permutation-create-childs/permutation-create-childs.component';
import { GeneralService } from 'src/app/services/general.service';
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


@Component({
  selector: 'app-create-material',
  templateUrl: './create-material.component.html',
  styleUrls: ['./create-material.component.css']
})
export class CreateMaterialComponent implements OnInit {
  material = this.general.defaultMaterial;
  motherMaterial = this.general.defaultMotherMaterial;
  statuses = [
    {value: 'active', viewValue: 'فعال'},
    {value: 'inactive', viewValue: 'غیرفعال'}
  ];
  selectedStatus: string = this.statuses[0].value;

  clusterCategories = [];

  categories = [];
  selectedCategory;
  categoryDropdownSettings: IDropdownSettings;

  materialName = '';
  materialExplain = '';
  brands = [];
  selectedBrand = [];
  brandDropdownSettings: IDropdownSettings;
  @ViewChild('brandSelect', {static: false}) brandSelect;

  quality = 'نامشخص';
  qualities = ['اقتصادی و ارزان', 'گیفیت و قمیت مناسب', 'کیفیت عالی', 'لوکس و حرفه ای', 'مصالح نوین', 'نامشخص'];

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
  constructor(private repository: RepositoryService, public dialog: MatDialog, private alert: ToastrService,
              private general: GeneralService) { }

  ngOnInit(): void {
    this.categoryDropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
      noDataAvailablePlaceholderText: 'داده ای برای نمایش وجود ندارد'
    };

    this.brandDropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true,
      noDataAvailablePlaceholderText: 'داده ای برای نمایش وجود ندارد'
    };

    this.materialDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true,
      selectAllText: 'انتخاب همه',
      unSelectAllText: 'حذف همه',
      itemsShowLimit: 3,
      noDataAvailablePlaceholderText: 'داده ای برای نمایش وجود ندارد'
    };

    this.repository.getClusters(true).subscribe((res) => {
      this.clusterCategories = res;
      for (const category of res) {
        this.categories.push({
          id: category.id,
          name: category.name
        });
      }
      this.initializedCategoryDropdown = true;
    });
    this.repository.getAllBrands().subscribe(res => {
      for (const brand of res) {
        this.brands.push({
          id: brand.id,
          name: brand.name
        });
      }
      this.initializedBrandDropdown = true;
    });


  }

  onItemSelect($event): void {
    if (this.selectedCategory !== undefined) {
      this.selectedMaterial = [];
      const forMotherMaterials: Array<any> = [];
      const cluster = this.clusterCategories.filter(c => c.id === this.selectedCategory[0].id)[0];
      this.materials = cluster.mother_materials_list;
      for (const item of this.materials) {
        forMotherMaterials.push({
          id: item.id,
          name: item.name
        });
      }
      this.materialSelect.data = forMotherMaterials;

      const clusterId = this.selectedCategory[0].id;
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
            id: res.id,
            name: res.name
          });
          this.brandSelect.data = this.brands;
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
    return this.selectedMaterial !== undefined && this.selectedMaterial.length !== 0;
  }

  submit(): void {
    if (this.isChild() === true) { // kalaye madar entekhab shode
    this.material.status = this.selectedStatus === 'active' ? true : false;
    if (this.selectedCategory !== undefined) {
      this.material.category = this.selectedCategory[0].id;
    } else {
      this.errors.push('لطفا خوشه را اتنخاب کنید');
    }
    if (this.materialName === '') {
      this.errors.push('لطفا عنوان کالا را وارد کنید');
    } else {
      this.material.name = this.materialName;
    }


    for (const temp of this.selectedMaterial) {
        this.material.mothers.push(temp.id);
      }


    if (this.selectedBrand.length !== 0) {
        this.material.brand_id = this.selectedBrand[0].id;
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
      this.motherMaterial.status = this.selectedStatus === 'active' ? true : false;
      if (this.selectedCategory !== undefined) {
        this.motherMaterial.category = this.selectedCategory[0].id;
    } else {
        this.errors.push('لطفا خوشه را اتنخاب کنید');
    }

      if (this.materialName === '') {
        this.errors.push('لطفا عنوان کالا را وارد کنید');
    } else {
        this.motherMaterial.name = this.materialName;
    }
      this.motherMaterial.images = this.images;
      this.motherMaterial.attributes = this.attributes;
      this.motherMaterial.explain = this.materialExplain;
    }

    if (this.errors.length === 0) {
      if (this.isChild() === true) {
      delete this.material.id;
      console.log(JSON.stringify(this.material));

      this.repository.createMaterial(this.material).subscribe((res: Material) => {
        this.alert.success('کالا با موفقیت ایجاد شد!');
      }, error => {
        this.alert.error('مشکلی در ایجاد کالا بوجود آمد!');
      });
    } else {
      delete this.motherMaterial.id;
      this.repository.createMotherMaterial(this.motherMaterial).subscribe((res: MotherMaterial) => {
        this.alert.success('کالا با موفقیت ایجاد شد!');
        const dialogRef = this.dialog.open(PermutationCreateChildsComponent, {
          width: '300px',
          data: {
            mother: res,
            type: 'material'
          }
        });
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
