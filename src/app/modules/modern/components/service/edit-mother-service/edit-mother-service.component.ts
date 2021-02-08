import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UploadSection } from 'src/app/interfaces/upload-section';
import { GeneralService } from 'src/app/services/general.service';
import { RepositoryService } from 'src/app/services/repository.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-edit-mother-service',
  templateUrl: './edit-mother-service.component.html',
  styleUrls: ['./edit-mother-service.component.css']
})
export class EditMotherServiceComponent implements OnInit {
  service;
  statuses = [
    {value: 'active', viewValue: 'فعال'},
    {value: 'inactive', viewValue: 'غیرفعال'}
  ];
  selectedStatus: string;

  serviceName = '';
  serviceExplain = '';
  nameChanged = false;

  reader = new FileReader();
  sections: Array<UploadSection> = [];
  inProgress = false;
  images = [];
  selectedImage: any;
  imageDirectory = 'services';
  deletedImage = false;
  attributes = [];

  public Editor = ClassicEditor;

  initialized = false;
  errors = [];
  constructor(private repository: RepositoryService, private alert: ToastrService, private general: GeneralService, 
              private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const serviceId = this.activatedRoute.snapshot.paramMap.get('id');
    this.repository.getMotherService(serviceId).subscribe(res => {
      this.service = res;
      this.attributes = this.service.attributes;
      for (const attr of this.attributes) {
        if (attr.possible_values === '') {
          attr.possible_values = [];
        } else {
          attr.possible_values = attr.possible_values.split(',');
        }
      }
      for (const attr of this.service.seller_attributes) {
        if (attr.possible_values === '') {
          attr.possible_values = [];
        } else {
          attr.possible_values = attr.possible_values.split(',');
        }
      }
      this.serviceName = this.service.name;
      this.serviceExplain = this.service.explain;
      this.images = (this.service.images).toString().split(',');
      this.selectedStatus =  this.service.status ? 'active' : 'inactive';
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
    this.deletedImage = true;
    this.images = [];
  }

  submit(): void {
    if (this.serviceName === '') {
      this.errors.push('لطفا عنوان خدمت را وارد کنید');
    } else {
      this.service.name = this.serviceName;
    }

    if (this.images.length === 0) {
      this.errors.push('لطفا حداقل یک عکس بارگذاری کنید');
    } else {
      this.service.images = this.images;
    }

    this.service.attributes = this.attributes;

    this.service.explain = this.serviceExplain;

    this.service.status = this.selectedStatus === 'active' ? true : false;

    this.service.images = this.images;
    delete this.service.category;
    delete this.service.services_list;

    if (this.errors.length === 0) {
      this.repository.updateMotherService(this.service.id, this.service).subscribe(res => {
        this.alert.success('خدمت مادر با موفقیت ویرایش شد!');
        this.router.navigate(['/modern/manage_services']);
      }, error => {
        console.log(error);
        
        this.alert.error('مشکلی در ویرایش کالا بوجود آمد!');
      });
    }
    for (const error of this.errors) {
      this.alert.error(error);
    }
    this.errors = [];

  }
}
