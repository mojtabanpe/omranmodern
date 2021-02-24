import { AddSampleWorkDialogComponent } from './add-sample-work-dialog/add-sample-work-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { GeneralService } from 'src/app/services/general.service';
import { Seller } from './../../../../../interfaces/seller';
import { UploadSection } from './../../../../../interfaces/upload-section';
import { RepositoryService } from './../../../../../services/repository.service';
import { Address, ExtraAddress } from './../../../../../interfaces/address';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { stringify } from '@angular/compiler/src/util';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-create-seller',
  templateUrl: './create-seller.component.html',
  styleUrls: ['./create-seller.component.css']
})
export class CreateSellerComponent implements OnInit {
  seller: Seller = this.general.defaultSeller;
  rate = 5;
  status = 'active';

  userProfiles = [];
  selectedUserProfiles = [];
  userProfileDropdownSettings: IDropdownSettings;
  @ViewChild('userProfileSelect', {static: false}) userProfileSelect;
  initializedUserProfielDropdown = false;

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
  phones = [
  {
    title: '',
    number: ''
  }
  ];
  workingTime = {
    start: 8,
    end: 17,
    foretime: 90
  };

  public Editor = ClassicEditor;

  reader = new FileReader();
  section: UploadSection;
  image = '';
  selectedImage: any;
  imageDirectory = 'sellers';
  initializedImage = false;

  sampleWorks = [];
  errors = [];

  constructor(private repository: RepositoryService, private alert: ToastrService, private general: GeneralService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.repository.getAllCoverages().subscribe(res => {
      this.coverages = res;
    });

    this.userProfileDropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
      noDataAvailablePlaceholderText: 'داده ای برای نمایش وجود ندارد'
    };

    this.repository.getUsers().subscribe(res => {
      res = res.filter(u => u.type === 'seller');
      for (const item of res) {
        this.userProfiles.push({
          id: item.id,
          name: item.user.username
        });
      }
      this.initializedUserProfielDropdown = true;

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
    this.phones.push({
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
            this.image = res.message;
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
    this.image = '';
    this.section = {
      progressPercent: 0,
      started: true,
      finished: false,
      src: ''
    };
    }

  addSampleWork(): void {
      const dialogRef = this.dialog.open(AddSampleWorkDialogComponent, {
       width: '500px'
      });
      dialogRef.afterClosed().subscribe(res => {
        console.log(res);
        
        if (res && res.title && res.images) {
          this.sampleWorks.push(res);
        }
      });
    }

  submit(): void {
    delete this.seller.id;
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
    try {
      for (const addr of this.addresses) {
        const province = this.coverages.filter(c => c.code === +addr.extraAdded.selectedProvince)[0].province;
        const city = addr.extraAdded.cities.filter(c => c.code === +addr.extraAdded.selectedCity)[0].city;
        const zone = addr.extraAdded.selectedZone;
        this.seller.addresses.push({
          type: addr.type,
          detail: addr.detail,
          province,
          city,
          zone
        });
      }
    } catch (error) {
      this.errors.push('مشکلی در ثبت آدرس بوجودآمده است!');
    }
    this.seller.phones = this.phones;
    this.seller.working_time = this.workingTime;
    this.seller.work_samples = this.sampleWorks;
    this.seller.image = this.image;
    if (this.seller.name === '') {
      this.errors.push('لطفا نام کسب و کار را وارد کنید!');
    }
    for (const phone of this.phones) {
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
      if (this.selectedUserProfiles === []){
        delete this.seller.user_profile;
      } else {
        this.seller.user_profile = this.selectedUserProfiles[0].id;
      }

      this.repository.createSeller(this.seller).subscribe(res => {
        this.alert.success('فروشنده با موفقیت ایجاد شد!');
        this.seller = this.general.defaultSeller;
      }, error => {
        this.alert.error('مشکلی در ایجاد فروشنده وجود دارد!');
      });
    }
    this.errors = [];
  }


}
