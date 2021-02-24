import { ActivatedRoute } from '@angular/router';
import { SellerMaterial } from './../../../../../interfaces/material';
import { Seller } from './../../../../../interfaces/seller';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { RepositoryService } from 'src/app/services/repository.service';
import { ToastrService } from 'ngx-toastr';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


export interface ItemForSelect {
  name: string;
  id: number;
}

@Component({
  selector: 'app-add-material-to-seller',
  templateUrl: './add-material-to-seller.component.html',
  styleUrls: ['./add-material-to-seller.component.css']
})
export class AddMaterialToSellerComponent implements OnInit {
  seller: Seller;
  material: SellerMaterial = this.general.defaultSellerMaterial;
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

  attributes = [];

  clusterCategories = []; // baraye meghdar dehie select haye dg

  categories = [];
  selectedCategory = [];
  categoryDropdownSettings: IDropdownSettings;

  motherMaterials = [];
  selectedMotherMaterial = [];
  motherMaterialDropdownSettings: IDropdownSettings;
  @ViewChild('motherMaterialSelect', {static: false}) motherMaterialSelect;


  materials = [];
  selectedMaterial = [];
  materialDropdownSettings: IDropdownSettings;
  @ViewChild('materialSelect', {static: false}) materialSelect;


  initializedCategoryDropdown = false;
  initializedMotherMaterialDropdown = false;
  materialSelected = false;

  constructor(private general: GeneralService, private repository: RepositoryService, private alert: ToastrService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.repository.getSeller(id).subscribe(res => {
      this.seller = res;
      this.material.seller_id = this.seller.id;
    });

    this.categoryDropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
      noDataAvailablePlaceholderText: 'داده ای برای نمایش وجود ندارد'
    };

    this.motherMaterialDropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
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
  }

  onCategorySelect($event): void {
    if (this.selectedCategory !== undefined) {
      this.selectedMaterial = [];
      this.selectedMotherMaterial = [];
      const forMotherMaterials: Array<ItemForSelect> = [];
      const cluster = this.clusterCategories.filter(c => c.id === this.selectedCategory[0].id)[0];
      this.units = cluster.units.toString().split(',');
      this.viewPrices[0].unit = this.units[0];
      this.motherMaterials = cluster.mother_materials_list;
      for (const item of this.motherMaterials) {
        forMotherMaterials.push({
          id: item.id,
          name: item.name
        });
      }
      this.motherMaterialSelect.data = forMotherMaterials;
      // const forMotherMaterials: Array<ItemForSelect> = [];
      // this.repository.getMotherMaterials(clusterId).subscribe(res => {
      //   this.motherMaterials = res;
      //   for (const item of res) {
      //     forMotherMaterials.push({
      //       id: item.id,
      //       name: item.name
      //     });
      //   }
      //   this.motherMaterialSelect.data = forMotherMaterials;
      // });
      // this.repository.getUnitsOfCategory(clusterId).subscribe(res => {
      //   this.units = res;
      //   this.viewPrices[0].unit = this.units[0];
      // });
    }
  }

  onMotherMaterialSelect($event): void {
    this.selectedMaterial = [];
    if (this.selectedMotherMaterial !== undefined) {
      const motherId = +this.selectedMotherMaterial[0].id;
      const mother = this.motherMaterials.filter(m => m.id === motherId)[0];
      const forMaterials = [];
      for (const item of mother.materials_list) {
          forMaterials.push({
            id: item.id,
            name: item.name
          });
        }
      this.materialSelect.data = forMaterials;
      this.repository.getSellerMaterialAttributes(this.selectedMotherMaterial[0].id).subscribe(res => {
        this.attributes = res;
      });
    }
  }

  onMaterialSelect(): void {
    this.materialSelected = true;
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

  getDateTime(): any {
    return new Date();
  }
  submit(): void {
    console.log(this.viewPrices);
    
    const passToServerMaterials: Array<SellerMaterial> = [];
    for (const viewPrice of this.viewPrices) {
      const price = {
        unit: '',
        amount: '',
        wholesale_amount : '',
        last_update: this.getDateTime()
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
      this.material.prices.push(price);
    }

    for (const sellType of this.sellTypes) {
      if (sellType.choosed) {
        this.material.sell_types.push(sellType.type);
      }
    }

    // for (const quality of this.qualities) {
    //   if (quality.choosed) {
    //     this.material.qualities.push(quality.type);
    //   }
    // }

    for (const attr of this.attributes) {
      this.material.attributes.push({
        key: attr.name,
        value: attr.value
      });
    }
    delete this.material.material_id;
    let responseLength = 0;
    for (const selectedMaterial of this.selectedMaterial) {
        passToServerMaterials.push({...this.material, material_id: selectedMaterial.id});
        responseLength++;
    }
    if (responseLength === this.selectedMaterial.length) {
        console.log(JSON.stringify(passToServerMaterials));
        
        this.repository.createSellerMaterials(passToServerMaterials).subscribe(response => {
          this.material.prices = [];
          this.material.sell_types = [];
          this.material.attributes = [];
          console.log(response);
          
          this.alert.success('کالاهای فروشنده به روز شد!');
        }, err => {
          this.alert.error('مشکلی در بروزرسانی فروشنده بوجود آمده است!');
        }
        );
      }
  }
}
