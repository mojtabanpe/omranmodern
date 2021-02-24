import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { element } from 'protractor';
import { GeneralService } from './../../../../../../services/general.service';
import { Seller } from './../../../../../../interfaces/seller';
import { Component, OnInit } from '@angular/core';
import { ExtraAddress } from 'src/app/interfaces/address';
import { ToastrService } from 'ngx-toastr';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { RepositoryService } from 'src/app/services/repository.service';
import { UploadSection } from 'src/app/interfaces/upload-section';
import { AddSampleWorkDialogComponent } from '../../create-seller/add-sample-work-dialog/add-sample-work-dialog.component';

@Component({
  selector: 'app-edit-seller',
  templateUrl: './edit-seller.component.html',
  styleUrls: ['./edit-seller.component.css']
})
export class EditSellerComponent implements OnInit {
  initializedSeller = false;
  seller: Seller;
  status = 'active';
  rate = 5;
  addresses: Array<ExtraAddress> = [{
    type: 'daftar',
    extraAdded: {
      provinces: [],
      cities: [],
      zones: [],
      selectedProvince: 0,
      selectedCity: 0,
      selectedZone: '0'
    },
    detail: '',
  }];
  coverages = [];
  workSamples = [];

  public Editor = ClassicEditor;

  reader = new FileReader();
  section: UploadSection;
  image = '';
  selectedImage: any;
  imageDirectory = 'sellers';
  initializedImage = false;
  deletedPicture = false;

  errors = [];

  constructor(private repository: RepositoryService, private alert: ToastrService, private general: GeneralService,
              public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.general.currentSeller.subscribe(res => {
      this.seller = res;
      this.status = this.seller.status === true ? 'active' : 'inactive';
      this.workSamples = this.seller.work_samples;
      this.workSamples.forEach(sample => {
        sample.images = sample.images.toString().split(',');
      });
    });
    this.repository.getAllCoverages().subscribe(res => {
      this.coverages = res;
    });
  }

  addAddress(): void {
    this.addresses.push({
      type: 'daftar',
      extraAdded: {
        provinces: [],
        cities: [],
        zones: [],
        selectedProvince: 0,
        selectedCity: 0,
        selectedZone: '0'
      },
      detail: ''
    });
  }

  deleteAddress(index): void {
    this.addresses.splice(index);
  }

  changeProvince(pro, index): void {
    const addr = this.addresses[index];
    addr.extraAdded.cities = this.coverages.filter(c => c.code === +pro)[0].cities;
    addr.extraAdded.selectedCity = addr.extraAdded.cities[0].code;
    addr.extraAdded.zones = addr.extraAdded.cities[0].zones;
    if (addr.extraAdded.zones.length === 0) {
      addr.extraAdded.selectedZone = '0';
    } else {
      addr.extraAdded.selectedZone = addr.extraAdded.zones[0];
    }
    // this.addresses[index] = addr;

  }
  changeCity(cit, index): void {
    const addr = this.addresses[index];
    addr.extraAdded.zones = addr.extraAdded.cities.filter(c => c.code === +cit)[0].zones;
    if (addr.extraAdded.zones.length === 0) {
      addr.extraAdded.selectedZone = '0';
    } else {
      addr.extraAdded.selectedZone = addr.extraAdded.zones[0];
    }
  }

  addPhone(): void {
    this.seller.phones.push({
      title: '',
      number: ''
    });
  }

  onFileChanged(event): void {
    this.initializedImage = true;
    const uploadSection: UploadSection = {
      progressPercent: 0,
      started: true,
      finished: false,
      src: ''
    };
    try {
      this.section = uploadSection;
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
            this.seller.image = res.message;
            setTimeout(() => {
              uploadSection.src = this.reader.result.toString();
              }, 1000);
          }
        }
      });
    } catch (error) {
      this.initializedImage = false;
      this.alert.error('متاسفانه مشکلی در آپلود عکس بوجود آمده است!');
    }

    }

  removePicture(): void {
    this.initializedImage = false;
    this.seller.image = '';
    this.section = {
      progressPercent: 0,
      started: true,
      finished: false,
      src: ''
    };
    this.deletedPicture = true;
    }

  addSampleWork(): void {
    const dialogRef = this.dialog.open(AddSampleWorkDialogComponent, {
      width: '500px'
     });
    dialogRef.afterClosed().subscribe(res => {

       if (res && res.title && res.images) {
         this.workSamples.push(res);
       }
     });
   }

submit(): void {
      this.seller.status = this.status === 'active' ? true : false;
      this.seller.stars = { // add our rate 3 times to his star for weight 3x
        stars: [ {
          user_id: 0,
          value: this.rate
        },
        {
          user_id: 0,
          value: this.rate
        },
        {
          user_id: 0,
          value: this.rate
        }
        ],
        average: this.rate
      };
      // try {
      //   for (const addr of this.addresses) {
      //     const province = this.coverages.filter(c => c.code === +addr.extraAdded.selectedProvince)[0].province;
      //     const city = addr.extraAdded.cities.filter(c => c.code === +addr.extraAdded.selectedCity)[0].city;
      //     const zone = addr.extraAdded.selectedZone;
      //     this.seller.addresses.push({
      //       type: addr.type,
      //       detail: addr.detail,
      //       province,
      //       city,
      //       zone
      //     });
      //   }
      // } catch (error) {
      //   this.errors.push('مشکلی در ثبت آدرس بوجودآمده است!');
      // }
      this.seller.work_samples = this.workSamples;
      if (this.seller.name === '') {
        this.errors.push('لطفا نام کسب و کار را وارد کنید!');
      }
      for (const phone of this.seller.phones) {
              if (phone.title === '' || phone.number === '') {
                this.errors.push('مشکلی در ثبت شماره تلفن بوجود آمده است!');
              }
            }
      if (this.seller.explain === '') {
              this.errors.push(' لطفا فیلد مربوط به توضیحات را پر کنید! ');
            }
      if (this.seller.image === '') {
              this.errors.push('لطفا عکس مربوط به کسب و کار را آپلود کنید!');
            }
      if (this.errors.length !== 0) {
              for (const error of this.errors) {
                this.alert.error(error);
              }
            } else {
              delete this.seller.materials_list;
              delete this.seller.services_list;
              this.seller.user_profile = this.seller.user_profile.id;

              this.repository.updateSeller(this.seller, this.seller.id).subscribe(res => {
                this.general.changeSeller(res);
                this.alert.success('فروشنده با موفقیت ویرایش شد!');
                this.router.navigate(['/modern/manage_sellers']);
              }, error => {
                this.alert.error('مشکلی در ویرایش فروشنده بوجود آمد!');
              });
            }
      this.errors = [];
  }

}
