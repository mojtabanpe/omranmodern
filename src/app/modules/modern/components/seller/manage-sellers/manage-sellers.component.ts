import { YesOrNoDialogComponent } from 'src/app/components/dialogs/yes-or-no-dialog/yes-or-no-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { ExtraAdded } from './../../../../../interfaces/address';
import { RepositoryService } from 'src/app/services/repository.service';
import { Seller } from '../../../../../interfaces/seller';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-sellers',
  templateUrl: './manage-sellers.component.html',
  styleUrls: ['./manage-sellers.component.css']
})
export class ManageSellersComponent implements OnInit {
  sellers: Array<Seller> = [];
  coverages = [];
  addressForSerach: ExtraAdded = {
    provinces: [],
    cities: [],
    zones: [],
    selectedProvince: 0,
    selectedCity: 0,
    selectedZone: '0'
  };
  constructor(private repository: RepositoryService, private general: GeneralService, private router: Router,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.repository.getAllCoverages().subscribe(res => {
      this.coverages = res;
    });
    this.repository.getNewestSellers().subscribe(res => {
      this.sellers = res;
    });
  }

  changeProvince(pro): void {
    this.addressForSerach.cities = this.coverages.filter(c => c.code === +pro)[0].cities;
    this.addressForSerach.selectedCity = this.addressForSerach.cities[0].code;
    this.addressForSerach.zones = this.addressForSerach.cities[0].zones;
    if (this.addressForSerach.zones.length === 0) {
      this.addressForSerach.selectedZone = '0';
    } else {
      this.addressForSerach.selectedZone = this.addressForSerach.zones[0];
    }
    // this.addresses[index] = addr;

  }

  changeCity(cit): void {
    this.addressForSerach.zones = this.addressForSerach.cities.filter(c => c.code === +cit)[0].zones;
    if (this.addressForSerach.zones.length === 0) {
      this.addressForSerach.selectedZone = '0';
    } else {
      this.addressForSerach.selectedZone = this.addressForSerach.zones[0];
    }
  }

  deleteSeller(seller): void {
    const dialogRef = this.dialog.open(YesOrNoDialogComponent, {
      data: {title: 'آیا از حذف این فروشنده اطمینان دارید؟'}
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res === 'yes') {
        this.repository.deleteSeller(seller.id).subscribe(response => {
          const index = this.sellers.indexOf(seller);
          this.sellers.splice(index, 1);
        });
      }
    });


  }

}
