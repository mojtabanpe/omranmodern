import { SellerService } from './../../../../../interfaces/service';
import { element } from 'protractor';
import { RepositoryService } from './../../../../../services/repository.service';
import { GeneralService } from './../../../../../services/general.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Seller } from 'src/app/interfaces/seller';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

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
      wholesale_amount : '',
      last_update: ''
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

  constructor(private general: GeneralService, private repository: RepositoryService, private alert: ToastrService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.repository.getSeller(id).subscribe(res => {
      this.seller = res;
      this.service.seller_id = this.seller.id;
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

    this.repository.getClusters(false).subscribe((res) => {
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
        this.motherServices = res;
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
      const mother = this.motherServices.filter(m => m.id === motherId)[0];
      const forServices: Array<ItemForSelect> = [];
      for (const item of mother.services_list) {
          forServices.push({
            id: item.id,
            name: item.name
          });
        }
      this.serviceSelect.data = forServices;
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
        // last_update: ''
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
    delete this.service.service_id;
    for (const selectedService of this.selectedService) {
        passToServerServices.push({...this.service, service_id: selectedService.id});
    }

    if (passToServerServices.length !== 0) {
      this.repository.addServicesToSeller(passToServerServices).subscribe(response => {
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
  }

}
