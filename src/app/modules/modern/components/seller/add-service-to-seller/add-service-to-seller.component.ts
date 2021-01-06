import { SellerService } from './../../../../../interfaces/service';
import { element } from 'protractor';
import { RepositoryService } from './../../../../../services/repository.service';
import { GeneralService } from './../../../../../services/general.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Seller } from 'src/app/interfaces/seller';
import { ToastrService } from 'ngx-toastr';

export interface ItemForSelect {
  name: string;
  id: number;
}

@Component({
  selector: 'app-add-service-to-seller',
  templateUrl: './add-service-to-seller.component.html',
  styleUrls: ['./add-service-to-seller.component.css']
})
export class AddServiceToSellerComponent implements OnInit {
  seller: Seller;
  service: SellerService = this.general.defaultSellerService;
  units = [];
  viewPrices = [
    {
      unit: '',
      amountFixed: 'fixed',
      amount: '',
      wholesaleAmountFixed : 'fixed',
      wholesaleAmount: ''
    }
  ];
  price = {
      unit: '',
      amount: '',
      wholesale_amount : ''
    };
  sellTypes = [
    {
      type: 'نقد',
      choosed: false
    },
    {
      type: 'چک بلند مدت',
      choosed: false
    },
    {
      type: 'چک کوتاه مدت',
      choosed: false
    },
    {
      type: 'تهارتر',
      choosed: false
    }
  ];
  qualities = [
    {
      type: 'اقتصادی',
      choosed: false
    },
    {
      type: 'لوکس',
      choosed: false
    },
    {
      type: 'مناسب',
      choosed: false
    }
  ];
  attributes = [];

  categories = [];
  selectedCategory = [];
  categoryDropdownSettings: IDropdownSettings;

  motherServices = [];
  selectedMotherService = [];
  motherServiceDropdownSettings: IDropdownSettings;
  @ViewChild('motherServiceSelect', {static: false}) motherServiceSelect;


  services = [];
  selectedService = [];
  serviceDropdownSettings: IDropdownSettings;
  @ViewChild('serviceSelect', {static: false}) serviceSelect;


  initializedCategoryDropdown = false;
  initializedMotherServiceDropdown = false;
  serviceSelected = false;

  constructor(private general: GeneralService, private repository: RepositoryService, private alert: ToastrService) { }

  ngOnInit(): void {
    this.general.currentSeller.subscribe(res => {
      this.seller = res;
    });

    this.categoryDropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
      noDataAvailablePlaceholderText: 'داده ای برای نمایش وجود ندارد'
    };

    this.motherServiceDropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
      noDataAvailablePlaceholderText: 'داده ای برای نمایش وجود ندارد'
    };

    this.serviceDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true,
      selectAllText: 'انتخاب همه',
      unSelectAllText: 'حذف همه',
      itemsShowLimit: 3,
      noDataAvailablePlaceholderText: 'داده ای برای نمایش وجود ندارد'
    };

    this.repository.getClusters().subscribe((res) => {
      for (const category of res) {
        this.categories.push({
          id: category.id,
          name: category.name
        });
      }
      this.initializedCategoryDropdown = true;
    });
  }

  onCategorySelect($event): void {
    if (this.selectedCategory !== undefined) {
      this.selectedService = [];
      this.selectedMotherService = [];
      const clusterId = this.selectedCategory[0].id;
      const forMotherServices: Array<ItemForSelect> = [];
      this.repository.getMotherServices(clusterId).subscribe(res => {
        for (const item of res) {
          forMotherServices.push({
            id: item.id,
            name: item.name
          });
        }
        this.motherServiceSelect.data = forMotherServices;
      });
      this.repository.getUnitsOfCategory(clusterId).subscribe(res => {
        this.units = res;
        this.viewPrices[0].unit = this.units[0];
      });
    }
  }

  onMotherServiceSelect($event): void {
    this.selectedService = [];
    if (this.selectedMotherService !== undefined) {
      const motherId = +this.selectedMotherService[0].id;
      const forServices: Array<ItemForSelect> = [];
      this.repository.getServicesByMother(motherId).subscribe(res => {
        for (const item of res) {
          forServices.push({
            id: item.item_id,
            name: item.item_name
          });
        }
        this.serviceSelect.data = forServices;
      });
      this.repository.getSellerServiceAttributes(this.selectedMotherService[0].id).subscribe(res => {
        this.attributes = res;
      });
    }
  }

  onServiceSelect(): void {
    this.serviceSelected = true;
  }
  addUnit(): void {
    this.viewPrices.push({
      unit: '',
      amountFixed: 'fixed',
      amount: '',
      wholesaleAmountFixed : 'fixed',
      wholesaleAmount: ''

    });
  }

  submit(): void {
    const passToServerServices: Array<SellerService> = [];
    for (const viewPrice of this.viewPrices) {
      const price = {
        unit: '',
        amount: '',
        wholesale_amount : ''
      };
      price.unit = viewPrice.unit;
      if (viewPrice.amountFixed === 'fixed') {
        price.amount = viewPrice.amount;
      } else {
        price.amount = 'توافقی';
      }

      if (viewPrice.wholesaleAmountFixed === 'fixed') {
        price.wholesale_amount = viewPrice.wholesaleAmount;
      } else {
        price.wholesale_amount = 'توافقی';
      }
      this.service.prices.push(price);
    }

    for (const sellType of this.sellTypes) {
      if (sellType.choosed) {
        this.service.sell_types.push(sellType.type);
      }
    }

    for (const quality of this.qualities) {
      if (quality.choosed) {
        this.service.qualities.push(quality.type);
      }
    }

    for (const attr of this.attributes) {
      this.service.attributes.push({
        key: attr.name,
        value: attr.value
      });
    }
    delete this.service.service;
    let responseLength = 0;
    for (const selectedService of this.selectedService) {
      this.repository.getService(selectedService.id).subscribe(res => {
        passToServerServices.push({...this.service, service: {
            id: res.id,
            name: res.name,
            image: res.images,
            status: res.status === 'active' ? true : false
           }});
        responseLength++;
        if (responseLength === this.selectedService.length) {
          this.repository.addServicesToSeller(passToServerServices, this.seller.id).subscribe(response => {
            this.service.prices = [];
            this.service.sell_types = [];
            this.service.qualities = [];
            this.service.attributes = [];
            this.alert.success('خدمت های فروشنده به روز شد!');
          }, err => {
            this.alert.error('مشکلی در بروزرسانی فروشنده بوجود آمده است!');
          }
          );
        }
      });
    }
  }

}
