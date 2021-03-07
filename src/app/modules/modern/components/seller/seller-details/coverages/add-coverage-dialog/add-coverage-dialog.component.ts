import { RepositoryService } from 'src/app/services/repository.service';
import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-coverage-dialog',
  templateUrl: './add-coverage-dialog.component.html',
  styleUrls: ['./add-coverage-dialog.component.css']
})
export class AddCoverageDialogComponent implements OnInit {
  areas = [];
  coverages = [];
  selectedCoverages = [];
  coverageDropdownSettings: IDropdownSettings;
  @ViewChild('coverageSelect') coverageSelect;

  cities = [];
  selectedCities = [];
  cityDropdownSettings: IDropdownSettings;
  @ViewChild('citySelect') citySelect;
  showCities = false;

  zones = [];
  selectedZones = [];
  zoneDropdownSettings: IDropdownSettings;
  @ViewChild('zoneSelect') zoneSelect;
  showZones = false;
  response;
  constructor(public dialogRef: MatDialogRef<AddCoverageDialogComponent>, @Inject(MAT_DIALOG_DATA) public data,
              private repositpry: RepositoryService) { }

  ngOnInit(): void {
    this.coverageDropdownSettings = {
      singleSelection: true,
      idField: 'code',
      textField: 'province',
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
      noDataAvailablePlaceholderText: 'داده ای برای نمایش وجود ندارد'
    };
    this.cityDropdownSettings = {
      singleSelection: true,
      idField: 'code',
      textField: 'city',
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
      noDataAvailablePlaceholderText: 'داده ای برای نمایش وجود ندارد'
    };

    this.zoneDropdownSettings =  {
      singleSelection: false,
      idField: 'code',
      textField: 'zone',
      itemsShowLimit: 3,
      selectAllText: 'انتخاب همه',
      unSelectAllText: 'حذف همه',
      allowSearchFilter: true,
      noDataAvailablePlaceholderText: 'داده ای برای نمایش وجود ندارد'
    };

    this.areas = this.data.areas;
    this.coverages.push({
      code: 0,
      province: 'همه استان  ها'
    });
    for (const area of this.areas) {
      this.coverages.push({
        code: area.code,
        province: area.province
      });
    }
    try {
      this.coverageSelect.data = this.coverages;
    } catch (error) {}
  }

  onProvinceSelect(code: number): void {
    if (code !== 0) {
      this.showCities = true;
      const tempCities = this.areas.filter(a => a.code === code)[0].cities;
      this.cities.push({
        code: 0,
        city: 'همه شهرها'
      });
      for (const city of tempCities) {
        this.cities.push({
          code: city.code,
          city: city.city
        });
      }
      try {
        this.citySelect.data = this.cities;
      } catch (error) {}


    }
  }
  onCitySelect(code: number): void {
    if (code === 215) {
      // const tempZones = this.areas.filter(a => a.code === 8)[0].cities.filter(c => c.code === 215)[0].zones;
      // console.log(tempZones);
      this.zones = [
        {code: 0, zone: 'همه مناطق'},
        {code: 1, zone: 'منطقه ۱'}, {code: 2, zone: 'منطقه ۲'}, {code: 3, zone: 'منطقه ۳'}, {code: 4, zone: 'منطقه ۴'},
        {code: 5, zone: 'منطقه ۵'}, {code: 6, zone: 'منطقه ۶'}, {code: 7, zone: 'منطقه ۷'}, {code: 8, zone: 'منطقه ۸'},
        {code: 9, zone: 'منطقه ۹'}, {code: 10, zone: 'منطقه ۱۰'}, {code: 11, zone: 'منطقه ۱۱'}, {code: 12, zone: 'منطقه ۱۲'},
        {code: 13, zone: 'منطقه ۱۳'}, {code: 14, zone: 'منطقه ۱۴'}, {code: 15, zone: 'منطقه ۱۵'}, {code: 16, zone: 'منطقه ۱۶'},
        {code: 17, zone: 'منطقه ۱۷'}, {code: 18, zone: 'منطقه ۱۸'}, {code: 19, zone: 'منطقه ۱۹'}, {code: 20, zone: 'منطقه ۲۰'},
        {code: 21, zone: 'منطقه ۲۱'}, {code: 22, zone: 'منطقه ۲۲'}
      ];
      this.showZones = true;
    }
  }
  addCoverage(): void {
    this.response = {
      province: this.selectedCoverages[0].province ,
      city: this.selectedCities.length !== 0 ? this.selectedCities[0].city : '',
      zone: Array.from(this.selectedZones, zone => zone.zone).toString()
    };
    this.dialogRef.close(this.response);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
