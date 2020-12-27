import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/services/repository.service';

@Component({
  selector: 'app-manage-services',
  templateUrl: './manage-services.component.html',
  styleUrls: ['./manage-services.component.css']
})
export class ManageServicesComponent implements OnInit {
  servicesSub;
  tableMode = true;
  statuses = [
    {value: 'active', viewValue: 'فعال'},
    {value: 'inactive', viewValue: 'غیرفعال'},
    {value: 'rejected', viewValue: 'ردشده'},
    {value: 'suggested', viewValue: 'پیشنهادی'}
  ];
  selectedStatus: string = this.statuses[0].value;
  services = [];
  motherServices = [];
  constructor(private repository: RepositoryService) { }

  ngOnInit(): void {
    this.servicesSub = this.repository.getServicesByStatus(this.selectedStatus).subscribe(res => {
      this.services = res;
    });
  }
  activityChanged(): void {
    if (this.servicesSub) {
      this.servicesSub.unsubscribe();
    }
    if (this.tableMode) {
      this.repository.getServicesByStatus(this.selectedStatus).subscribe(res => {
        this.services = res;
      });
    } else {
      this.repository.getMotherServicesByStatus(this.selectedStatus).subscribe(res => {
        console.log(res);
        this.motherServices = res;
      });
    }
  }
  chageTableMode(): void {
    this.tableMode = !this.tableMode;
    this.activityChanged();
  }

}
