import { Seller } from './../../../../../interfaces/seller';
import { UploadSection } from './../../../../../interfaces/upload-section';
import { RepositoryService } from './../../../../../services/repository.service';
import { Address, ExtraAddress } from './../../../../../interfaces/address';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-create-seller',
  templateUrl: './create-seller.component.html',
  styleUrls: ['./create-seller.component.css']
})
export class CreateSellerComponent implements OnInit {
  seller: Seller = {
    id: 0,
    name: '',
    explain: '',
    status: 'active',
    stars: {},
    type: 'group',
    image: '',
    provider_type: '',
    phones: [],
    site: '',
    addresses: [],
    working_time: {},
    coverages: [],
    materials: [],
    services: []
  };
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
  phones = [
  {
    title: '',
    number: ''
  }
  ];
  workingTime = {
    start: 8,
    end: 17,
    foretime: ''
  };

  public Editor = ClassicEditor;

  reader = new FileReader();
  section: UploadSection;
  image = '';
  selectedImage: any;
  imageName = '1';
  initializedImage = false;

  sampleWorks = [
    {
      title: ' نقاشی ساختمان',
      image: 'http://www.rajanews.com/sites/default/files/content/images/story/99-04/17/%D9%86%D9%82%D8%A7%D8%B4%DB%8C.jpg'
    }
  ];
  errors = [];

  constructor(private repository: RepositoryService, private alert: ToastrService) { }

  ngOnInit(): void {
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

    }

    submit(): void {
      delete this.seller.id;
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
        this.repository.createSeller(this.seller).subscribe(res => {
          this.seller = {
            id: 0,
            name: '',
            explain: '',
            status: 'active',
            stars: {},
            type: 'group',
            image: '',
            provider_type: '',
            phones: [],
            site: '',
            addresses: [],
            working_time: {},
            coverages: [],
            materials: [],
            services: []
          };
          console.log(res);
        });
      }
      this.errors = [];



    }


}
