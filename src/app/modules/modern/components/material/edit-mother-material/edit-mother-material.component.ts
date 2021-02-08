import { MotherMaterial } from './../../../../../interfaces/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UploadSection } from 'src/app/interfaces/upload-section';
import { GeneralService } from 'src/app/services/general.service';
import { RepositoryService } from 'src/app/services/repository.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';



@Component({
  selector: 'app-edit-mother-material',
  templateUrl: './edit-mother-material.component.html',
  styleUrls: ['./edit-mother-material.component.css']
})
export class EditMotherMaterialComponent implements OnInit {
  material;
  statuses = [
    {value: 'active', viewValue: 'فعال'},
    {value: 'inactive', viewValue: 'غیرفعال'}
  ];
  selectedStatus: string;

  materialName = '';
  materialExplain = '';
  nameChanged = false;

  reader = new FileReader();
  sections: Array<UploadSection> = [];
  inProgress = false;
  images = [];
  selectedImage: any;
  imageDirectory = 'materials';
  deletedImage = false;
  attributes = [];

  public Editor = ClassicEditor;

  initialized = false;
  errors = [];
  constructor(private repository: RepositoryService, private alert: ToastrService, private general: GeneralService,
              private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const materialId = this.activatedRoute.snapshot.paramMap.get('id');
    this.repository.getMotherMaterial(materialId).subscribe(res => {
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
    this.images = [];
    this.deletedImage = true;
  }

  submit(): void {
    if (this.materialName === '') {
      this.errors.push('لطفا عنوان کالا را وارد کنید');
    } else {
      this.material.name = this.materialName;
    }

    if (this.images.length === 0) {
      this.errors.push('لطفا حداقل یک عکس بارگذاری کنید');
    } else {
      this.material.images = this.images;
    }

    this.material.attributes = this.attributes;

    this.material.explain = this.materialExplain;

    this.material.status = this.selectedStatus === 'active' ? true : false;

    this.material.images = this.images;
    delete this.material.category;
    delete this.material.materials_list;
    if (this.errors.length === 0) {
      this.repository.updateMotherMaterial(this.material.id, this.material).subscribe((res: MotherMaterial) => {
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
