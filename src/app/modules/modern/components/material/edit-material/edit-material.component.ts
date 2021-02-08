import { Material } from './../../../../../interfaces/material';
import { RepositoryService } from 'src/app/services/repository.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UploadSection } from 'src/app/interfaces/upload-section';
import { Attribute } from './../../../../../interfaces/attribute';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
import { GeneralService } from 'src/app/services/general.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateBrandDialogComponent } from 'src/app/components/dialogs/create-brand-dialog/create-brand-dialog.component';
import { CreateAttributeDialogComponent } from 'src/app/components/dialogs/create-attribute-dialog/create-attribute-dialog.component';


@Component({
  selector: 'app-edit-material',
  templateUrl: './edit-material.component.html',
  styleUrls: ['./edit-material.component.css']
})
export class EditMaterialComponent implements OnInit {
  material: Material;
  initialized = false;
  statuses = [
    {value: 'active', viewValue: 'فعال'},
    {value: 'inactive', viewValue: 'غیرفعال'}
  ];
  selectedStatus: string;


  materialName = '';
  nameChanged = false;
  materialExplain = '';
  brands = [];
  selectedBrand = [];
  brandDropdownSettings: IDropdownSettings;
  @ViewChild('brandSelect', {static: false}) brandSelect;

  qualities = ['اقتصادی و ارزان', 'گیفیت و قمیت مناسب', 'کیفیت عالی', 'لوکس و حرفه ای', 'مصالح نوین', 'پیشنهاد عمران مدرن', 'نامشخص'];

  reader = new FileReader();
  sections: Array<UploadSection> = [];
  inProgress = false;
  images = [];
  selectedImage: any;
  imageDirectory = 'materials';
  deletedImage = false;
  attributes = [];

  public Editor = ClassicEditor;

  errors = [];
  constructor(private activatedRoute: ActivatedRoute, private repository: RepositoryService, public dialog: MatDialog,
              private alert: ToastrService, private general: GeneralService, private router: Router) { }

  ngOnInit(): void {
    const materialId = this.activatedRoute.snapshot.paramMap.get('id');
    this.repository.getMaterial(materialId).subscribe(res => {
      this.material = res;
      this.attributes = this.material.attributes;
      for (const attr of this.attributes) {
        attr.possible_values = attr.possible_values.split(',');
      }
      this.materialName = this.material.name;
      this.materialExplain = this.material.explain;
      this.images = (this.material.images).toString().split(',');
      this.selectedStatus =  this.material.status ? 'active' : 'inactive';
      this.initialized = true;

      this.repository.getAllBrands().subscribe(response => {
        for (const brand of response) {
          this.brands.push({
            brand_id: brand.id,
            brand_name: brand.name
          });
        }
        this.selectedBrand = this.brands.filter(b => b.brand_id === this.material.brand_id);
    });
    });


    this.brandDropdownSettings = {
      singleSelection: true,
      idField: 'brand_id',
      textField: 'brand_name',
      allowSearchFilter: true,
      noDataAvailablePlaceholderText: 'داده ای برای نمایش وجود ندارد'
    };

  }

  nameChange(): void {
    this.nameChanged = true;
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

  deleteImage(): void {
    this.deletedImage = true;
    this.images = [];
  }

  changeAttributeValue(attr, value): void {
    attr.value = value;
  }

  submit(): void {
    if (this.materialName === '') {
      this.errors.push('لطفا عنوان کالا را وارد کنید');
    } else {
      this.material.name = this.materialName;
    }



    if (this.selectedBrand.length !== 0) {
        this.material.brand_id = this.selectedBrand[0].brand_id;
      }


    if (this.images.length === 0) {
        this.errors.push('لطفا حداقل یک عکس بارگذاری کنید');
      } else {
        this.material.images = this.images;
      }

    this.material.attributes = this.attributes;

    this.material.explain = this.materialExplain;

    this.material.status = this.selectedStatus === 'active' ? true : false;

    delete this.material.mothers;
    delete this.material.category;
    if (this.errors.length === 0) {
      this.repository.updateMaterial(this.material.id, this.material).subscribe((res: Material) => {
        this.alert.success('کالا با موفقیت ویرایش شد!');
        this.router.navigate(['/modern/manage_materials']);
      }, error => {
        this.alert.error('مشکلی در ویرایش کالا بوجود آمد!');
      });
    }
    for (const error of this.errors) {
      this.alert.error(error);
    }
    this.errors = [];
  }
}
