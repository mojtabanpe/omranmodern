import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { YesOrNoDialogComponent } from 'src/app/components/dialogs/yes-or-no-dialog/yes-or-no-dialog.component';
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
    {value: 'inactive', viewValue: 'غیرفعال'}
  ];
  selectedStatus: string = this.statuses[0].value;
  services = [];
  motherServices = [];
  constructor(private repository: RepositoryService, public dialog: MatDialog) { }

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
        this.motherServices = res;
      });
    }
  }
  chageTableMode(): void {
    this.tableMode = !this.tableMode;
    this.activityChanged();
  }


  openAggrementDeleteMaterialDialog(service, type): void {
    const dialogRef = this.dialog.open(YesOrNoDialogComponent, {
      data: { title: 'آیا از حذف این خدمت اطمینان دارید؟'}
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res === 'yes') {
        if (type === 'child') {
          this.repository.deleteService(service.id).subscribe(res1 => {
            const index = this.services.indexOf(service);
            this.services.splice(index, 1);
          });
        } else {
          this.repository.deleteMotherService(service.id).subscribe(response => {
            const index = this.motherServices.indexOf(service);
            this.motherServices.splice(index, 1);
          });
        }
      }
    });
  }

}
