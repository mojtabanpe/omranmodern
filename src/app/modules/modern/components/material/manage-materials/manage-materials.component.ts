import { RepositoryService } from 'src/app/services/repository.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-materials',
  templateUrl: './manage-materials.component.html',
  styleUrls: ['./manage-materials.component.css']
})
export class ManageMaterialsComponent implements OnInit {
  materialsSub;
  tableMode = true;
  statuses = [
    {value: 'active', viewValue: 'فعال'},
    {value: 'inactive', viewValue: 'غیرفعال'},
    {value: 'rejected', viewValue: 'ردشده'},
    {value: 'suggested', viewValue: 'پیشنهادی'}
  ];
  selectedStatus: string = this.statuses[0].value;
  materials = [];
  motherMaterials = [];
  constructor(private repository: RepositoryService) { }

  ngOnInit(): void {
    this.materialsSub = this.repository.getMaterialsByStatus(this.selectedStatus).subscribe(res => {
      this.materials = res;
    });
  }
  activityChanged(): void {
    this.materialsSub.unsubscribe();
    if (this.tableMode) {
      this.repository.getMaterialsByStatus(this.selectedStatus).subscribe(res => {
        this.materials = res;
      });
    } else {
      this.repository.getMotherMaterialsByStatus(this.selectedStatus).subscribe(res => {
        this.motherMaterials = res;
      });
    }
  }
  chageTableMode(): void {
    this.tableMode = !this.tableMode;
    this.activityChanged();
  }


}
